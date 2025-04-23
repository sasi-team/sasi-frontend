import Hero from "@/sections/Hero";
import FeatureSection from "@/sections/FeatureSection";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Seção Hero */}
      <Hero />

      { /* Seção 1 */}
      <FeatureSection />
    </div>
  );
}