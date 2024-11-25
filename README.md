<div align="center">
    <a href="https://github.com/sasi-team/sasi-frontend" target="_blank">
        <img src="./public/assets/sasi.png" 
        alt="Logo" width="1000" height="500">
    </a>
</div>

<div align="center">
    <a href="https://github.com/sasi-team/sasi-frontend" target="_blank">
        <img src="./public/assets/LOGO_BG.png" 
        alt="Logo" width="200" height="200">
    </a>
</div>

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=50&duration=3000&pause=200&color=2D6A4F&center=true&vCenter=true&multiline=true&random=false&width=435&height=100&lines=SASI"> 
</div>

## **Visão Geral**

O **SASI (Sistema de Análise em Saúde Integrada)** é uma plataforma tecnológica que centraliza dados da saúde pública brasileira, com o objetivo de fornecer insights analíticos e promover uma gestão mais eficiente e baseada em evidências. Entre suas funcionalidades estão mapas interativos e dashboards que permitem visualizações estratégicas de dados georreferenciados e indicadores de saúde.

## Deploy da Aplicação

Confira o SASI acessando o link a seguir: [SASI](https://sasi-frontend.vercel.app/).

### Módulos Principais

#### 1. Mapa de Calor dos Estabelecimentos de Saúde

Este módulo foi construído utilizando dados de uma API pública do governo:

- [Estabelecimentos de Saúde](https://apidadosabertos.saude.gov.br/cnes/estabelecimentos)
- [Tipos de Unidades](https://apidadosabertos.saude.gov.br/cnes/tipounidades)

A funcionalidade principal é baseada nos dados georreferenciados dos estabelecimentos de saúde, permitindo uma visão analítica da distribuição social e geográfica desses estabelecimentos no estado da Bahia. Embora o escopo inicial seja limitado à Bahia, a aplicação é escalável para análise nacional. Esta funcionalidade pode ser acessada em `/estabelecimentos` após o usuário entrar no sistema na área logada.

#### 2. Mapa de Indicadores de Saúde

Este módulo permite a exibição de indicadores de saúde extraídos de um arquivo Excel fornecido pelo IBGE, tratado via ETL com Python e salvo em banco de dados. O mapa possibilita ao gestor visualizar os indicadores por cidade, utilizando uma escala de cores de verde a vermelho para indicar a qualidade do indicador naquela cidade. Esta funcionalidade pode ser acessada em `/indicadores` após o usuário entrar no sistema na área logada.

### 3. Página Inicial

Inclui um carrossel dinâmico que exibe notícias da API do IBGE, com possibilidade de futuras integrações com APIs de órgãos de saúde. Esta funcionalidade pode ser acessada em `/home` após o usuário entrar no sistema na área logada.

O serviço de notícias utilizado pode ser acessado no link a seguir:

- [Api de Notícias IBGE](https://servicodados.ibge.gov.br/api/docs/noticias?versao=3)

### Relevância para Gestores de Saúde

Essas funcionalidades são relevantes para gestores de saúde porque fornecem uma visão clara e analítica da distribuição e qualidade dos serviços de saúde, permitindo uma melhor tomada de decisão e planejamento estratégico. O potencial de crescimento rápido é significativo, pois a aplicação é escalável e pode ser adaptada para análises em nível nacional.

### Instruções para Rodar o Projeto

**Observação: acesso ao sistema (login)**

Atualmente, qualquer combinação de usuário e senha permite acesso ao sistema, pois o serviço de autenticação está em desenvolvimento. Ex.:

- Email: sasi@admin.com
- Senha: 123456

#### Com API

**Observação: Caso opte por essa alternativa, baixe o repositório back-end e siga as instruções do link abaixo:**

- [Repositório Backend | Sasi-API](https://github.com/sasi-team/sasi-api)

**Prossiga com:**

1. Clone o repositório:
   ```bash
   git clone https://github.com/sasi-team/sasi-frontend.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd sasi-frontend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor:
   ```bash
   ng serve
   ```
5. Para produção, inicie o servidor com a configuração de produção:
   ```bash
   ng serve --configuration=production
   ```

#### Sem API (Mockado)

1. Clone o repositório:
   ```bash
   git clone https://github.com/sasi-team/sasi-frontend.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd sasi-frontend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure o ambiente:

   - Acesse a pasta `src/environments` e altere o valor de `useMockData` no arquivo `environment.ts` para `false`.

5. Inicie o servidor com dados mockados:
   ```bash
   npm start
   ```
