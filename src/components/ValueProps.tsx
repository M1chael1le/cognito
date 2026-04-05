const props = [
  {
    title: "Better Than ChatGPT",
    description:
      "Generic AI gives you five options and says it depends. Our agents give you one clear recommendation with real numbers, because they think like actual professionals, not search engines.",
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "Expert Guidance, Fraction of the Cost",
    description:
      "A CPA charges $300/hour. A quick Google search gives you bad advice for free. We sit right in the middle: expert trained answers for a few dollars.",
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    title: "Connect With the Real Expert",
    description:
      "When your question needs a licensed professional, our agents know their limits. One click connects you directly with a vetted expert for the hands-on work AI can't do.",
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
  },
];

export default function ValueProps() {
  return (
    <section className="py-20 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-dark text-center mb-12">
          Why Cognito?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {props.map((prop, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                {prop.icon}
              </div>
              <h3 className="text-xl font-semibold text-dark mb-3">
                {prop.title}
              </h3>
              <p className="text-secondary leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
