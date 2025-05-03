import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[450px] md:h-[550px] flex items-center overflow-hidden bg-primary">
      {/* Imagem de fundo com sobreposição escura */}
      <Image
        src="/images/hero-bg.png"
        alt="Fundo SASI"
        fill
        className="object-cover opacity-20"
        priority
      />

      {/* Conteúdo */}
      <div className="z-10 text-white max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 px-8">
        <div className="md:items-left flex flex-col text-center md:text-left">
          <h1 className="text-2xl text-center md:text-left md:text-4xl font-bold uppercase leading-tight ">
            Transformando dados em saúde pública eficiente
          </h1>
          <p className="mt-4 text-xl leading-relaxed text-center md:text-left">
            O <strong>SASI</strong> é a plataforma que unifica dados de saúde pública em um único painel inteligente,
            ajudando gestores a tomar decisões rápidas, antecipar <strong>surtos</strong> e reduzir <strong>desigualdades</strong>.
          </p>
          <Link href="/#contato">
            <Button className="mt-6 bg-white text-primary font-semibold hover:bg-muted transition-colors duration-300 ease-in-out cursor-pointer">
              QUERO CONHECER A PLATAFORMA
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}