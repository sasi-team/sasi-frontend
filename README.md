# SASI Frontend

## Configurações Básicas

### Módulos Principais

#### 1. Mapa de Calor dos Estabelecimentos de Saúde
Este módulo foi construído utilizando dados de uma API pública do governo:
- [Estabelecimentos de Saúde](https://apidadosabertos.saude.gov.br/cnes/estabelecimentos)
- [Tipos de Unidades](https://apidadosabertos.saude.gov.br/cnes/tipounidades)

A funcionalidade principal é baseada nos dados georreferenciados dos estabelecimentos de saúde, permitindo uma visão analítica da distribuição social e geográfica desses estabelecimentos no estado da Bahia. Embora o escopo inicial seja limitado à Bahia, a aplicação é escalável para análise nacional. Esta funcionalidade pode ser acessada em `/app/dados-abertos-saude` após o usuário entrar no sistema na área logada.

#### 2. Mapa de Indicadores de Saúde
Este módulo permite a exibição de indicadores de saúde extraídos de um arquivo Excel fornecido pelo IBGE, tratado via ETL com Python e salvo em banco de dados. O mapa possibilita ao gestor visualizar os indicadores por cidade, utilizando uma escala de cores de verde a vermelho para indicar a qualidade do indicador naquela cidade.

### Relevância para Gestores de Saúde
Essas funcionalidades são relevantes para gestores de saúde porque fornecem uma visão clara e analítica da distribuição e qualidade dos serviços de saúde, permitindo uma melhor tomada de decisão e planejamento estratégico. O potencial de crescimento rápido é significativo, pois a aplicação é escalável e pode ser adaptada para análises em nível nacional.

### Instruções para Rodar o Projeto

#### Com API
1. Clone o repositório:
    ```bash
    git clone https://github.com/sasi-team/sasi.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd sasi
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
    git clone https://github.com/sasi-team/sasi.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd sasi
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
4. Inicie o servidor com dados mockados:
    ```bash
    ng serve
    ```
