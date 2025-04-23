'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <AlertTriangle className="h-20 w-20 text-destructive" />
        </div>
        <h1 className="text-4xl font-bold text-foreground">Oops! Algo deu errado</h1>
        <p className="text-lg text-muted-foreground">
          Encontramos um problema ao carregar esta página. Nossa equipe foi notificada.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="default" onClick={reset}>
            Tentar novamente
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Voltar para a página inicial</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
