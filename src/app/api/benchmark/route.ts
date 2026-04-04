import { NextRequest } from "next/server";
import { retrieveContext } from "@/lib/rag";
import { getSystemPrompt } from "@/lib/systemPrompt";
import { streamClaude } from "@/lib/claude";

export async function POST(req: NextRequest) {
  const { question } = (await req.json()) as { question: string };

  if (!question) {
    return new Response("No question provided", { status: 400 });
  }

  const context = await retrieveContext(question);
  const basePrompt = getSystemPrompt();
  const expertPrompt = context
    ? `${basePrompt}\n\n=== RELEVANT CONTEXT FROM YOUR KNOWLEDGE BASE ===\n${context}\n=== END CONTEXT ===\n\nUse the above context to inform your response when relevant, but always stay in character as Lincoln Doyle.`
    : basePrompt;

  const vanillaPrompt =
    "You are a helpful AI assistant. Answer tax and business questions to the best of your ability.";

  const expertStream = streamClaude(expertPrompt, [
    { role: "user", content: question },
  ]);
  const vanillaStream = streamClaude(vanillaPrompt, [
    { role: "user", content: question },
  ]);

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      let expertDone = false;
      let vanillaDone = false;

      const checkDone = () => {
        if (expertDone && vanillaDone) {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      };

      const processStream = async (
        stream: ReturnType<typeof streamClaude>,
        source: "expert" | "vanilla"
      ) => {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              const data = `data: ${JSON.stringify({ source, text: event.delta.text })}\n\n`;
              controller.enqueue(encoder.encode(data));
            }
          }
        } catch (error) {
          console.error(`${source} stream error:`, error);
          const errMsg = `data: ${JSON.stringify({ source, error: "Stream failed" })}\n\n`;
          controller.enqueue(encoder.encode(errMsg));
        }
        if (source === "expert") expertDone = true;
        else vanillaDone = true;
        checkDone();
      };

      processStream(expertStream, "expert");
      processStream(vanillaStream, "vanilla");
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
