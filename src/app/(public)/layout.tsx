import React from 'react';

import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-4">{children}</main>
      <Footer />
    </div>
  );
} 