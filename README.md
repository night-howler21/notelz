# Notelz

No one tells you what to study at the last minute, so we will.

## Structure

- `frontend/` — Next.js 16 (TypeScript, Tailwind v4) web app
- `backend/` — Spring Boot 4 (Java 21, Maven) REST API
- `prototype/` — original static HTML/CSS mockup of the homepage (superseded by `frontend/`, kept for reference)

## Prerequisites

- Node.js (installed at `C:\Program Files\nodejs`)
- Java 21 JDK — Eclipse Temurin (installed at `C:\Program Files\Eclipse Adoptium\jdk-21.0.12.101-hotspot`)
- PostgreSQL 17 (installed at `C:\Program Files\PostgreSQL\17`, running as a Windows service on port 5432)

`JAVA_HOME` and the Node/JDK `bin` folders were added to your **User** PATH. New terminal windows will pick this up automatically; this session's shells needed the paths set explicitly per command.

## Database

A local role/database were created for development:

- Database: `notelz`
- Role: `notelz` / password `notelz`
- Postgres superuser: `postgres` / password `postgres` (dev machine only — change before ever exposing this instance)

To open a psql shell:

```bash
"C:/Program Files/PostgreSQL/17/bin/psql.exe" -U notelz -h localhost -d notelz
```

## Running the backend

```bash
cd backend
./mvnw.cmd spring-boot:run
```

Starts on `http://localhost:8080` by default (override with the `PORT` env var — local dev here runs it on `8081` since Windows reserves `8080` on this machine; see `backend/dev.cmd`). Config lives in `src/main/resources/application.properties`, all overridable via env vars (`PORT`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `JWT_SECRET`, `JWT_EXPIRATION_MS`, `CORS_ALLOWED_ORIGINS`). `spring.jpa.hibernate.ddl-auto=update` auto-creates/updates tables from the JPA entities — fine for dev, swap for migrations (Flyway/Liquibase) before production.

## Running the frontend

```bash
cd frontend
npm run dev
```

Starts on `http://localhost:3000`. `NEXT_PUBLIC_API_URL` in `frontend/.env.local` points it at the backend.

## What's built so far

- Homepage (`/`) — the notebook cover page: brand, nav tabs, vision statement, motto
- `/signup`, `/login` — real auth forms wired to the backend, issue a JWT on success
- `/dashboard` — placeholder landing page after login (session stored in `localStorage`)
- Backend `auth` module — `User` entity, JWT issuance/validation, Spring Security filter chain (stateless, BCrypt password hashing)

## Next up

Per the build order: Subject Notes tab (notebook-style reader, hover previews, doodle layer, saved PDFs) → Last-Minute Revision + Catistor gamification → Find Tutors + 1-1 Video Sessions.
