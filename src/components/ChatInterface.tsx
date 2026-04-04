"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage as ChatMessageType } from "@/types";
import ChatMessage from "./ChatMessage";
import ThinkingDots from "./ThinkingDots";
import StarterQuestions from "./StarterQuestions";

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isStreaming) return;

    const userMessage: ChatMessageType = { role: "user", content: content.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                assistantContent += parsed.text;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: assistantContent,
                  };
                  return updated;
                });
              }
            } catch {
              // skip malformed lines
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">MK</span>
              </div>
              <h2 className="text-2xl font-bold text-dark mb-2">
                Mark J. Kohler
              </h2>
              <p className="text-secondary">
                Tax Strategist & Business Attorney
              </p>
              <p className="text-secondary text-sm mt-2 max-w-md">
                Ask me about S-Corp strategy, the Trifecta structure, retirement
                planning, business deductions, and more.
              </p>
            </div>
            <StarterQuestions onSelect={sendMessage} />
          </div>
        )}

        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}

        {isStreaming && messages[messages.length - 1]?.content === "" && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">MK</span>
            </div>
            <div className="bg-card border border-gray-200 rounded-2xl rounded-tl-md">
              <ThinkingDots />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto flex gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Mark a tax or business question..."
            className="flex-1 px-4 py-3 bg-card border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={isStreaming}
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim()}
            className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
