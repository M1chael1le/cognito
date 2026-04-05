export interface FileAttachment {
  name: string;
  type: string;
  size: number;
  extractedText: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  attachments?: FileAttachment[];
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  description: string;
  avatar: string;
  status: "active" | "coming_soon";
  href?: string;
}
