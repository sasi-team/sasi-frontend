import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SimpleBarChart } from "@/components/charts/SimpleBarChart";

// Dados de exemplo para os gráficos
const sampleData1 = [
  { name: 'Jan', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Feb', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Mar', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Apr', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'May', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Jun', total: Math.floor(Math.random() * 5000) + 1000 },
];
const sampleData2 = [
  { name: 'A', value: Math.floor(Math.random() * 100) },
  { name: 'B', value: Math.floor(Math.random() * 100) },
  { name: 'C', value: Math.floor(Math.random() * 100) },
  { name: 'D', value: Math.floor(Math.random() * 100) },
];

export default function IndicadoresPage() {
  return (
    <div className="space-y-8">
      <h1 className="section-title">Dashboard de Indicadores</h1>

      {/* TODO: Adicionar filtros/seletores */}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Usando o componente de gráfico */}
        <SimpleBarChart
          title="Indicador 1 (Volume Mensal)"
          data={sampleData1}
          dataKeyX="name"
          dataKeyBar="total"
        />
        <SimpleBarChart
          title="Indicador 2 (Valores)"
          data={sampleData2}
          dataKeyX="name"
          dataKeyBar="value"
        />
        {/* Adicionar mais gráficos conforme necessário */}
         {/* Placeholder para outros tipos de card/indicador */}
         <div className="border bg-card text-card-foreground rounded-lg shadow-sm p-6 flex items-center justify-center h-[398px]">
           <span className="text-muted-foreground">[Outro Indicador/Card]</span>
         </div>
      </div>
    </div>
  );
} 