import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Hero() {
    return (
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
    )
}