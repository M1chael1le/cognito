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

  const context = await retrieveContext(lastUserMsg.content);
  const basePrompt = getSystemPrompt();
  const augmentedPrompt = context
    ? `${basePrompt}\n\n=== RELEVANT CONTEXT FROM YOUR KNOWLEDGE BASE ===\n${context}\n=== END CONTEXT ===\n\nUse the above context to inform your response when relevant, but always stay in character as Mark Kohler.`
    : basePrompt;

  const stream = streamClaude(augmentedPrompt, messages);

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
