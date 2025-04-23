import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <FileQuestion className="h-20 w-20 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground">404 - Página não encontrada</h1>
        <p className="text-lg text-muted-foreground">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="default" asChild>
            <Link href="/">Voltar para a página inicial</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/#contato">Entrar em contato</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
