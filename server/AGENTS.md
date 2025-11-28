# Mindshare Server - AGENTS.md

## Project Overview

Mindshare Server is a GraphQL API built with TypeScript, Express, and TypeGraphQL. It handles authentication and user management using Prisma with SQLite.

## Tech Stack

- **Language**: TypeScript
- **Framework**: Express
- **GraphQL**: TypeGraphQL, Apollo Server
- **Database**: SQLite
- **ORM**: Prisma
- **Authentication**: JWT, bcryptjs

## Development Workflow

- **Start Dev Server**: `npm run dev` (uses `tsx watch`)
- **Prisma Studio**: `npx prisma studio`
- **Database Migrations**:
  - Create migration: `npx prisma migrate dev --name <migration_name>`
  - Apply migrations: `npx prisma migrate deploy`
  - Reset database: `npx prisma migrate reset`
- **Generate Prisma Client**: `npx prisma generate`

## Project Structure

- `src/index.ts`: Entry point, server setup.
- `src/resolvers/`: GraphQL resolvers (Controllers).
- `src/services/`: Business logic layer.
- `src/models/`: GraphQL object types.
- `src/dtos/`: Data Transfer Objects (Input/Output types).
  - `src/dtos/input/`: Input arguments for mutations/queries.
  - `src/dtos/output/`: Return types for mutations/queries.
- `src/middlewares/`: Express and GraphQL middlewares.
- `src/utils/`: Utility functions (hash, jwt, etc.).
- `src/graphql/context/`: Context setup for GraphQL requests.
- `prisma/`: Database schema and migrations.

## Conventions

- **Dependency Injection**: Use manual dependency injection in Resolvers (instantiate Services).
- **TypeGraphQL**: Use decorators (`@Resolver`, `@Query`, `@Mutation`, `@Field`, `@ObjectType`, `@InputType`) to define the schema.
- **Prisma**: Use `prismaClient` singleton from `prisma/prisma.ts` (or similar).
- **Async/Await**: Use async/await for all asynchronous operations.
- **Naming**:
  - Files: `kebab-case.ts` (e.g., `auth.service.ts`, `user.resolver.ts`)
  - Classes: `PascalCase` (e.g., `AuthService`, `UserResolver`)
