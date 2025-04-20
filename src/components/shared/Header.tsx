import Link from 'next/link';
import Image from 'next/image'; // Importar Image
import { Button } from '@/components/ui/button';

// TODO: Adicionar componente NavigationMenu do Shadcn se necessário
// TODO: Obter links de um array/configuração

export function Header() {
  return (
    <header className="sticky px-4 top-0 z-50 w-full border-b border-primary/20 bg-primary text-primary-foreground">
      <div className="container flex h-16 items-center">
        {/* Logo/Título */}
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="/logo-sasi.png"
              alt="SASI Logo"
              width={60}
              height={60}
              className="h-auto rounded-full"
            />
          </Link>
        </div>

        {/* Navegação Principal (Apenas Sobre) - Adicionar navegção entre seções da landing */}
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            href="/sobre"
            // Ajustar cores para contraste
            className="transition-colors hover:text-primary-foreground/80 text-primary-foreground/90"
          >
            Sobre
          </Link>
          {/* Adicionar outros links do Figma aqui (Plataforma, Galeria) se necessário */}
          {/* Implementar links de rolagem com "#" */}
        </nav>

        {/* Botão de Login/Contato */}
        <div className="flex items-center justify-end space-x-4">
          <nav>
            <Link href="/login">
              <Button variant="secondary" size="sm" className="bg-white text-primary hover:bg-white/90">
                Login
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}