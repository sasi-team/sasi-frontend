import Link from 'next/link';
import Image from 'next/image'; // Importar Image
import { Button } from '@/components/ui/button';

// TODO: Adicionar componente NavigationMenu do Shadcn se necessário
// TODO: Obter links de um array/configuração

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-primary text-primary-foreground shadow-sm ">
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
          <Link href="#plataforma" className="hover:text-background">
            Plataforma
          </Link>
          <Link href="#galeria" className="hover:text-background">
            Galeria
          </Link>
          <Link href="#faq" className="hover:text-background">
            FAQ
          </Link>
          <Link href="#sobre-nos" className="hover:text-background">
            Sobre Nós
          </Link>
          <Link href="#contato">
            <Button size={"sm"} className="bg-white text-primary hover:bg-white/90">
              ENTRAR EM CONTATO
            </Button>
          </Link>
          <Link href="/login">
            <Button size={"sm"} className="bg-white text-primary hover:bg-white/90">
              ENTRAR NO SISTEMA
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}