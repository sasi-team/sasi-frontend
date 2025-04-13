# SASI PoC Frontend

Este projeto é uma Prova de Conceito (Proof of Concept - PoC) para o frontend do SASI, utilizando Next.js, TypeScript, Tailwind CSS e Shadcn/UI.

O objetivo do SASI é ser um sistema de apoio à decisão para gestores de saúde pública, apresentando dashboards, tabelas e mapas com informações georreferenciadas e integrando dados de diversas fontes (DATASUS, InfoGripe, InfoDengue, IBGE, etc.) para fornecer insights valiosos.

## 🚀 Começando

Siga estas instruções para configurar e executar o projeto localmente.

### Pré-requisitos

*   Node.js (versão 18 ou superior recomendada)
*   npm ou yarn

### Instalação

1.  Clone o repositório (ou certifique-se de estar no diretório do projeto).
2.  Instale as dependências:

    ```bash
    npm install
    # ou
    yarn install
    ```

### Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

### Build de Produção

Para gerar a build otimizada para produção:

```bash
npm run build
# ou
yarn build
```

Para executar a build de produção:

```bash
npm start
# ou
yarn start
```

## 🏛️ Estrutura do Projeto

A estrutura de pastas visa promover escalabilidade, manutenibilidade e uma boa experiência de desenvolvimento (DX):

```
sasi-poc-frontend/
├── src/
│   ├── app/             # Rotas e Layouts (App Router)
│   │   ├── (private)/   # Rotas privadas (requerem auth) - Usa PrivateLayout
│   │   ├── (public)/    # Rotas públicas - Usa PublicLayout
│   │   ├── layout.tsx   # Layout Raiz Global
│   │   └── globals.css  # Estilos Globais e Variáveis Tailwind/Shadcn
│   ├── components/      # Componentes Reutilizáveis da UI
│   │   ├── ui/          # Componentes base gerados pelo Shadcn/UI (NÃO editar diretamente)
│   │   ├── shared/      # Componentes gerais construídos por nós (Header, Footer, Sidebar, UserNav)
│   │   ├── features/    # Componentes específicos de uma feature (Ex: um Card complexo de Indicador)
│   │   └── charts/      # Wrappers para componentes de gráficos (Ex: SimpleBarChart)
│   ├── features/        # Lógica de negócio específica por módulo (hooks, services, types - AINDA NÃO USADO)
│   ├── hooks/           # Hooks customizados reutilizáveis
│   ├── lib/             # Funções utilitárias (ex: `cn` do Shadcn), config
│   ├── services/        # Lógica de comunicação com APIs (AINDA NÃO USADO)
│   ├── store/           # Gerenciamento de estado global (AINDA NÃO USADO)
│   ├── styles/          # Arquivos CSS/SCSS adicionais (se necessário)
│   ├── types/           # Definições de tipos TypeScript globais
│   └── contexts/        # Contextos React (Ex: AuthContext - AINDA NÃO USADO)
├── public/            # Arquivos estáticos
├── .env.local         # Variáveis de ambiente locais (NÃO commitadas)
├── next.config.mjs      # Configuração do Next.js
├── eslint.config.mjs    # Configuração do ESLint
├── tsconfig.json        # Configuração do TypeScript
└── tailwind.config.ts   # Configuração do Tailwind CSS
```

**Principais Conceitos:**

*   **App Router:** Usamos a estrutura de roteamento baseada em diretórios do Next.js (`app/`).
*   **Route Groups:** `(public)` e `(private)` definem layouts distintos sem afetar a URL.
*   **Componentização:** Separamos componentes em `ui` (Shadcn), `shared` (reutilizáveis em toda a app) e `features` (ligados a uma funcionalidade específica).
*   **Modularidade:** A pasta `features/` (no nível raiz de `src/`) será usada futuramente para agrupar toda a lógica de um módulo específico.

## 💻 Diretrizes de Desenvolvimento

### Criando Componentes

*   **Componentes de UI Base (Shadcn/UI):** Use a CLI do Shadcn para adicionar componentes reutilizáveis de UI. Eles serão colocados em `src/components/ui/`.
    ```bash
    npx shadcn@latest add [nome-do-componente]
    ```
    *Não modifique diretamente os arquivos em `src/components/ui/`.* Se precisar de customização, crie um novo componente em `shared/` ou `features/` que utilize o componente base do Shadcn.
*   **Componentes Compartilhados:** Crie componentes reutilizáveis em várias partes da aplicação dentro de `src/components/shared/`.
*   **Componentes de Feature:** Se um componente for muito específico para uma funcionalidade (ex: um formulário complexo de "Estabelecimentos"), crie-o dentro de `src/components/features/` (ou futuramente dentro da pasta da feature em `src/features/`).

### Estilização (Tailwind CSS + Shadcn)

*   **Utilitários Tailwind:** Use as classes utilitárias do Tailwind diretamente nos seus componentes para estilização.
*   **Variáveis Shadcn/UI:** As cores e outras variáveis de tema são definidas em `src/app/globals.css` (seções `:root` e `.dark`). Use as variáveis CSS do Tailwind (ex: `bg-background`, `text-primary`, `border-border`) para manter a consistência com o tema.
*   **Classes `@apply`:** Para estilos repetitivos ou para criar abstrações de componentes simples, adicione classes customizadas usando `@apply` dentro do `@layer components` em `src/app/globals.css`. Exemplo:
    ```css
    @layer components {
      .section-title {
        @apply text-2xl font-semibold tracking-tight mb-4;
      }
    }
    ```
*   **Função `cn`:** Para aplicar classes condicionalmente (especialmente útil com variantes e estados), use a função utilitária `cn` importada de `@/lib/utils`.

### Documentação Útil

*   [Next.js Documentation](https://nextjs.org/docs)
*   [Tailwind CSS Documentation](https://tailwindcss.com/docs)
*   [Shadcn/UI Documentation](https://ui.shadcn.com/docs)
*   [Lucide Icons](https://lucide.dev/)
*   [Recharts Documentation](https://recharts.org/)

## ✅ Roadmap / Próximos Passos (Checklist)

Esta é uma lista de tarefas pendentes e áreas para desenvolvimento futuro nesta PoC:

**Funcionalidades Principais:**

*   [ ] **Página Sobre:** Implementar conteúdo final e layout baseado na imagem `sobre-page.png`.
*   [ ] **Página Estabelecimentos:**
    *   [ ] Integrar dados reais/mock na tabela.
    *   [ ] Adicionar paginação à tabela.
    *   [ ] Implementar filtros e busca.
    *   [ ] Adicionar botões de ação (visualizar, editar, etc.) com modais/páginas correspondentes.
    *   [ ] Implementar visualização de mapa (ex: Leaflet, Mapbox) com marcadores georreferenciados.
*   [ ] **Página Indicadores:**
    *   [ ] Adicionar mais tipos de gráficos (Linha, Pizza, etc.) usando Recharts ou outra lib.
    *   [ ] Implementar filtros dinâmicos (período, região, etc.).
    *   [ ] Conectar com fontes de dados reais/mock.
*   [ ] **Página Contato:** Criar página e implementar funcionalidade de envio de mensagem (mock ou real).

**Autenticação e Autorização:**

*   [ ] **Lógica de Autenticação:**
    *   [ ] Implementar chamada à API de login/logout (backend real ou mock).
    *   [ ] Gerenciar estado de autenticação do usuário (Context API ou Zustand).
    *   [ ] Redirecionar usuário após login/logout.
*   [ ] **Proteção de Rotas:** Implementar middleware ou lógica nos layouts para proteger as rotas em `(private)`.

**UI/UX e Design System:**

*   [ ] **Design Responsivo:** Revisar e garantir que todas as páginas e componentes sejam totalmente responsivos (Mobile-First).
*   [ ] **Tema (Claro/Escuro):** Implementar botão para troca de tema e garantir consistência visual.
*   [ ] **Acessibilidade (a11y):** Realizar auditoria básica de acessibilidade nos componentes principais.
*   [ ] **Refinamento de Componentes:**
    *   [ ] Finalizar `Sidebar` (ícones reais para todos os links, links dinâmicos de config, tooltips consistentes).
    *   [ ] Refinar `UserNav` (imagem real do avatar, links funcionais).
    *   [ ] Refinar `Header` e `Footer`.
*   [ ] **Padronização de Estilos:** Continuar identificando padrões e criando classes utilitárias com `@apply`.

**Infraestrutura e Backend:**

*   [ ] **Camada de Comunicação:** Definir e implementar padrão para chamadas à API (Fetch API, Axios, SWR, React Query).
*   [ ] **Tratamento de Erros:** Implementar feedback visual para erros de API e validações.
*   [ ] **Gerenciamento de Estado Global:** Avaliar necessidade e implementar (Zustand, Jotai) se Context API não for suficiente.

**Qualidade e Testes:**

*   [ ] **Testes:** Configurar framework (Jest/Vitest + React Testing Library) e escrever testes unitários/integração para componentes críticos.
*   [ ] **Linting & Formatting:** Manter configurações do ESLint e Prettier (se usado) consistentes.

**Investigações:**

*   [ ] **Erro na Tabela:** Investigar e corrigir definitivamente o erro relacionado ao `TableRow` na página de Estabelecimentos (se ainda ocorrer).
*   [ ] **Sidebar de Sobreposição:** Testar e ajustar comportamento em diferentes navegadores e resoluções.

---
*Contribua seguindo as diretrizes e atualizando este README conforme necessário.*
