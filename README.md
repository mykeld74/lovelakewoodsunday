# Love Lakewood Sunday

Website for Love Lakewood Sunday — one unified service hosted by churches across
Lakewood, Colorado.

**Sunday, September 20, 2026 · 10:00 a.m. · Bear Creek High School Gymnasium**

> **Read [HANDOFF.md](./HANDOFF.md) first.** It covers what content is still
> outstanding, where form submissions go, and how to deploy.

## Running it

```bash
pnpm install
pnpm run dev
```

Requires **pnpm 11** — if your local pnpm is older, prefix commands with
`npx pnpm@11`. Copy `.env.example` to `.env` and fill in `DATABASE_URL`.

| Command              | What it does                                   |
| -------------------- | ---------------------------------------------- |
| `pnpm run dev`       | Development server                             |
| `pnpm run build`     | Production build (Netlify adapter)             |
| `pnpm run check`     | Type-check                                     |
| `pnpm run lint`      | Prettier + ESLint                              |
| `pnpm run db:push`   | Apply schema changes to the database           |
| `pnpm run db:studio` | Browse volunteer sign-ups and contact messages |

## Where things live

```
src/
  lib/
    config/site.ts        Event details, venue, media slots, invitation copy
    data/
      churches.ts         Participating churches
      faq.ts              FAQ questions and answers
      volunteer.ts        Volunteer roles + what happens during the service
    components/           Page sections and shared UI
    server/
      db/schema.ts        volunteer_signup, contact_message
      forms.ts            Validation and spam checks
      notify.ts           Optional email notification
  routes/                 Pages and endpoints (see HANDOFF.md)
  app.css                 Design tokens and base styles
```

Almost all copy changes happen in `src/lib/config/site.ts` and `src/lib/data/`.

## Stack

SvelteKit 2 (Svelte 5 runes) · TypeScript · Drizzle ORM + Neon Postgres ·
Netlify adapter. No CSS framework — tokens and component-scoped styles.
