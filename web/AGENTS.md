# Mindshare Web - AGENTS.md

## Project Overview

Mindshare Web is a React-based frontend application built with TypeScript, Vite, and Apollo Client. It provides a user interface for idea sharing and collaboration, connecting to the Mindshare GraphQL API.

## Tech Stack

- **Language**: TypeScript
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v7
- **GraphQL Client**: Apollo Client
- **State Management**: Zustand
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI, shadcn/ui, Lucide Icons
- **Notifications**: Sonner (toast)
- **Theme**: next-themes (dark mode support)

## Development Workflow

- **Start Dev Server**: `npm run dev` (runs on Vite dev server)
- **Build**: `npm run build` (TypeScript compile + Vite build)
- **Preview**: `npm run preview` (preview production build)
- **Lint**: `npm run lint` (ESLint)

## Project Structure

- `src/main.tsx`: Entry point, React app initialization.
- `src/app.tsx`: App component with routing setup.
- `src/pages/`: Page components (route views).
  - `auth/login.tsx`: Login page.
  - `auth/sign-up.tsx`: Sign up page.
  - `ideas/ideas.tsx`: Ideas listing page.
  - `members/Members.tsx`: Members management page.
- `src/components/`: Reusable components.
  - `idea/`: Idea-related components (cards, dialogs, drawers, comments).
  - `members/`: Member management components.
  - `ui/`: shadcn/ui components (buttons, dialogs, inputs, etc.).
  - `header.tsx`: App header/navigation.
  - `layout.tsx`: Layout wrapper component.
  - `page.tsx`: Page wrapper component.
  - `visibility-guard.tsx`: Role-based visibility control.
- `src/lib/`: Utility libraries.
  - `graphql/apollo.ts`: Apollo Client setup.
  - `utils.ts`: Utility functions (e.g., `cn` for class merging).
- `src/stores/`: Zustand stores.
  - `auth.ts`: Authentication state management.
- `src/types/`: TypeScript type definitions.
  - `index.ts`: Shared types (`User`, `Idea`, `Comment`, `Vote`, `Role`).
- `src/index.css`: Global styles and Tailwind configuration.
- `public/`: Static assets.

## Conventions

- **Component Structure**: Use functional components with hooks.
- **Styling**: Use Tailwind CSS utility classes; custom variants defined in `index.css`.
- **GraphQL**: Use Apollo Client hooks (`useQuery`, `useMutation`) for data fetching.
- **State Management**: Use Zustand for global state (auth, etc.).
- **Routing**: Use React Router hooks (`useNavigate`, `useLocation`) for navigation.
- **Naming**:
  - Files: `kebab-case.tsx` for components (e.g., `idea-card.tsx`, `login.tsx`)
  - Components: `PascalCase` (e.g., `IdeaCard`, `Login`)
  - Utilities: `camelCase` (e.g., `cn`, `apolloClient`)

## Recent Changes

- **TypeScript Fix**: Resolved type error in `visibility-guard.tsx` by adding null-check for optional `user.role`.
- **Idea Management**: Implemented idea card deletion with confirmation dialog.
- **Responsive Layout**: Fixed layout issues on Ideas page for screen sizes 1024px-1400px.
- **UI Components**:
  - Created `IdeaCard`, `IdeaDetailDrawer` components.
  - Implemented `CreateIdeaDialog`, `DeleteIdeaDialog`.
  - Added comment area and comments list.
  - Member management dialogs (invite, edit, delete).
- **Features**:
  - Authentication (login/sign-up).
  - Idea CRUD operations.
  - Commenting system.
  - Voting functionality.
  - Role-based visibility control.
  - Member management.
