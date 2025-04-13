'use client' // Necessário para useState e usePathname

import Link from "next/link";
import { usePathname } from 'next/navigation'; // Para link ativo
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, // Exemplo: Indicadores
  Building,      // Exemplo: Estabelecimentos
  ChevronsLeft,  // Ícone para recolher
  ChevronsRight, // Ícone para expandir (ou o mesmo)
  LucideIcon // Importa o tipo base LucideIcon
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
  icon: IconName; // Usa o tipo definido
}

export function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  const links: SidebarLink[] = [
    { href: "/indicadores", label: "Indicadores", icon: "Indicadores" },
    { href: "/estabelecimentos", label: "Estabelecimentos", icon: "Estabelecimentos" },
    // Adicionar outros links aqui
  ];

  const IconComponent = isExpanded ? ChevronsLeft : ChevronsRight;

  return (
    <div className={cn(
        "hidden md:flex md:flex-col fixed inset-y-0 left-0 z-50 border-r bg-muted/40 transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-16" // Largura dinâmica
      )}>
      <div className="flex h-full max-h-screen flex-col gap-2 relative">
        {/* Cabeçalho da Sidebar */}
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 justify-between">
          <Link href="/" className={cn("flex items-center gap-2 font-semibold", !isExpanded && "justify-center w-full")}>
            {/* <Package2 className="h-6 w-6" /> */}
            <span className={cn(!isExpanded && "sr-only")} >SASI</span> {/* Oculta texto quando recolhido */} 
          </Link>
        </div>

        {/* Botão de expandir/recolher (fora do fluxo normal, posicionado) */} 
        <Button 
          variant="ghost"
          size="icon"
          className="absolute top-[70px] -right-4 z-50 bg-background border rounded-full h-8 w-8 hidden md:flex"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <IconComponent className="h-4 w-4" />
          <span className="sr-only">{isExpanded ? 'Recolher' : 'Expandir'}</span>
        </Button>

        {/* Navegação */} 
        <nav className="flex-1 overflow-auto py-4 grid items-start px-2 text-sm font-medium lg:px-4">
          {links.map((link) => {
            // Acesso seguro ao ícone
            const LinkIcon = iconMap[link.icon] || LayoutDashboard; // Fallback icon
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  isActive && "bg-muted text-primary",
                  !isExpanded && "justify-center" // Centraliza ícone quando recolhido
                )}
                title={!isExpanded ? link.label : undefined} // Tooltip quando recolhido
              >
                <LinkIcon className={cn("h-5 w-5", !isExpanded && "h-6 w-6")} />
                <span className={cn("ml-1", !isExpanded && "sr-only")}>{link.label}</span>
              </Link>
            );
          })}
        </nav>
        {/* TODO: Adicionar talvez info do usuário ou link rápido na parte inferior? */}
      </div>
    </div>
  );
} 