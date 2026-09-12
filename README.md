# College Discovery Platform

A production-oriented full-stack college discovery app implementing the requested features with a real PostgreSQL database and REST APIs.

## Stack
- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4
- Prisma 7 + PostgreSQL (Neon)
- JWT session cookie auth using `jose` + password hashing with `bcryptjs`
- SWR for API state and client fetching
- Deploy the whole app to Vercel; use Neon only for PostgreSQL.

## Implemented
- College listing/search/filter/pagination
- College detail: overview, courses, placements, reviews
- Compare 2–3 colleges side-by-side
- Predictor: exam + rank → database-backed recommendations
- Q&A: questions, answers, browsing
- Signup/login/logout
- Save colleges and saved comparisons
- Responsive UI and reusable card/search components
- REST endpoints under `/api/*`
- Health endpoint at `/api/health`
- Seeded demo dataset (10 colleges) with a demo account

## Local setup
1. Install Node.js 22+.
2. Create a Neon PostgreSQL database and copy its connection string.
3. Copy `.env.example` to `.env.local` and set `DATABASE_URL` and a strong `AUTH_SECRET`.
4. Install packages:

   npm install

5. Create the schema:

   npm run db:push

6. Seed data:

   npm run db:seed

7. Start development:

   npm run dev

Open http://localhost:3000.

### Demo account
Email: `demo@collegediscovery.dev`
Password: `Demo@12345`

## Vercel deployment
Push this repository to GitHub, import it into Vercel, and add:
- `DATABASE_URL` = Neon connection string
- `AUTH_SECRET` = long random secret
- `NEXT_PUBLIC_APP_URL` = your Vercel URL

Vercel runs the Next.js frontend and the `/api` REST backend route handlers. Neon stores all application data.

## Important production notes
- Replace the seed data with licensed/current college data before real public use.
- Add rate limiting, email verification, password reset, audit logging and stronger abuse controls before opening authentication/Q&A to the public.
- For large datasets, consider adding PostgreSQL full-text/trigram indexes and cursor pagination.


## Updated seed data

The seed includes 22 colleges. Fees are displayed in lakh per year, and college cards use a non-blank image fallback when a remote campus image is unavailable.
