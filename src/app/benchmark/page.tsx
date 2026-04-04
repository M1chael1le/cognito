"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ThinkingDots from "@/components/ThinkingDots";

const agentOptions = [
  { id: "lincoln-doyle", name: "Lincoln Doyle", title: "Tax Strategist", enabled: true },
  { id: "sarah-chen", name: "Sarah Chen", title: "Growth Strategist", enabled: false },
  { id: "david-park", name: "David Park", title: "Financial Advisor", enabled: false },
  { id: "rachel-torres", name: "Rachel Torres", title: "Real Estate", enabled: false },
  { id: "james-wright", name: "James Wright", title: "HR Law", enabled: false },
  { id: "lisa-wang", name: "Lisa Wang", title: "Digital Marketing", enabled: false },
];

export default function BenchmarkPage() {
  const [selectedAgent, setSelectedAgent] = useState("lincoln-doyle");
  const [question, setQuestion] = useState("");
  const [expertText, setExpertText] = useState("");
  const [vanillaText, setVanillaText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const expertRef = useRef<HTMLDivElement>(null);
  const vanillaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    expertRef.current?.scrollTo(0, expertRef.current.scrollHeight);
  }, [expertText]);

  useEffect(() => {
    vanillaRef.current?.scrollTo(0, vanillaRef.current.scrollHeight);
  }, [vanillaText]);

  const currentAgent = agentOptions.find((a) => a.id === selectedAgent);

  const handleCompare = async () => {
    if (!question.trim() || isStreaming) return;

    setExpertText("");
    setVanillaText("");
    setIsStreaming(true);

    try {
      const response = await fetch("/api/benchmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.trim() }),
      });

      if (!response.ok) throw new Error("Failed to start benchmark");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();

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
              if (parsed.source === "expert" && parsed.text) {
                setExpertText((prev) => prev + parsed.text);
              } else if (parsed.source === "vanilla" && parsed.text) {
                setVanillaText((prev) => prev + parsed.text);
              }
            } catch {
              // skip malformed lines
            }
          }
        }
      }
    } catch (error) {
      console.error("Benchmark error:", error);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-dark">
          Cognito
        </Link>
        <h1 className="text-sm font-semibold text-dark">Agent Benchmark</h1>
        <Link
          href="/agents"
          className="text-sm text-secondary hover:text-dark transition-colors"
        >
          &larr; Back to Marketplace
        </Link>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Agent selector + input */}
        <div className="max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-dark text-center mb-2">
            Expert Agent vs. Vanilla Claude
          </h2>
          <p className="text-secondary text-center mb-6">
            See the difference RAG + expert training makes. Compare responses
            side by side.
          </p>

          {/* Agent dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-dark mb-1.5">
              Select Agent
            </label>
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="w-full px-4 py-2.5 bg-card border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {agentOptions.map((agent) => (
                <option
                  key={agent.id}
                  value={agent.id}
                  disabled={!agent.enabled}
                >
                  {agent.name} — {agent.title}
                  {!agent.enabled ? " (Coming Soon)" : ""}
                </option>
              ))}
            </select>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCompare();
            }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. When should I elect S-Corp status?"
              className="flex-1 px-4 py-3 bg-card border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              disabled={isStreaming}
            />
            <button
              type="submit"
              disabled={isStreaming || !question.trim()}
              className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Compare
            </button>
          </form>
        </div>

        {/* Two-column comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Expert panel */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-primary px-4 py-3 flex items-center gap-2">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {currentAgent?.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
              </div>
              <span className="text-white font-medium text-sm">
                Expert Agent ({currentAgent?.name} + RAG)
              </span>
            </div>
            <div
              ref={expertRef}
              className="p-4 h-[500px] overflow-y-auto bg-white"
            >
              {isStreaming && !expertText ? (
                <ThinkingDots />
              ) : expertText ? (
                <p className="text-dark whitespace-pre-wrap leading-relaxed text-sm">
                  {expertText}
                </p>
              ) : (
                <p className="text-secondary text-sm italic">
                  Expert response will appear here...
                </p>
              )}
            </div>
          </div>

          {/* Vanilla panel */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-600 px-4 py-3 flex items-center gap-2">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              <span className="text-white font-medium text-sm">
                Vanilla Claude (No RAG)
              </span>
            </div>
            <div
              ref={vanillaRef}
              className="p-4 h-[500px] overflow-y-auto bg-white"
            >
              {isStreaming && !vanillaText ? (
                <ThinkingDots />
              ) : vanillaText ? (
                <p className="text-dark whitespace-pre-wrap leading-relaxed text-sm">
                  {vanillaText}
                </p>
              ) : (
                <p className="text-secondary text-sm italic">
                  Vanilla response will appear here...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
