import { NextRequest } from "next/server";
import { retrieveContext } from "@/lib/rag";
import { getSystemPrompt } from "@/lib/systemPrompt";
import { streamClaude } from "@/lib/claude";
import { ChatMessage } from "@/types";

export async function POST(req: NextRequest) {
  const { messages } = (await req.json()) as { messages: ChatMessage[] };

  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUserMsg) {
    return new Response("No user message found", { status: 400 });
  }

  // Transform messages: inject attachment text into user message content
  const transformedMessages = messages.map((msg) => {
    if (msg.role === "user" && msg.attachments && msg.attachments.length > 0) {
      const attachmentText = msg.attachments
        .map(
          (a) =>
            `\n\n=== UPLOADED DOCUMENT: ${a.name} ===\n${a.extractedText}\n=== END DOCUMENT ===`
        )
        .join("");
      return { role: msg.role, content: msg.content + attachmentText };
    }
    return { role: msg.role, content: msg.content };
  });

  const context = await retrieveContext(lastUserMsg.content);
  const basePrompt = getSystemPrompt();
  const augmentedPrompt = context
    ? `${basePrompt}\n\n=== RELEVANT CONTEXT FROM YOUR KNOWLEDGE BASE ===\n${context}\n=== END CONTEXT ===\n\nUse the above context to inform your response when relevant, but always stay in character as Lincoln Doyle.`
    : basePrompt;

  const stream = streamClaude(augmentedPrompt, transformedMessages);

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            const data = `data: ${JSON.stringify({ text: event.delta.text })}\n\n`;
            controller.enqueue(encoder.encode(data));
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        console.error("Stream error:", error);
        const errMsg = `data: ${JSON.stringify({ error: "Stream failed" })}\n\n`;
        controller.enqueue(encoder.encode(errMsg));
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
