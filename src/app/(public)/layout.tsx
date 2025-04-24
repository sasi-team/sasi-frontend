'use client'

import React from 'react';
import { usePathname } from 'next/navigation';
import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/recuperarsenha';

  return (
    <div className={`relative flex min-h-screen flex-col ${isAuthPage ? 'justify-center items-center bg-primary' : ''}`}>
      {!isAuthPage && <Header />}
      <main className="w-full mx-auto">{children}</main>
      {!isAuthPage && <Footer />}
    </div>
  );
} 