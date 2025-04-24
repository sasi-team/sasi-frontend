import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LucideLayoutDashboard, LucideMap, LucideMousePointerClick } from "lucide-react";

const features = [
  {
    title: "Painel Integrado",
    description: "Dados epidemiológicos, demográficos e socioeconômicos em tempo real.",
    icon: <LucideLayoutDashboard className="h-10 w-10 text-white" />,
  },
  {
    title: "Georreferenciamento",
    description: "Mapa interativo de vulnerabilidades e recursos de saúde.",
    icon: <LucideMap className="h-10 w-10 text-white" />,
  },
  {
    title: "Acesso Simplificado",
    description: "Interface intuitiva, mesmo para não especialistas.",
    icon: <LucideMousePointerClick className="h-10 w-10 text-white" />,
  },
];

export default function FeatureSection() {
  return (
    <section className="py-2 text-center px-6">
      {/* Seção de Título */}
      <h2 className="text-2xl md:text-3xl font-bold text-destructive mb-12">
        Tudo que você precisa em um só lugar!
      </h2>

      {/* Seção de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <Card key={index} className="shadow-md bg-primary">
            <CardHeader className="flex flex-col items-center">
              {feature.icon}
              <CardTitle className="mt-2 text-lg font-semibold text-white">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-white">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Botão de Ação */}
      <Link href="/#contato">
        <Button variant="outline" className="my-10 bg-white border-primary text-primary transition-colors duration-300 ease-in-out font-semibold px-8 shadow-md cursor-pointer">
          VEJA NA PRÁTICA
        </Button>
      </Link>
    </section>
  );
}