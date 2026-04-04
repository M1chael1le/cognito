import { ChatMessage as ChatMessageType } from "@/types";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} gap-3`}>
      {!isUser && (
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold">LD</span>
        </div>
      )}
      <div className={`max-w-[70%]`}>
        <div
          className={`px-4 py-3 rounded-2xl whitespace-pre-wrap ${
            isUser
              ? "bg-primary text-white rounded-tr-md"
              : "bg-card border border-gray-200 text-dark rounded-tl-md"
          }`}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}
