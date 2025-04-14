'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean; // Para checagem inicial do token
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Nome da chave no localStorage
const LOCAL_STORAGE_TOKEN_KEY = 'sasi_auth_token';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Inicia carregando

  // Efeito para carregar o token do localStorage na inicialização
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
      if (storedToken) {
        setTokenState(storedToken);
      }
    } catch (error) {
      console.error("Failed to access localStorage:", error);
      // Em SSR ou ambiente restrito, localStorage pode não estar disponível
    }
    setIsLoading(false); // Finaliza o carregamento inicial
  }, []);

  // Função para atualizar o token no estado e no localStorage
  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    try {
      if (newToken) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, newToken);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      }
    } catch (error) {
        console.error("Failed to access localStorage:", error);
    }
  };

  const logout = () => {
    setToken(null); // Limpa o token do estado e localStorage
    // TODO: Redirecionar para login ou limpar estado adicional?
  };

  const isAuthenticated = !!token; // Usuário está autenticado se houver um token

  return (
    <AuthContext.Provider value={{ token, setToken, isAuthenticated, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 