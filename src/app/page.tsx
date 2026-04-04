import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarketplaceCTA from "@/components/MarketplaceCTA";
import ValueProps from "@/components/ValueProps";
import AgentCards from "@/components/AgentCards";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <MarketplaceCTA />
      <ValueProps />
      <AgentCards />
      <Footer />
    </main>
  );
}
