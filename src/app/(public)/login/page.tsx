'use client'

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';

    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await fetch(`${backendUrl}/api/v1/login/access-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Erro ao fazer login');
      }

      if (data.access_token) {
        setToken(data.access_token);
        router.push('/indicadores');
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro inesperado.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-12">
      <Card className="w-full max-w-2xl flex-row bg-primary/15">
        <div className="flex flex-1 flex-col align-center justify-center">
          <Image
            src="/sasi.png"
            alt="Logo"
            width={200}
            height={100}
            className="mx-auto mb-4"
          />
          <CardTitle className="text-center text-4xl mb-2 font-bold text-primary">S<span className="text-chart-3">A</span>S<span className="text-chart-3">I</span></CardTitle>
          <CardDescription className="text-center tlext-wrap text-lg text-primary font-semibold mb-4 px-4">
            Sistema de Análise em Saúde Integrada
          </CardDescription>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 flex-col align-center justify-center my-6">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-bold mb-4 text-primary">Acesse o S<span className='text-chart-3'>A</span>S<span className="text-chart-3">I</span ></CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4" >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="bg-primary-foreground border-primary"
                autoComplete="email"
              />
            </div>
            <div className="grid gap-2">
              <div className='flex items-center justify-between'>
                <Label htmlFor="password">Senha</Label>
                {/* <Link
                  href="/recuperarsenha"
                  className="text-sm font-medium text-primary hover:text-secondary text-shadow-accent">
                  Esqueceu a senha?
                </Link> */}
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="bg-primary-foreground border-primary"
              />
            </div>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full mt-5" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 