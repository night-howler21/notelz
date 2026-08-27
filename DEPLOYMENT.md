# Hosted setup reference

This file documents future configuration only. The conversion does **not** provision Supabase, apply remote migrations, or deploy the Next.js site.

## Supabase project

When a hosted environment is eventually wanted:

1. Create a Supabase project manually.
2. Keep email/password sign-in enabled.
3. Disable email confirmation only if the current immediate-signup preview behavior is still required.
4. Add the eventual application URL and `/auth/confirm` callback to Auth redirect URLs.
5. Link the CLI only from an authorized local environment.
6. Review pending SQL with `npx supabase db push --dry-run` before applying it.
7. Set the Next.js environment variables documented in `.env.example`.

For production, replace visible recovery links with `resetPasswordForEmail`, configure custom SMTP, enable CAPTCHA/appropriate Auth rate limits, and review every RLS policy before launch.

## Next.js host

The application needs a normal Next.js server runtime; static export is not supported because it uses Server Actions, Route Handlers, cookie refresh, and authenticated server rendering.

Required application variables:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SECRET_KEY
```

`LEGACY_DATABASE_URL` and `SUPABASE_DB_URL` are migration-only and must not be configured on the deployed web application.

No deployment command should be run unless explicitly requested.
