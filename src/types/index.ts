export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
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
