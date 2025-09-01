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

## Funcionalidades
- Cadastro de filmes
- Listagem de todos os filmes
- Busca de filmes por critérios
- Atualização de informações de filmes
- Remoção de filmes
- Autenticação básica para acesso aos endpoints
- Validação e tratamento de erros customizados

## Estrutura do Projeto
```
jest.config.ts
package.json
tsconfig.json
src/
  basicAuth.ts
  main.ts
  Movie.ts
  __tests__/
    MoviesRepository.test.ts
  api/
    MovieController.ts
    routes.ts
    exceptions/
      CustomError.ts
  domain/
    services/
      MovieService.ts
  Infra/
    BDSchema.ts
    fakeBD.json
    Logger.ts
    MovieRepository.ts
    MovieSchema.ts
```

- **src/**: Código-fonte principal
  - **api/**: Controllers, rotas e exceções
  - **domain/**: Lógica de negócio e serviços
  - **Infra/**: Infraestrutura, banco de dados fake, logger, schemas
  - **__tests__/**: Testes automatizados

## Instalação
1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd trabalho-final-typescript
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## Como Executar
1. Compile o projeto (se necessário):
   ```bash
   npm run build
   ```
2. Inicie a aplicação:
   ```bash
   npm start
   ```
   Por padrão, a API estará disponível em `http://localhost:3000`.

## Testes
Para rodar os testes automatizados:
```bash
npm test
```
Os testes estão localizados em `src/__tests__/` e utilizam o Jest.

## Endpoints da API
- `GET /movies` - Lista todos os filmes
- `GET /movies/:id` - Busca filme por ID
- `POST /movies` - Cadastra um novo filme
- `PUT /movies/:id` - Atualiza um filme existente
- `DELETE /movies/:id` - Remove um filme

> **Nota:** Todos os endpoints requerem autenticação básica.

## Autenticação
A autenticação é feita via Basic Auth. Envie o header `Authorization` com usuário e senha válidos.

Exemplo de header:
```
Authorization: Basic <base64(usuario:senha)>
```

## Tecnologias Utilizadas
- TypeScript
- Node.js
- Express.js
- Jest (testes)

## Autores
- [Lenon Fernandes](https://github.com/lenonisfernandes)

---
Sinta-se à vontade para contribuir ou sugerir melhorias!
