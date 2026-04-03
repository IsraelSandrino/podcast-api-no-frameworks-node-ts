# Podcast Manager API

API REST desenvolvida com **Node.js + TypeScript** para gerenciar episódios de podcasts em vídeo, autenticar usuários, gerar feed RSS, registrar plays e acompanhar métricas de consumo.

Mais do que um exercício de CRUD, este projeto mostra domínio de fundamentos importantes de backend: **HTTP nativo do Node**, **arquitetura em camadas**, **autenticação com JWT**, **persistência com SQLite** e **organização orientada à manutenção**.

## Visão Geral

O projeto simula o backend de uma plataforma de podcasts. A aplicação expõe endpoints para:

- listar episódios
- filtrar episódios por podcast
- cadastrar, atualizar, editar parcialmente e remover episódios
- registrar usuários e autenticar acesso
- proteger rotas com JWT
- permitir que usuários sigam podcasts
- gerar feed RSS por podcast
- registrar plays e consultar analytics

Este repositório evidencia capacidade de construir uma API sem depender de frameworks como Express, mostrando entendimento direto sobre requisições HTTP, roteamento, middleware, serviços e acesso ao banco.

## Stack

- `Node.js`
- `TypeScript`
- `http` nativo do Node
- `better-sqlite3`
- `bcrypt`
- `jsonwebtoken`
- `rss`
- `tsx`
- `tsup`
- `vitest`

## Arquitetura

A aplicação segue separação de responsabilidades por camadas:

- `src/server.ts`: inicializa o servidor HTTP e carrega as migrations.
- `src/app.ts`: faz o roteamento manual das requisições.
- `src/controllers`: recebe a requisição, lê parâmetros/body e devolve a resposta HTTP.
- `src/services`: concentra a regra de negócio.
- `src/services/__tests__`: testes unitários.
- `src/repositories`: executa a persistência e as consultas SQL.
- `src/database`: conexão com SQLite, migrations e seed.
- `src/middlewares`: autenticação com JWT.
- `src/utils`: utilitários de parser, rotas, status HTTP e geração de RSS.

Esse desenho facilita manutenção, evolução e testes, além de deixar explícito o caminho completo da requisição dentro da API.

## Como a API Funciona

### 1. Inicialização

Ao subir a aplicação, o arquivo [`src/server.ts`](/home/israelsandrino/Desktop/DIO/Jornada Para o Futuro - Node.js/podcast-manager-api-NodeJS-Typescript/src/server.ts) cria o servidor HTTP a partir da função `app`. Nesse momento, [`src/database/migrations.ts`](/home/israelsandrino/Desktop/DIO/Jornada Para o Futuro - Node.js/podcast-manager-api-NodeJS-Typescript/src/database/migrations.ts) também é carregado para garantir que as tabelas existam no banco SQLite.

### 2. Roteamento manual

O arquivo [`src/app.ts`](/home/israelsandrino/Desktop/DIO/Jornada Para o Futuro - Node.js/podcast-manager-api-NodeJS-Typescript/src/app.ts) interpreta `request.method` e `request.url` para decidir qual controller será executado. Isso evidencia entendimento de baixo nível sobre o ciclo HTTP no Node.js.

### 3. Controller

Cada controller recebe a requisição, extrai body ou parâmetros de rota e chama o service correspondente.

Exemplo:

- `POST /api/auth/login` chama o controller de autenticação
- o controller lê `email` e `password`
- o service valida o usuário
- a resposta retorna um token JWT

### 4. Service

A camada de service encapsula as regras de negócio. É nela que ficam responsabilidades como:

- hash de senha com `bcrypt`
- geração de token com `jsonwebtoken`
- montagem de resposta padronizada
- decisão de status HTTP
- coordenação entre regras e repositórios

### 5. Repository

Os repositories concentram o acesso ao SQLite com SQL explícito. Isso torna a persistência transparente e facilita entender como os dados estão sendo armazenados.

## Modelo de Dados

O banco local `SQLite` é criado automaticamente e contém as seguintes entidades principais:

- `podcasts`: catálogo principal de podcasts
- `episodes`: episódios vinculados a um podcast
- `categories`: categorias disponíveis
- `episode_categories`: relação entre episódios e categorias
- `users`: usuários autenticáveis
- `subscriptions`: podcasts seguidos por cada usuário
- `plays`: histórico de reprodução para analytics

## Fluxos Principais

### Catálogo de episódios

O catálogo pode ser consultado de duas formas:

- `GET /api/list`: retorna todos os episódios cadastrados
- `GET /api/episode?p=flow`: retorna apenas episódios do podcast informado

Hoje a filtragem é feita pelo nome do podcast na query string, e os dados são buscados pela camada de repository no SQLite.

### CRUD de episódios

As operações de escrita passam por autenticação JWT:

- `POST /api/episode`
- `PUT /api/episode/:id`
- `PATCH /api/episode/:id`
- `DELETE /api/episode/:id`

Esse fluxo demonstra controle de acesso e separação clara entre leitura pública e alterações protegidas.

### Autenticação

O fluxo de autenticação funciona assim:

1. O usuário se registra em `POST /api/auth/register`.
2. A senha é criptografada com `bcrypt`.
3. No login em `POST /api/auth/login`, a senha é validada.
4. Em caso de sucesso, a API gera um token JWT com validade de `1d`.
5. As rotas protegidas exigem o header `Authorization: Bearer <token>`.

O middleware [`src/middlewares/auth.ts`](/home/israelsandrino/Desktop/DIO/Jornada Para o Futuro - Node.js/podcast-manager-api-NodeJS-Typescript/src/middlewares/auth.ts) intercepta as requisições protegidas, valida o token e injeta os dados do usuário no objeto `request`.

### Feed RSS

Cada podcast pode expor um feed RSS pela rota:

- `GET /api/feed/:podcastName`

O service de feed busca os episódios do podcast e monta um XML RSS, o que mostra preocupação com integração e distribuição de conteúdo além de JSON tradicional.

### Subscriptions

Usuários autenticados podem seguir podcasts:

- `POST /api/subscriptions/:podcast_id`
- `DELETE /api/subscriptions/:podcast_id`
- `GET /api/subscriptions`

Esse módulo demonstra relacionamento entre entidades e personalização da experiência do usuário.

### Analytics

A API também registra eventos de consumo e gera métricas:

- `POST /api/plays/:episode_id`: registra uma reprodução
- `GET /api/analytics/episode/:episode_id`: retorna plays dos últimos 7 dias e total histórico
- `GET /api/analytics/podcast/:podcastName`: retorna total de plays, episódio mais popular e plays da semana

Esse conjunto amplia o projeto além do CRUD, adicionando visão de produto e observabilidade de uso.

## Endpoints

| Método | Rota | Descrição | Auth |
| --- | --- | --- | --- |
| `GET` | `/api/list` | Lista todos os episódios | Não |
| `GET` | `/api/episode?p=flow` | Filtra episódios por podcast | Não |
| `POST` | `/api/episode` | Cria um episódio | Sim |
| `PUT` | `/api/episode/:id` | Atualiza um episódio por completo | Sim |
| `PATCH` | `/api/episode/:id` | Atualiza parcialmente um episódio | Sim |
| `DELETE` | `/api/episode/:id` | Remove um episódio | Sim |
| `POST` | `/api/auth/register` | Cadastra usuário | Não |
| `POST` | `/api/auth/login` | Autentica usuário e retorna JWT | Não |
| `GET` | `/api/feed/:podcastName` | Gera feed RSS do podcast | Não |
| `POST` | `/api/subscriptions/:podcast_id` | Segue um podcast | Sim |
| `DELETE` | `/api/subscriptions/:podcast_id` | Deixa de seguir um podcast | Sim |
| `GET` | `/api/subscriptions` | Lista inscrições do usuário | Sim |
| `POST` | `/api/plays/:episode_id` | Registra uma reprodução | Público no roteamento atual |
| `GET` | `/api/analytics/episode/:episode_id` | Analytics por episódio | Sim |
| `GET` | `/api/analytics/podcast/:podcastName` | Analytics por podcast | Sim |

## Exemplos de Uso

### Registrar usuário

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Israel",
  "email": "israel@email.com",
  "password": "123456"
}
```

### Fazer login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "israel@email.com",
  "password": "123456"
}
```

Resposta esperada:

```json
{
  "token": "jwt-token"
}
```

### Criar episódio autenticado

```http
POST /api/episode
Authorization: Bearer jwt-token
Content-Type: application/json

{
  "podcastName": 1,
  "episode": "Novo episódio",
  "videoId": "abc123xyz"
}
```

### Listar episódios

```http
GET /api/list
```

Exemplo de resposta:

```json
[
  {
    "id": 1,
    "podcast_id": 1,
    "title": "ROBINSON FARINAZZO [ARTE DA GUERRA] - Flow #581",
    "video_id": "we9abjZyjo8",
    "created_at": "2026-04-03 00:00:00"
  }
]
```

## Como Executar

### Pré-requisitos

- Node.js instalado
- npm instalado

### 1. Instalar dependências

```bash
npm install
```

### 2. Criar o arquivo `.env`

```env
PORT=3333
SECRET=uma_chave_jwt_segura
```

### 3. Iniciar em desenvolvimento

```bash
npm run start:dev
```

### 4. Modo watch

```bash
npm run start:watch
```

## Scripts

- `npm run start:dev`: sobe a API com `tsx`
- `npm run start:watch`: executa em modo watch
- `npm run dist`: gera build com `tsup`
- `npm test`: executa testes com `vitest`

## Dados de Exemplo

O repositório possui uma base inicial em [`src/repositories/podcasts.json`](/home/israelsandrino/Desktop/DIO/Jornada Para o Futuro - Node.js/podcast-manager-api-NodeJS-Typescript/src/repositories/podcasts.json) com episódios de exemplo, além de um arquivo de seed em [`src/database/seed.ts`](/home/israelsandrino/Desktop/DIO/Jornada Para o Futuro - Node.js/podcast-manager-api-NodeJS-Typescript/src/database/seed.ts) para popular o banco local.

## Diferenciais Técnicos do Projeto

- Implementação com `http` nativo do Node, sem abstrações de framework.
- Organização em camadas inspirada em aplicações backend de produção.
- Autenticação segura com hash de senha e JWT.
- Persistência relacional local com SQL explícito em SQLite.
- Geração de feed RSS para distribuição de conteúdo.
- Camada de analytics para leitura de engajamento.
- Base sólida para evoluir para testes, paginação, cache, Docker e CI/CD.

## Próximos Passos

- adicionar validação de payload e tratamento centralizado de erros
- enriquecer a modelagem de categorias no retorno dos episódios
- criar testes automatizados para rotas e services
- documentar a API com Swagger ou OpenAPI
- adicionar Docker e pipeline de CI

## Autor

Projeto desenvolvido como parte da minha jornada prática em backend com Node.js e TypeScript, com foco em demonstrar fundamentos sólidos de arquitetura, autenticação, persistência e evolução de APIs reais.
