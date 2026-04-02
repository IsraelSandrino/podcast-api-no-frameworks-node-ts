# Podcast Manager API

API desenvolvida em Node.js com TypeScript para organizar e disponibilizar episodios de podcasts em video por categorias. O projeto simula o backend de uma plataforma de catalogo de podcasts, permitindo listar episodios e filtrar conteudo pelo nome do podcast.

## Sobre o projeto

O **Podcast Manager API** foi criado com foco em simplicidade e organizacao de responsabilidades, seguindo uma estrutura separada por `controllers`, `services`, `repositories`, `models` e `routes`. A aplicacao expoe endpoints HTTP que retornam dados em JSON a partir de um arquivo local, servindo como base para estudos de API REST com Node.js puro.

## Funcionalidades

- Listagem de episodios cadastrados
- Filtro de episodios por nome do podcast
- Retorno de dados em formato JSON
- Organizacao por camadas para facilitar manutencao e evolucao do projeto

## Tecnologias utilizadas

- Node.js
- TypeScript
- HTTP nativo do Node
- TSX
- TSUP

## Estrutura da API

### Listar todos os episodios

`GET /api/list`

### Filtrar episodios por podcast

`GET /api/episode?p=flow`

## Exemplo de resposta

```json
[
  {
    "podcastName": "flow",
    "episode": "ROBINSON FARINAZZO [ARTE DA GUERRA] - Flow #581",
    "videoId": "we9abjZyjo8",
    "categories": ["mentalidade", "historia"]
  },
  {
    "podcastName": "venus",
    "episode": "Xuxa",
    "videoId": "0000000000",
    "categories": ["humor"]
  }
]
```

## Como executar o projeto

1. Instale as dependencias:

```bash
npm install
```

2. Crie um arquivo `.env` com a porta da aplicacao:

```env
PORT=3333
```

3. Inicie o servidor em modo de desenvolvimento:

```bash
npm run start:dev
```

## Scripts disponiveis

- `npm run start:dev`: inicia o projeto com `tsx`
- `npm run start:watch`: executa o servidor em modo watch
- `npm run dist`: gera a build com `tsup`

## Objetivo

Este projeto foi desenvolvido como exercicio pratico para consolidar conceitos de construcao de APIs com Node.js e TypeScript, incluindo roteamento, separacao de camadas, leitura de dados e manipulacao de respostas HTTP.
