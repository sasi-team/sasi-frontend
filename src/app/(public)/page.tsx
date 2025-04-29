import Hero from "@/sections/Hero";
import FeatureSection from "@/sections/FeatureSection";
import About from "@/sections/About";
import Gallery from "@/sections/Gallery";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Seção Hero */}
      <Hero />

      { /* Seção de Recursos */}
      <FeatureSection />

      {/* Seção Sobre o Sistema */}
      <About /> 

      {/* Seção de Galeria */}
      <Gallery />
    </div>
  );
}