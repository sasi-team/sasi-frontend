import Link from "next/link";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Seção Hero/Login */}
      <Hero/>
      {/* Seção "Sobre" (resumo) */}
      <Sobre/>
      {/* Seção "Funcionalidades" (Exemplo) */}
      <section>
        <h2 className="section-title text-center">Funcionalidades Principais</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Indicadores</CardTitle>
              <CardDescription>Visualize e analise indicadores chave.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Acesse gráficos e relatórios detalhados.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Estabelecimentos</CardTitle>
              <CardDescription>Gerencie informações dos estabelecimentos.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Consulte dados e localize unidades.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Relatórios</CardTitle>
              <CardDescription>Gere relatórios personalizados.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Exporte dados em diferentes formatos.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}