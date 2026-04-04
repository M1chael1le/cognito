import Link from "next/link";
import ChatInterface from "@/components/ChatInterface";

export default function MarkKohlerPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-dark">
          Cognito
        </Link>
        <div className="text-center">
          <h1 className="text-sm font-semibold text-dark">Mark J. Kohler</h1>
          <p className="text-xs text-secondary">Tax Strategist & Business Attorney</p>
        </div>
        <Link
          href="/"
          className="text-sm text-secondary hover:text-dark transition-colors"
        >
          &larr; Back
        </Link>
      </header>

      {/* Chat */}
      <ChatInterface />
    </div>
  );
}
