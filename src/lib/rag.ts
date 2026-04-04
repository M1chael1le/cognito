import { supabase } from "./supabase";
import { getQueryEmbedding } from "./embeddings";

interface DocumentChunk {
  id: string;
  content: string;
  metadata: Record<string, unknown>;
  similarity: number;
}

export async function retrieveContext(query: string): Promise<string> {
  const embedding = await getQueryEmbedding(query);

  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: embedding,
    match_count: 5,
  });

  if (error) {
    console.error("Supabase RPC error:", error);
    return "";
  }

  const chunks = data as DocumentChunk[];
  return chunks.map((chunk) => chunk.content).join("\n\n---\n\n");
}
