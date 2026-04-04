import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ExpertsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-dark mb-4">
            Deploy Your Expertise
          </h1>
          <p className="text-secondary leading-relaxed mb-6">
            Interested in deploying your expertise as an AI agent? We&apos;re
            onboarding select professionals for our beta. Your knowledge becomes
            a 24/7 agent that earns revenue while you sleep — no technical skills
            required.
          </p>
          <a
            href="mailto:cognito@babson.edu"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Email cognito@babson.edu
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
