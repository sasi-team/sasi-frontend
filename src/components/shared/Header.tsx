import Link from 'next/link';

import { Button } from '@/components/ui/button';

// TODO: Adicionar componente NavigationMenu do Shadcn se necessário
// TODO: Obter links de um array/configuração

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo/Título */}
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* TODO: Adicionar um ícone/logo SVG? */}
            <span className="font-bold sm:inline-block">
              SASI
            </span>
          </Link>
        </div>

        {/* Navegação Principal (Apenas Sobre) */}
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            href="/sobre"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Sobre
          </Link>
        </nav>

        {/* Botão de Login */}
        <div className="flex items-center justify-end space-x-4">
          <nav>
            <Link href="/login">
              <Button variant="secondary" size="sm">
                Login
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 