import type { Metadata } from "next";
// import { GeistSans } from "geist/font/sans"; // Removido temporariamente
// import { GeistMono } from "geist/font/mono"; // Removido temporariamente
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "SASI PoC",
  description: "Sistema de Análise em Saúde Integrado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased"
          // GeistSans.variable, // Removido temporariamente
          // GeistMono.variable // Removido temporariamente
        )}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
