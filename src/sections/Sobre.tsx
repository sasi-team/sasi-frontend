import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Sobre() {
    return (
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
              <Button variant="default"  >Saiba Mais</Button>
            </Link>
          </div>
          {/* Placeholder para Imagem */}
          <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
            <span className="text-muted-foreground">[Imagem Sobre]</span>
          </div>
        </div>
      </section>
    )
}