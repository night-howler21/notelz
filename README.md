# Notelz

No one tells you what to study at the last minute, so we will.

Notelz is a single Next.js 16 application backed by Supabase Auth and Supabase Postgres. It keeps the original notebook-themed design while providing signup, email-or-username login, protected subject notes, password recovery, and support-message submission.

## Stack

- Next.js 16, React 19, TypeScript, Tailwind CSS 4, and Framer Motion
- Supabase Auth with cookie-backed SSR sessions
- Supabase Postgres with Row Level Security
- SQL migrations and repeatable seed data under `supabase/`

There is no separate Java service. Next.js Server Actions, Server Components, and Route Handlers provide the server-side behavior.

## Local setup

Prerequisites:

- Node.js 20 or newer
- Docker Desktop or another Docker-compatible runtime for the local Supabase stack

Install dependencies:

```powershell
npm install
```

Start Supabase and recreate its local database from the committed migration and seed:

```powershell
npm run supabase:start
npm run supabase:reset
```

Copy `.env.example` to `.env.local`, then copy the local API URL, publishable key, and secret key shown by `npx supabase status` into that file. Never expose `SUPABASE_SECRET_KEY` to browser code or commit `.env.local`.

Start Next.js:

```powershell
npm run dev
```

Open `http://localhost:3000`.

Local Auth is configured for immediate signup without email confirmation. The forgot-password screen intentionally displays a recovery link directly; this preserves the existing preview behavior and must be replaced with real email delivery before production use.

## Commands

```text
npm run dev               Start Next.js locally
npm run build             Create a production build
npm run lint              Run ESLint
npm test                  Run unit tests
npm run test:db           Run Supabase database/RLS tests
npm run supabase:start    Start the local Supabase stack
npm run supabase:stop     Stop the local Supabase stack
npm run supabase:reset    Reapply migrations and seed locally
npm run supabase:types    Regenerate database TypeScript types
npm run migrate:legacy    Inspect a legacy database; dry-run by default
```

## Legacy Spring/PostgreSQL migration

The migration utility preserves users, bcrypt password hashes, roles, subjects, nested topics, related topics, and contact messages. It supports Hibernate `@Lob` columns stored as either Postgres text or large-object OIDs.

Set these variables in `.env.local` or the invoking shell:

```text
LEGACY_DATABASE_URL=postgresql://...
SUPABASE_DB_URL=postgresql://...
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SECRET_KEY=sb_secret_...
```

Preview and reconcile counts without writing:

```powershell
npm run migrate:legacy
```

Apply explicitly:

```powershell
npm run migrate:legacy -- --apply
```

The importer is rerunnable. Legacy JWT sessions and outstanding reset tokens are deliberately not copied, so migrated users must log in again with their existing passwords.

`scripts/fixtures/legacy.sql` provides a disposable integration fixture covering all roles, bcrypt credentials, nested/related topics, and both supported LOB representations. It drops and recreates legacy tables, so never run it against real data.

## Data access

- Authenticated users can read seeded subjects and notes.
- Users can read only their own profile.
- Anonymous and authenticated visitors can insert support messages.
- Support messages cannot be read through the public Supabase API.
- Note/profile writes require trusted administrative access outside the current UI.

No deployment is performed by this repository setup.
