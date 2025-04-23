import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

//TODO: Remover essa página - Feita para fins didáticos
// Componente que será carregado com Suspense
const DataComponent = async () => {
  // Simula uma operação assíncrona
  const data = await fetchData();
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dados Carregados</h2>
      <pre className="bg-muted p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

// Função fictícia para simular busca de dados
async function fetchData() {
  // Simula um delay de carregamento
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { message: "Dados carregados com sucesso!", timestamp: new Date().toISOString() };
}

export default function ExamplePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Exemplo de uso do Suspense</h1>
      
      <Suspense fallback={<LoadingSpinner fullScreen={false} text="Buscando dados..." />}>
        <DataComponent />
      </Suspense>
    </div>
  );
}
