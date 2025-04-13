import React from 'react';
import { Footer } from '@/components/shared/Footer';
import { Sidebar } from '@/components/shared/Sidebar';
import { PrivateHeader } from '@/components/shared/PrivateHeader';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-1 flex-col sm:gap-4 sm:py-4 sm:pl-14 md:pl-64">
        <PrivateHeader />
        <main className="flex-grow p-4 sm:px-6 sm:py-0 md:gap-8">{children}</main>
        <Footer />
      </div>
    </div>
  );
} 