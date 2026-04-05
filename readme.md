# Podcast Manager API

API REST construída com **Node.js + TypeScript** usando o módulo **`http` nativo** (sem Express), com foco em fundamentos de backend: roteamento manual, autenticação JWT, persistência em SQLite, feed RSS e analytics.

## Objetivo

Este projeto simula o backend de uma plataforma de podcasts em vídeo, permitindo:

- consulta e filtragem de episódios
- CRUD de episódios com proteção por token
- cadastro e login de usuários
- assinatura de podcasts por usuário
- geração de feed RSS por podcast
- registro de plays e consulta de métricas

## Stack

- Node.js
- TypeScript
- `http` nativo do Node
- `better-sqlite3`
- `bcrypt`
- `jsonwebtoken`
- `rss`
- `tsx`
- `tsup`
- `vitest`

## Arquitetura

A aplicação está organizada por domínio em `src/modules/*` e por infraestrutura compartilhada:

- `src/server.ts`: inicia o servidor e executa migrations
- `src/app.ts`: delega o fluxo para o registrador de rotas
- `src/routes/*`: definição e matching de rotas (incluindo parâmetros dinâmicos)
- `src/modules/*`: controllers, services e repositories por contexto de negócio
  - `episodes`
  - `auth`
  - `subscriptions`
  - `feed`
  - `analytics`
- `src/database/*`: conexão SQLite, migrations e seed
- `src/shared/http/*`: helpers de resposta e tratamento centralizado de erros
- `src/utils/*`: parsers e utilitários HTTP

## Banco de Dados

As migrations criam as tabelas:

- `podcasts`
- `episodes`
- `categories`
- `episode_categories`
- `users`
- `subscriptions`
- `plays`

O arquivo `database.db` é gerado localmente na raiz do projeto.

## Endpoints

| Método | Rota | Descrição | Auth |
| --- | --- | --- | --- |
| `GET` | `/api/list` | Lista episódios | Não |
| `GET` | `/api/episode?p=<podcast>` | Filtra episódios por nome do podcast | Não |
| `POST` | `/api/episode` | Cria episódio | Sim |
| `PUT` | `/api/episode/:episodeId` | Atualiza episódio completo | Sim |
| `PATCH` | `/api/episode/:episodeId` | Atualiza episódio parcial | Sim |
| `DELETE` | `/api/episode/:episodeId` | Remove episódio | Sim |
| `POST` | `/api/auth/register` | Registra usuário | Não |
| `POST` | `/api/auth/login` | Autentica usuário e retorna JWT | Não |
| `GET` | `/api/feed/:podcastName` | Retorna feed RSS (XML) | Não |
| `GET` | `/api/subscriptions` | Lista inscrições do usuário autenticado | Sim |
| `POST` | `/api/subscriptions/:podcastId` | Inscreve usuário em podcast | Sim |
| `DELETE` | `/api/subscriptions/:podcastId` | Remove inscrição do usuário | Sim |
| `POST` | `/api/plays/:episodeId` | Registra play de episódio | Não |
| `GET` | `/api/analytics/episode/:episodeId` | Analytics por episódio | Sim |
| `GET` | `/api/analytics/podcast/:podcastName` | Analytics por podcast | Sim |

## Exemplos de Payload

### Registro

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Israel",
  "email": "israel@email.com",
  "password": "123456"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "israel@email.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "token": "<jwt-token>"
}
```

### Criar episódio (autenticado)

```http
POST /api/episode
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "podcast_id": 1,
  "title": "Novo episódio",
  "video_id": "abc123xyz"
}
```

## Como Executar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz:

```env
PORT=3333
SECRET=sua_chave_jwt_segura
```

### 3. Subir em desenvolvimento

```bash
npm run start:dev
```

## Scripts

- `npm run start:dev`: executa a API com `tsx`
- `npm run start:watch`: executa em modo watch
- `npm run dist`: gera build com `tsup`
- `npm test`: executa testes em modo watch
- `npm run test:run`: executa testes uma vez

## Testes

A suíte cobre principalmente regras de serviço nos módulos:

- `episodes`
- `auth`
- `subscriptions`
- `feed`
- `analytics`

Para rodar todos os testes uma vez:

```bash
npm run test:run
```

## Seed de dados (opcional)

O projeto possui base de exemplo em `src/database/podcasts.json`.

Para popular manualmente:

```bash
npx tsx src/database/seed.ts
```

## Próximas Evoluções

- validação de payload com schema
- documentação OpenAPI/Swagger
- paginação e ordenação de listagens
- containerização com Docker
- pipeline CI para testes
