import { readFileSync } from "fs";
import { join } from "path";

let cachedPrompt: string | null = null;

export function getSystemPrompt(): string {
  if (cachedPrompt) return cachedPrompt;
  const promptPath = join(process.cwd(), "..", "system_prompt.txt");
  cachedPrompt = readFileSync(promptPath, "utf-8");
  return cachedPrompt;
}
