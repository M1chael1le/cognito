import Anthropic from "@anthropic-ai/sdk";
import { ChatMessage } from "@/types";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export function streamClaude(
  systemPrompt: string,
  messages: ChatMessage[]
) {
  return anthropic.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: systemPrompt,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });
}
