import Link from "next/link";

const agents = [
  {
    id: "mark-kohler",
    name: "Mark J. Kohler",
    title: "Tax Strategist & Business Attorney",
    description: "25+ years of tax & legal expertise. S-Corp strategy, asset protection, retirement planning.",
    initials: "MK",
    color: "bg-blue-600",
    status: "live" as const,
  },
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    title: "Business Growth Strategist",
    description: "Former McKinsey consultant, 15 years scaling startups.",
    initials: "SC",
    color: "bg-emerald-600",
    status: "coming_soon" as const,
  },
  {
    id: "david-park",
    name: "David Park",
    title: "Financial Planning Advisor",
    description: "CFP with 20 years at Fidelity Investments.",
    initials: "DP",
    color: "bg-violet-600",
    status: "coming_soon" as const,
  },
];

export default function AgentCards() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-dark text-center mb-4">
          Featured Agents
        </h2>
        <p className="text-secondary text-center mb-12 max-w-xl mx-auto">
          Each agent is trained on real expert content — not generic AI knowledge.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {agents.map((agent) => {
            const isLive = agent.status === "live";
            return (
              <div
                key={agent.id}
                className={`bg-card p-8 rounded-xl border border-gray-200 ${
                  isLive
                    ? "hover:shadow-lg hover:border-primary transition-all"
                    : "opacity-60"
                }`}
              >
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
                <h3 className="text-xl font-semibold text-dark mb-1">
                  {agent.name}
                </h3>
                <p className="text-primary text-sm font-medium mb-3">
                  {agent.title}
                </p>
                <p className="text-secondary text-sm mb-6 leading-relaxed">
                  {agent.description}
                </p>
                {isLive ? (
                  <Link
                    href={`/agent/${agent.id}`}
                    className="inline-block bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                  >
                    Chat Now
                  </Link>
                ) : (
                  <span className="inline-block bg-gray-200 text-secondary px-6 py-2.5 rounded-lg font-medium text-sm cursor-not-allowed">
                    Coming Soon
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/agents"
            className="text-primary font-medium hover:underline text-sm"
          >
            View all agents in the marketplace →
          </Link>
        </div>
      </div>
    </section>
  );
}
