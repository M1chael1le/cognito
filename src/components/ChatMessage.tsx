"use client";

import { ChatMessage as ChatMessageType } from "@/types";
import { parseGeneratedDocument, downloadPdf } from "@/lib/pdfUtils";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const generatedDoc = !isUser
    ? parseGeneratedDocument(message.content)
    : null;
  const displayContent = generatedDoc
    ? generatedDoc.cleanContent
    : message.content;

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} gap-3`}
    >
      {!isUser && (
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold">LD</span>
        </div>
      )}
      <div className={`max-w-[70%]`}>
        {/* Attachment badges for user messages */}
        {isUser && message.attachments && message.attachments.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-1.5 justify-end">
            {message.attachments.map((att, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500 text-white text-xs rounded-lg"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                {att.name}
              </span>
            ))}
          </div>
        )}

        <div
          className={`px-4 py-3 rounded-2xl whitespace-pre-wrap ${
            isUser
              ? "bg-primary text-white rounded-tr-md"
              : "bg-card border border-gray-200 text-dark rounded-tl-md"
          }`}
        >
          {displayContent}
        </div>

        {/* PDF download button for generated documents */}
        {generatedDoc && (
          <button
            onClick={() => downloadPdf(generatedDoc.title, generatedDoc.body)}
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download as PDF
          </button>
        )}
      </div>
    </div>
  );
}
