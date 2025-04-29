import Image from "next/image";

export default function About() {

  return (
    <section className="pb-8 px-6" >
      {/* Seção de Sobre o Sistema SASI */}
      <h2 className="text-center text-2xl md:text-3xl font-bold text-destructive mb-12">
        O Sistema SASI
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-primary text-2xl md:text-3xl font-bold mb-4">
            Tecnologia que transforma dados em saúde pública eficiente
          </h3>
          <p className="text-sm leading-relaxed">
            O SASI foi desenvolvido por uma equipe multidisciplinar especializada em saúde pública e tecnologia, com o objetivo de:
            <br />
            - Integrar fontes de dados dispersas em uma única plataforma;<br />
            - Analisar tendências e padrões de saúde populacional;<br />
            - Visualizar informações georreferenciadas para tomada de decisão.
          </p>
        </div>

        <div className="w-full">
          <Image
            src="/images/sasi-demo.png"
            alt="Sistema SASI"
            width={600}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section >
  );
}