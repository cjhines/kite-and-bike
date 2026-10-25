# Kite & Bike — Booking Notification System

## Project Overview

Pro-bono website for a small tour business called **Kite & Bike**, run by Rashid. He has very little budget, so everything must use free-tier services. The site is a **Next.js** static site hosted on **GitHub Pages**. The domain was purchased for him separately.

## Architecture

Since GitHub Pages is static-only (no API routes), bookings flow through a **Cloudflare Worker** as a free serverless middleman:

```
Booking Form (GitHub Pages) → Cloudflare Worker → Telegram Bot API → Rashid's phone
```

No database. No paid services. Rashid gets instant push notifications in Telegram for every booking request.

## Telegram Bot

- **Bot name:** Kite & Bike
- **Bot username:** @kite_and_bike_bot
- **Bot ID:** 8731148957
- **Rashid's chat ID:** deliberately not written here (this repo is public). It lives in the `TELEGRAM_CHAT_ID` Cloudflare secret; to look it up again see TROUBLESHOOTING.md.
- **Created via:** BotFather (official Telegram bot management)
- **Token status:** Working (verified 2026-10-25 with a test booking). No local copy exists; the only copy is the Cloudflare secret. If it's ever needed elsewhere or leaks, rotate via BotFather `/mybots` → select bot → API Token → Revoke, then `npx wrangler secret put TELEGRAM_BOT_TOKEN`.

## Cloudflare Worker

- **Free tier:** 100k requests/day, more than enough
- **Secrets** (set via `npx wrangler secret put <NAME>`):
  - `TELEGRAM_BOT_TOKEN` — the bot API token (see token status above)
  - `TELEGRAM_CHAT_ID` — Rashid's chat ID (see above)
- **Config file:** `wrangler.toml`
- **Worker name:** `kite-and-bike-bookings`

### Deployment

```bash
npm install -g wrangler
wrangler login
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
npx wrangler deploy
```

The deploy gives a URL like `https://kite-and-bike-bookings.<subdomain>.workers.dev` — this goes in the `WORKER_URL` constant in the form component.

## Forms

Both forms POST through `sendToWorker()` (`src/app/[locale]/_utils/sendToWorker.ts`, which holds
`WORKER_URL`) with a `type`, and the worker starts each Telegram message with its label so Rashid can
tell them apart from the notification alone:

- **`BOOKING REQUEST`** — `src/app/[locale]/components/BookingModal.tsx`, the modal opened from the
  home, tours and activities pages. Sends name, email, phone, date, guests, tour and notes. Requests
  with no `type` are also treated as bookings.
- **`CONTACT MESSAGE`** — the form on `src/app/[locale]/contact/page.tsx`. Sends name, email, phone,
  subject (the label the visitor picked, in their language) and message.

On failure both tell the visitor to use WhatsApp instead (`error.message` keys in `src/messages/*.json`).

## Status

Live since 2026-10-25. The worker had been deployed in July, but the form wiring sat unmerged on
`booking-worker`, so the live form was a stub that showed "success" and sent nothing. GitHub Pages
**only deploys `main`**, so form changes aren't live until they're merged there. The contact page form
was also a stub until it was wired up later the same day.

- Worker deployed; CORS restricted to `kiteandbike.site` / `www.` / `localhost:3000` (`ALLOWED_ORIGINS`)
- End-to-end checked by POSTing a labelled test booking to the worker with the site's Origin → `200`

## Key Files

- `worker/worker.js` — Cloudflare Worker that receives form POSTs and forwards to Telegram
- `worker/wrangler.toml` — Cloudflare Worker config (deploy from `worker/`)
- `src/app/[locale]/components/BookingModal.tsx` — the booking form
- `src/app/[locale]/contact/page.tsx` — the contact form
- `src/app/[locale]/_utils/sendToWorker.ts` — `WORKER_URL` and the POST both forms use

## Decisions & Constraints

- **Why Telegram?** Free, instant push notifications, Rashid lives on his phone, no monthly fees
- **Why Cloudflare Workers?** GitHub Pages is static-only, need a serverless function for the bot token. Cloudflare free tier is generous and doesn't require a credit card.
- **Why not Vercel API routes?** Site is on GitHub Pages, not Vercel
- **Why not embedded Google Forms / Formspree?** Telegram gives better UX for Rashid (instant notifications vs checking email), and Google Forms looks rough embedded
- **Security:** Bot token never touches the frontend repo. It's stored as an encrypted Cloudflare secret. The GitHub repo is public, so nothing secret or personal (tokens, Rashid's chat ID) goes in it.
- **Known gap:** the worker URL is public (it's in the site's JS) and CORS only restricts *browsers*, so anyone can `curl` fake bookings straight into Rashid's Telegram. If spam starts, add Cloudflare Turnstile (free) to the form and verify it in the worker.
