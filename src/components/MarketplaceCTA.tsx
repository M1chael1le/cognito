import Link from "next/link";

export default function MarketplaceCTA() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Businesses */}
          <div className="bg-card p-10 rounded-xl border border-gray-200">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-dark mb-3">
              For Businesses & Individuals
            </h3>
            <p className="text-secondary leading-relaxed mb-6">
              Get instant access to expert-level AI agents trained on real
              professionals. Pay per conversation, not per hour.
            </p>
            <Link
              href="/agents"
              className="inline-block bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
            >
              Browse Agents
            </Link>
          </div>

          {/* For Experts */}
          <div className="bg-card p-10 rounded-xl border border-gray-200">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-dark mb-3">
              For Experts & Professionals
            </h3>
            <p className="text-secondary leading-relaxed mb-6">
              Turn your expertise into a 24/7 AI agent. Earn revenue while you
              sleep. No technical skills required.
            </p>
            <Link
              href="/experts"
              className="inline-block border-2 border-primary text-primary px-6 py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors text-sm"
            >
              Deploy Your Knowledge
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
