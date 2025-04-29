import Image from "next/image";
import Carrossel from "./Carrossel";

export default function Gallery() {
  return (
    <section className="pb-8 px-6" >
      {/* Seção de Galeria */}
      <h2 className="text-center text-2xl md:text-3xl font-bold text-destructive mb-12">
        Galeria
      </h2>

      <div className="max-w-lg mx-auto items-center">
        <Carrossel />
      </div>
    </section >
  );
}