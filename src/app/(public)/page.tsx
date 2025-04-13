import Link from "next/link";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Seção Hero/Login */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
          Bem-vindo ao SASI
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Sistema de Análise em Saúde Integrada.
        </p>
        <Link href="/login">
          <Button size="lg">Acessar o Sistema</Button>
        </Link>
      </section>

      {/* Seção "Sobre" (resumo) */}
      <section>
        <h2 className="section-title text-center">Sobre o Sistema</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* TODO: Adicionar uma imagem ilustrativa? */}
          <div>
            <p className="mb-4 text-muted-foreground">
              O SASI é uma ferramenta desenvolvida para auxiliar na gestão e
              monitoramento de indicadores institucionais, facilitando a tomada
              de decisão e o acompanhamento de metas.
            </p>
            <p className="mb-4 text-muted-foreground">
              Explore os dados, visualize tendências e compreenda melhor o
              desempenho da instituição.
            </p>
            <Link href="/sobre">
              <Button variant="outline">Saiba Mais</Button>
            </Link>
          </div>
          {/* Placeholder para Imagem */}
          <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
            <span className="text-muted-foreground">[Imagem Sobre]</span>
          </div>
        </div>
      </section>

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