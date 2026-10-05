# NiftyNepal – Next.js 16 + React 19 + TypeScript + PostgreSQL classifieds

100% TypeScript (`strict`): app code, API routes, config (`next.config.ts`), seed script (`scripts/seed.ts`, run with `tsx`).
Styling is Tailwind CSS v4 (configured in `app/globals.css`; the only non-TS file is `postcss.config.mjs`, which PostCSS requires).
Type-check anytime with `npm run typecheck`.

## Run locally
    cp .env.example .env.local      # then set AUTH_SECRET
    docker compose up -d            # PostgreSQL 16 (or point DATABASE_URL at your own server)
    npm install
    npm run dev                     # http://localhost:3000

Requires Node 20.9+. `predev`/`prestart` create the tables (`db/schema.sql`) and seed sample data only if the database is empty.
Reseed from scratch (wipes all data): `npm run seed`.

## Configure `.env.local`
- **Cloudinary** (photo uploads): create a free account, copy *Cloud name*, *API Key*, *API Secret* from the dashboard into
  `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`. Browsers upload straight to Cloudinary using a short-lived
  signature from `/api/upload/sign`, so the secret never reaches the client.
- **SMTP** (email OTP): set `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` (Gmail app password, Brevo, Mailgun, SES, etc.).
  Emails are built with **React Email** (`emails/*.tsx`, shared `Layout.tsx`, English + Nepali) and delivered with **Nodemailer** (`lib/mail.tsx`). Preview templates with `npm run email` (http://localhost:3001). To add an email, create a template in `emails/` and a `sendXxxMail` function in `lib/mail.tsx`.
  If `SMTP_HOST` is empty in development, the code is printed in the terminal instead. In production, SMTP is required.

If you already ran an older version, run `npm run seed` once to add subcategories and the OTP table (this wipes data).

## Included
Bilingual (en/ne) routing, 16 categories, featured + paginated latest ads, search and filters (district, condition, price, done in SQL),
ad detail with schema.org JSON-LD, sign up with email OTP verification (6-digit code, 10 min expiry, 5 attempts, 60 s resend cooldown), sign in (bcrypt + JWT cookie), post free ad with up to 8 uploaded photos (Cloudinary) and category-dependent subcategories, Nepali-format prices,
sitemap.xml, robots.txt, canonical + hreflang metadata, Open Graph.

## Database
PostgreSQL via `pg`. Schema: `db/schema.sql` (users, shops, verifications, categories, subcategories, location, ads, ad_images,
ad_attributes, promotions, conversations, messages, favorites, reports, tickets, blog_posts). Queries: `lib/store.js`.
Seed: 16 categories, 10 districts, 4 users, 1 shop, 48 ads, 1 blog post.
Demo login `demo@niftynepal.com` / `Password123` (admin `admin@niftynepal.com`). Delete or change these before going public.

## Deploy
Any Node host works (Vercel, Railway, Fly, VPS) with a hosted Postgres. Set `DATABASE_URL`, `DATABASE_SSL`, `SITE_URL` and a long random
`AUTH_SECRET`. On Vercel run `npm run seed:if-empty` once from your machine against the production `DATABASE_URL`.
Not yet built: messaging/live chat UI, verification and shops UI, promotions/payments, reports, support tickets, admin panel,
photo deletion/cleanup on Cloudinary, price-guide pages and blog pages (their tables already exist).
