# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server with Turbopack (opens on http://localhost:3000)
- `pnpm build` - Build the application for production (uses Turbo)
- `pnpm lint` - Run ESLint to check code quality

## Port Management - IMPORTANT

**ALWAYS clean ports after running servers:**
- After starting any development server or background process that uses ports, ALWAYS kill it when done
- Use `lsof -ti:3000 | xargs kill -9 2>/dev/null || true` to clean port 3000 before finishing
- Never leave servers running in the background for the user
- The user prefers to start their own dev server manually

## Database Operations

- `npx prisma generate` - Generate Prisma client after schema changes
- `npx prisma migrate dev` - Create and apply migrations in development
- `npx prisma migrate deploy` - Deploy pending migrations
- `npx prisma studio` - Open Prisma Studio for database inspection
- Schema at `apps/web/prisma/schema.prisma`

## Monorepo Structure

```
vaturismodeportivo/
├── apps/
│   └── web/               # Next.js 15 main application
├── packages/
│   └── shared/            # Shared utilities
├── turbo.json             # Turbo monorepo config
├── pnpm-workspace.yaml    # PNPM workspace (apps/*, packages/*)
└── package.json           # Root (pnpm@9.14.2)
```

## Architecture Overview

### Core Technologies

- **Next.js 15** with App Router and Turbopack
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Prisma** with PostgreSQL (Neon) for database
- **REST API Routes** for API layer

### Web App Structure (`apps/web/`)

- `/app` - Next.js App Router pages
- `/app/admin` - Backoffice section
- `/src` - Feature-based architecture (to be structured)
- `/prisma` - Database schema and migrations

### Auth

- Simple email/password authentication for backoffice (admin section only)
- Public site does not require authentication

## Styling Conventions

- Tailwind CSS v4
- Mobile-first responsive design

## Patterns

- Feature modules follow: `components/`, `services/`, `hooks/`, `types/`, `utils/`
- REST API Routes for backend logic

## Environment Variables Required

- `DATABASE_URL` - PostgreSQL connection string (Neon)
