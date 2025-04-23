"use client"
import Link from 'next/link';
import Image from 'next/image'; // Importar Image
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

const sectionLinks = [
  { name: 'Plataforma', id: 'plataforma' },
  { name: 'Galeria', id: 'galeria' },
  { name: "FAQ", id: "faq" },
  { name: "Sobre Nós", id: "#sobre-nos" }
];

export function Header() {

  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-primary text-primary-foreground shadow-sm ">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">

        <div className="flex items-center">
          <Image
            src="/logo-sasi.png"
            width={200}
            height={200}
            alt="Logo do Projeto"
            className="h-10 w-auto rounded-full" />
        </div>

        <div className="flex items-center space-x-3 text-sm font-medium">
          {sectionLinks.map((link) => (
            <Link
              key={link.id}
              href={`/#${link.id}`}
              className="transition-colors hover:text-primary-foreground/80 text-primary-foreground/90"
            >
              {link.name}
            </Link>
          ))}

          <Link href={"/#contato"}>
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