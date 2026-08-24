# Deploying Notelz for team preview

Two services, deployed separately:

- **Frontend** (`frontend/`) → [Vercel](https://vercel.com) — first-class Next.js support, generous free tier
- **Backend + Database** (`backend/`) → [Render](https://render.com) — genuine free tier for a Docker web service + Postgres

Both deploy straight from the GitHub repo, so pushing new commits redeploys automatically.

## 1. Backend + Postgres on Render (via Blueprint)

The repo includes `render.yaml`, which describes both the database and the web service — Render provisions and wires them together automatically.

1. Sign in to [render.com](https://render.com) (GitHub sign-in is easiest).
2. **New +** → **Blueprint** → connect the `notelz` GitHub repo. Render detects `render.yaml`.
3. Click **Apply**. It creates `notelz-db` (Postgres) and `notelz-backend` (Docker web service), and wires the DB credentials into the web service's env vars automatically. `JWT_SECRET` is auto-generated.
4. Wait for the build to finish, then copy the service URL (looks like `https://notelz-backend.onrender.com`).

Free-tier notes: the web service sleeps after 15 min idle (30-60s cold start on next request) and the free Postgres expires after 30-90 days — both fine for a team preview, not for production.

## 2. Frontend on Vercel

1. Sign in to [vercel.com](https://vercel.com) (GitHub sign-in is easiest).
2. **Add New** → **Project** → import the `notelz` repo.
3. Root Directory: `frontend` (Vercel auto-detects Next.js).
4. Add environment variable:
   | Key | Value |
   |---|---|
   | `NEXT_PUBLIC_API_URL` | the Render backend URL from step 1.5 |
5. Deploy. Copy the resulting URL (looks like `https://notelz.vercel.app`).

## 3. Close the loop: update CORS

Back on Render → the backend service → Environment → update `CORS_ALLOWED_ORIGINS` to the Vercel URL from step 2.5, then save (triggers a redeploy).

## Done

Share the Vercel URL with your team. Sign-up/login/notes all work against the live Render backend + Postgres.
