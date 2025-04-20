'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building,
  Home,
  ChevronDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 px-4 py-2">
          <Home className="h-6 w-6" />
          <span className="font-semibold">SASI</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {/* Indicadores com subitens */}
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton 
                  tooltip="Indicadores"
                  isActive={pathname.startsWith('/indicadores')}
                >
                  <LayoutDashboard />
                  <span>Indicadores</span>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      href="/indicadores/gestao"
                      isActive={pathname === '/indicadores/gestao'}
                    >
                      Gestão
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      href="/indicadores/desempenho"
                      isActive={pathname === '/indicadores/desempenho'}
                    >
                      Desempenho
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          {/* Estabelecimentos */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Estabelecimentos"
              isActive={pathname.startsWith('/estabelecimentos')}
            >
              <Link href="/estabelecimentos">
                <Building />
                <span>Estabelecimentos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}