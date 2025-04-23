import Header from "@/sections/Header";
import Hero from "@/sections/Hero";
import Footer from "@/sections/Footer";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Seção Header/Login */}
      <Header />
      {/* Seção Hero */}
      <Hero />
      {/* Seção "Footer" */}
      <Footer />
    </div>
  );
}