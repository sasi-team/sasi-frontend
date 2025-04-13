'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Building,
    ChevronsLeft,
    ChevronsRight,
    LucideIcon,
    Home, // Ícone para o link SASI
} from "lucide-react";

// Define um tipo para as chaves do iconMap
type IconName = "Indicadores" | "Estabelecimentos";

// Mapeamento de ícones com tipo explícito
const iconMap: Record<IconName, LucideIcon> = {
  Indicadores: LayoutDashboard,
  Estabelecimentos: Building,
};

interface SidebarLink {
  href: string;
  label: string;
  icon: IconName;
}

export function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false); // Começa recolhida por padrão

  const links: SidebarLink[] = [
    { href: "/indicadores", label: "Indicadores", icon: "Indicadores" },
    { href: "/estabelecimentos", label: "Estabelecimentos", icon: "Estabelecimentos" },
    // Adicionar outros links aqui
  ];

  const ToggleIcon = isExpanded ? ChevronsLeft : ChevronsRight;

  return (
    <>
      {/* Div externo: ocupa espaço fixo recolhido no layout */}
      <div aria-hidden className="hidden md:block w-16 flex-shrink-0" />

      {/* Div da Sidebar real: posicionada fixa, controla a largura visual */}
      <div
        className={cn(
          "hidden md:flex md:flex-col fixed inset-y-0 left-0 z-50 border-r bg-background transition-all duration-300 ease-in-out", // bg-background para sobrepor melhor
          isExpanded ? "w-64" : "w-16"
        )}
      >
        <div className="flex h-full max-h-screen flex-col relative overflow-hidden">
          {/* Cabeçalho da Sidebar com logo/título */}
          <div className={cn(
            "flex h-14 items-center border-b px-4 lg:h-[60px]",
             isExpanded ? "px-6 justify-start" : "justify-center"
            )}>
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Home className="h-6 w-6 flex-shrink-0" />
              <span className={cn("whitespace-nowrap", !isExpanded && "sr-only")}>SASI</span>
            </Link>
          </div>

          {/* Botão de Toggle posicionado sobre a borda direita */}
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 z-50 bg-background border-2 rounded-full h-7 w-7 hidden md:flex",
              isExpanded ? "-right-3" : "-right-3" // Mantem na borda
            )}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ToggleIcon className="h-4 w-4" />
            <span className="sr-only">{isExpanded ? 'Recolher' : 'Expandir'}</span>
          </Button>

          {/* Navegação Principal */}
          <nav className="overflow-hidden py-4 grid items-start px-2 text-sm font-medium">
            {links.map((link) => {
              const LinkIcon = iconMap[link.icon] || LayoutDashboard;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive && "bg-muted text-primary",
                    !isExpanded && "justify-center"
                  )}
                  title={!isExpanded ? link.label : undefined}
                >
                  <LinkIcon className={cn("h-5 w-5 flex-shrink-0", !isExpanded && "h-6 w-6")} />
                  <span className={cn("whitespace-nowrap", !isExpanded && "sr-only")}>{link.label}</span>
                </Link>
              );
            })}
          </nav>
          {/* TODO: Adicionar talvez info do usuário ou link rápido na parte inferior? */}
        </div>
      </div>
    </>
  );
} 