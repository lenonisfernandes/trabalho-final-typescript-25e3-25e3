# Trabalho Final - TypeScript

Este projeto é uma API para gerenciamento de filmes, desenvolvida em TypeScript, utilizando princípios de arquitetura limpa e boas práticas de desenvolvimento. O objetivo é fornecer endpoints para cadastro, consulta, atualização e remoção de filmes, além de autenticação básica.

## Sumário
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Como Executar](#como-executar)
- [Testes](#testes)
- [Endpoints da API](#endpoints-da-api)
- [Autenticação](#autenticação)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Autores](#autores)

# Trabalho Final - TypeScript

API de gerenciamento de filmes desenvolvida em TypeScript. Implementa arquitetura com camadas (entidades, domínio, infra, webApi), injeção de dependência via Inversify, autenticação básica e duas opções de persistência (arquivo JSON fake e MongoDB via Mongoose).

## O que foi implementado (Resumo das novidades)
- Router modular com base em `/api` e controller `MovieController` para rotas de filmes.
- Serviço `MovieService` que encapsula lógica de negócio e validações.
- Repositórios:
  - `MovieRepository` — repositório baseado em arquivo JSON (fakeBD.json).
  - `MovieRepositoryMongoose` — repositório assíncrono usando Mongoose/Models.
- Configuração de DI com `Inversify` em `src/4webApi/config/InversifyConfig.ts`.
- Middleware de autenticação básica (`basicAuth`) com credenciais fixas (ver seção Autenticação).
- Conexão com MongoDB configurável por variáveis de ambiente (`MONGO_DB_KEY`, `DATABASE`, `DB_OPTIONS`).
- Tratamento centralizado de erros (`CustomError`) e middleware de logging.

## Sumário
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Variáveis de Ambiente (MongoDB)](#variáveis-de-ambiente-mongodb)
- [Como executar](#como-executar)
- [Scripts úteis](#scripts-úteis)
- [Endpoints da API](#endpoints-da-api)
- [Formatos (DTOs)](#formatos-dtos)
- [Autenticação](#autenticação)
- [Testes](#testes)
- [Como alternar entre repositórios (fake / mongoose)](#como-alternar-entre-repositórios-fake--mongoose)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Autor](#autor)

## Funcionalidades
- Cadastro de filmes
- Listagem de filmes
- Busca por ID
- Atualização parcial (PATCH) e completa (PUT/PATCH endpoint implementado como PATCH)
- Remoção de filmes
- Autenticação básica para proteção dos endpoints
- Validação de entradas com `express-validator`
- Tratamento de erros com exceções customizadas

## Estrutura do Projeto (resumida)
```
jest.config.ts
package.json
tsconfig.json
src/
  main.ts                      # bootstrap da aplicação
  1entidades/
    Movie.ts                   # entidade Movie e DTOs
  2domain/
    exceptions/CustomError.ts
    interfaces/                # interfaces de repositório/serviço
    services/MovieService.ts
  3infra/
    dbConfig/mongooseConfig.ts # conexão com MongoDB
    middlewares/basicAuth.ts    # middleware de Basic Auth
    repositorios/
      DBModels.ts
      DBSchema.ts
      Logger.ts
      MovieRepository.ts        # repositório fake (arquivo JSON)
      MovieRepositoryMongoose.ts# repositório Mongoose
      MovieSchema.ts
      fakeBD-movies.json / fakeBD.json
  4webApi/
    config/InversifyConfig.ts   # binding de dependências
    controllers/MovieController.ts
    routes.ts                   # rotas montadas em /api
  __tests__/MoviesRepository.test.ts
```

## Instalação
1. Clone o repositório:
```powershell
git clone <url-do-repositorio>
cd trabalho-final-typescript
```
2. Instale dependências:
```powershell
npm install
```

## Variáveis de Ambiente (MongoDB)
Se for usar o repositório Mongoose, configure as variáveis de ambiente (ex.: `.env`):

- MONGO_DB_KEY: parte inicial da connection string (por exemplo `mongodb+srv://user:pass@cluster0/`)
- DATABASE: nome do banco/rota (por exemplo `myDatabase`)
- DB_OPTIONS: opções de query string (por exemplo `retryWrites=true&w=majority`)

O `MongooseConfig` monta a string assim:
```
${MONGO_DB_KEY}${DATABASE}?${DB_OPTIONS}
```

Se essas variáveis não estiverem configuradas, a aplicação tentará conectar ao Mongo e, em caso de falha, encerrará o processo.

> Observação: o projeto também contém um repositório fake baseado em arquivo (`src/3infra/repositorios/MovieRepository.ts`) que não depende do Mongo.

## Como executar
Desenvolvimento (hot reload com ts-node-dev):
```powershell
npm run dev
```

Executar diretamente com ts-node:
```powershell
npm start
```

Gerar build TypeScript (emitir JS):
```powershell
npm run build
```

Por padrão o servidor inicializa em http://localhost:3000 e as rotas de API ficam sob o prefixo `/api` (ex.: `http://localhost:3000/api/movies`).

## Scripts úteis
- npm run dev — desenvolvimento com `ts-node-dev`
- npm start — iniciar com `ts-node`
- npm run build — compilar TypeScript
- npm test — executar testes (Jest)

## Endpoints da API
Base: /api/movies

- GET /api/movies
  - Retorna lista de filmes (formato reduzido ViewMovieDTO)

- GET /api/movies/:id
  - Retorna filme completo por id

- POST /api/movies
  - Cria um novo filme
  - Body esperado (JSON):
    {
      "title": "string",
      "year": 2024,
      "runtime": 120,
      "watched": false,        // opcional
      "rating": 8.5            // opcional
    }

- PATCH /api/movies/:id
  - Atualiza parcialmente um filme (aceita quaisquer campos parciais do Movie)

- DELETE /api/movies/:id
  - Remove o filme

Respostas de sucesso usam códigos HTTP apropriados: 200 (OK), 201 (Created), 204 (No Content) para exclusão.

## Formatos (DTOs)
- Movie (entidade): { id, title, year, runtime, watched?, rating? }
- CriarMovieDTO: Omit<Movie, 'id'>
- ViewMovieDTO: { id, title, year }

## Autenticação
Todos os endpoints esperam autenticação Basic Auth usando o middleware `basicAuth`.

Credenciais atualmente configuradas (hardcoded no middleware):
- Usuário: `admin`
- Senha: `senhaSuperSecreta`

Exemplo de header (curl):
```bash
curl -H "Authorization: Basic $(echo -n 'admin:senhaSuperSecreta' | base64)" \
  http://localhost:3000/api/movies
```

No código, caso não exista header ou esteja inválido, é lançada uma `CustomError` com status 401.

## Testes
Execute os testes com:
```powershell
npm test
```
Os testes de exemplo estão em `src/__tests__/MoviesRepository.test.ts` e utilizam Jest. Atualmente há mocks básicos e exemplos de cenários para o serviço.

## Como alternar entre repositórios (fake file / Mongoose)
- Por padrão, a configuração de Inversify (`src/4webApi/config/InversifyConfig.ts`) está vinculando `MovieService` e `MovieRepositoryMongoose` — ou seja, o projeto espera Mongoose/DBModels em execução. Para usar o repositório file-based (fake) você pode:
  1. Ajustar os bindings em `InversifyConfig.ts` para expor `MovieRepository` em vez de `MovieRepositoryMongoose`.
  2. Ou criar um binding adicional e alterar o `@inject` usado no serviço (ou usar uma fábrica) para alternar a implementação.

Essa alteração é intencionalmente simples e útil para desenvolvimento offline ou para testes sem Mongo.

## Tecnologias utilizadas
- TypeScript
- Node.js
- Express
- Inversify (DI)
- Mongoose (opcional)
- Jest (testes)
- express-validator

## Autor
- [Lenon Fernandes](https://github.com/lenonisfernandes)

---
Contribuições e melhorias são bem-vindas. Se quiser, posso abrir um PR propondo a opção de selecionar o repositório por variável de ambiente (por exemplo: REPO_IMPL=fake|mongoose) — me diga se aceita que eu implemente isso.
