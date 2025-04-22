import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo do Projeto */}
        <div className="flex items-center">
          <Image
            src="/logo-sasi.png"
            width={200}
            height={200}
            alt="Logo do Projeto"
            className="h-10 w-auto" />
        </div>

        {/* Navegação */}
        <div className="flex items-center space-x-3 text-sm font-medium">
          <Link href="#plataforma" className="hover:text-primary">
            Plataforma
          </Link>
          <Link href="#galeria" className="hover:text-primary">
            Galeria
          </Link>
          <Link href="#faq" className="hover:text-primary">
            FAQ
          </Link>
          <Link href="#sobre-nos" className="hover:text-primary">
            Sobre Nós
          </Link>
          <Link href="#contato">
            <button className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-md hover:bg-primary/90">
              ENTRAR EM CONTATO
            </button>
          </Link>
          <Link href="/login">
            <button className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-md hover:bg-primary/90">
              ENTRAR NO SISTEMA
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}