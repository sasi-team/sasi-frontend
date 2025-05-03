export default function Team() {
  return (
    <section className="pb-8 px-6" id="sobre-nos">
      {/* Seção de Sobre Nós */}
      <h2 className="text-center text-2xl md:text-3xl font-bold text-destructive mb-12">
        Sobre Nós
      </h2>

      <div className="max-w-6xl mx-auto">
        <h4 className="font-medium">Quem somos?</h4>
        <p className="mb-6">O SASI nasceu do trabalho de uma equipe de especialistas em tecnologia da Residência Tecnológica TIC36. Combinamos conhecimento técnico em análise de dados com experiência prática para desenvolver uma solução que realmente atenda às necessidades dos gestores.</p>

        <h4 className="font-medium">Missão</h4>
        <p className="mb-6">Transformar a gestão de saúde pública brasileira, oferecendo uma solução prática e tecnológica para otimizar a tomada de decisões.</p>

        <h4 className="font-medium">Visão</h4>
        <p className="mb-6">Ser referência no Estado da Bahia em integração e análise de dados em saúde pública nos próximos 5 anos.</p>

        <h4 className="font-medium">Valores</h4>
        <p className="mb-6">Inovação; Integridade; Compromisso; Equidade.</p>
      </div>
    </section >
  );
}