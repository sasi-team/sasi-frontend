import React from 'react';

import { Footer } from '@/components/shared/Footer';
import { PrivateHeader } from '@/components/shared/PrivateHeader';
import { Sidebar } from '@/components/shared/Sidebar';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <PrivateHeader />
        <main className="flex-grow p-4 sm:px-6 sm:py-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
} 