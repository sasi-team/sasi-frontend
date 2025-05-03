import SanfonaFAQ from "@/sections/components/SanfonaFAQ";

export default function FAQ() {
  return (
    <section className="pb-8 px-6" id="faq">
      {/* Seção de Perguntas Frequentes */}
      <h2 className="text-center text-2xl md:text-3xl font-bold text-destructive mb-12">
        Perguntas Frequentes
      </h2>

      <div className="max-w-6xl mx-auto gap-8 items-center">
        <SanfonaFAQ />
      </div>

    </section>
  );
}
