"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const filters = [
  "All",
  "Tax & Accounting",
  "Legal",
  "Finance",
  "Marketing",
  "Real Estate",
  "HR",
];

const agents = [
  {
    id: "mark-kohler",
    name: "Mark J. Kohler",
    title: "Tax Strategist & Business Attorney",
    description: "25+ years of tax & legal expertise. S-Corp strategy, asset protection, retirement planning.",
    initials: "MK",
    color: "bg-blue-600",
    rating: 4.9,
    conversations: "500+",
    status: "live" as const,
    category: "Tax & Accounting",
  },
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    title: "Business Growth Strategist",
    description: "Former McKinsey consultant, 15 years scaling startups from seed to Series C.",
    initials: "SC",
    color: "bg-emerald-600",
    rating: 0,
    conversations: "0",
    status: "coming_soon" as const,
    category: "Marketing",
  },
  {
    id: "david-park",
    name: "David Park",
    title: "Financial Planning Advisor",
    description: "CFP with 20 years at Fidelity Investments. Retirement, estate planning, and wealth building.",
    initials: "DP",
    color: "bg-violet-600",
    rating: 0,
    conversations: "0",
    status: "coming_soon" as const,
    category: "Finance",
  },
  {
    id: "rachel-torres",
    name: "Rachel Torres",
    title: "Real Estate Investment Advisor",
    description: "Licensed broker, 500+ transactions closed. Residential & commercial investment strategy.",
    initials: "RT",
    color: "bg-orange-500",
    rating: 0,
    conversations: "0",
    status: "coming_soon" as const,
    category: "Real Estate",
  },
  {
    id: "james-wright",
    name: "James Wright",
    title: "Employment & HR Law",
    description: "Former EEOC attorney, 18 years in employment law. Compliance, disputes, and HR policy.",
    initials: "JW",
    color: "bg-rose-500",
    rating: 0,
    conversations: "0",
    status: "coming_soon" as const,
    category: "HR",
  },
  {
    id: "lisa-wang",
    name: "Lisa Wang",
    title: "Digital Marketing Strategist",
    description: "Ex-Google, scaled 3 startups to $10M+ revenue. SEO, paid media, and growth strategy.",
    initials: "LW",
    color: "bg-teal-600",
    rating: 0,
    conversations: "0",
    status: "coming_soon" as const,
    category: "Marketing",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-secondary ml-1">{rating}</span>
    </div>
  );
}

export default function AgentsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? agents
      : agents.filter((a) => a.category === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-dark mb-3">
            Agent Marketplace
          </h1>
          <p className="text-secondary max-w-xl mx-auto">
            Browse expert-trained AI agents. Chat with professionals who have
            decades of real-world experience.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search for tax, legal, finance, marketing..."
              className="w-full pl-12 pr-4 py-3 bg-card border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-primary text-white"
                  : "bg-card border border-gray-200 text-secondary hover:border-primary hover:text-primary"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Agent grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((agent) => {
            const isLive = agent.status === "live";
            return (
              <div
                key={agent.id}
                className={`bg-card p-6 rounded-xl border border-gray-200 flex flex-col ${
                  isLive
                    ? "hover:shadow-lg hover:border-primary transition-all"
                    : "opacity-70"
                }`}
              >
                {/* Top row: avatar + badge */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-14 h-14 ${agent.color} rounded-full flex items-center justify-center`}
                  >
                    <span className="text-white text-lg font-bold">
                      {agent.initials}
                    </span>
                  </div>
                  {isLive ? (
                    <span className="px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      LIVE
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 bg-gray-100 text-secondary text-xs font-semibold rounded-full">
                      COMING SOON
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-dark mb-0.5">
                  {agent.name}
                </h3>
                <p className="text-primary text-sm font-medium mb-2">
                  {agent.title}
                </p>
                <p className="text-secondary text-sm leading-relaxed mb-4 flex-1">
                  {agent.description}
                </p>

                {/* Stats */}
                {isLive && (
                  <div className="flex items-center gap-4 mb-4">
                    <StarRating rating={agent.rating} />
                    <span className="text-xs text-secondary">
                      {agent.conversations} conversations
                    </span>
                  </div>
                )}

                {/* Actions */}
                {isLive ? (
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/agent/${agent.id}`}
                      className="flex-1 text-center bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                    >
                      Chat Now
                    </Link>
                    <Link
                      href={`/benchmark?agent=${agent.id}`}
                      className="px-4 py-2.5 border border-gray-200 text-secondary rounded-lg font-medium hover:border-primary hover:text-primary transition-colors text-sm"
                    >
                      Benchmark
                    </Link>
                  </div>
                ) : (
                  <button className="w-full py-2.5 border border-gray-200 text-secondary rounded-lg font-medium hover:border-primary hover:text-primary transition-colors text-sm">
                    Notify Me
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
