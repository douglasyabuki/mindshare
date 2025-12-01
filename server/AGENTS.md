# Mindshare Server - AGENTS.md

## Status

- **Last Updated**: 2025-12-01
- **Latest Commit**: `ed55074`

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
  - `auth.resolver.ts`: Login/Register mutations.
  - `user.resolver.ts`: User queries/mutations.
  - `idea.resolver.ts`: Idea CRUD operations.
  - `comment.resolver.ts`: Comment management.
  - `vote.resolver.ts`: Voting functionality.
- `src/services/`: Business logic layer.
- `src/models/`: GraphQL object types (`User`, `Idea`, `Comment`, `Vote`).
- `src/dtos/`: Data Transfer Objects (Input/Output types).
  - `src/dtos/input/`: Input arguments (e.g., `RegisterInput`, `LoginInput`, `CreateUserInput`).
  - `src/dtos/output/`: Return types (e.g., `RegisterOutput`, `LoginOutput`).
- `src/middlewares/`: Express and GraphQL middlewares.
  - `auth.middleware.ts`: `IsAuthenticated` middleware.
- `src/utils/`: Utility functions (hash, jwt, etc.).
- `src/graphql/context/`: Context setup for GraphQL requests (`buildContext`).
- `prisma/`: Database schema and migrations.

## Conventions

- **Dependency Injection**: Use manual dependency injection in Resolvers (instantiate Services).
- **TypeGraphQL**: Use decorators (`@Resolver`, `@Query`, `@Mutation`, `@Field`, `@ObjectType`, `@InputType`) to define the schema.
- **Prisma**: Use `prismaClient` singleton from `prisma/prisma.ts`.
- **Async/Await**: Use async/await for all asynchronous operations.
- **Naming**:
  - Files: `kebab-case.ts` (e.g., `auth.service.ts`, `user.resolver.ts`)
  - Classes: `PascalCase` (e.g., `AuthService`, `UserResolver`)

## Recent Changes

- **Backend Completed**: Implemented full functionality for Ideas, Comments, and Votes.
- **Resolvers & Services**: Added `IdeaResolver`, `CommentResolver`, `VoteResolver` and corresponding services.
- **Models**: Added `Comment` and `Vote` models.
- **Fixes**: Resolved type mismatch in `VoteModel` (renamed `authorId` to `userId`).
- **Features**:
  - Idea CRUD (Create, Read, Update, Delete).
  - Commenting system.
  - Upvoting/Downvoting system.
