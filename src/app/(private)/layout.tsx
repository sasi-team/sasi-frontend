'use client'; // Necessário para hooks e lógica de cliente

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/contexts/AuthContext"; // Importa o hook
import { Footer } from '@/components/shared/Footer';
import { Sidebar } from '@/components/shared/Sidebar';
import { PrivateHeader } from '@/components/shared/PrivateHeader';
import { AppSidebar } from '@/components/shared/SidebarApp';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Lógica de proteção movida para cá
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Mostra loader enquanto verifica ou se não autenticado
  if (isLoading || !isAuthenticated) {
    // TODO: Adicionar um componente Spinner/Loader mais robusto
    return <div className="flex h-screen items-center justify-center">Carregando...</div>;
  }

  // Renderiza o layout normal se autenticado
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <SidebarProvider defaultOpen>
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col">
            <PrivateHeader />
            <main className="flex-grow p-4 sm:px-6 sm:py-6">{children}</main>
            <Footer />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
} 