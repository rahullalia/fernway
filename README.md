# Fernway

Marketing site and booking flow for Fernway, a fictional day spa in Hudson, NY. Built as a demo piece; the business, people, and phone number are made up.

Live: https://fernway-pied.vercel.app

## Stack

- Next.js 16 (App Router, every route static)
- Tailwind CSS v4, shadcn/ui primitives restyled to the house palette
- Fraunces, Hanken Grotesk, and Courier Prime via `next/font`
- Photos from Pexels (free license)

The design runs dark: a warm near-black ground with candlelight amber, big lowercase italic display type, and a typewriter mono for prices, times, and captions (the building used to be a stationer's). The nav carries a live "open until" status line computed from the hours table, and the mobile menu is a bottom sheet.

The booking widget is front-end only. Availability is seeded from the date so it looks and feels real, but nothing is stored and no email is sent. When a real spa takes this live, swap the submit handler for a scheduler API (Square, Boulevard, Cal.com) and keep the same UI.

## Run it

```bash
npm install
npm run dev
```

## Deploy

Two ways, both a couple of minutes:

1. **Vercel dashboard**: New Project → import this repo → framework preset "Next.js" → Deploy. No env vars needed.
2. **CLI**: `npx vercel` from the repo root, accept the defaults, then `npx vercel --prod`.

The site ships with `noindex` (in `app/layout.tsx`) and a disallow-all `app/robots.ts`, since a fictional business should not rank in a real town. Remove both when a real client takes it over.
