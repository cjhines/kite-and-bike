# Setup Guide

## 1. Get a Bot Token (only when rotating)

The current token works and lives only in the `TELEGRAM_BOT_TOKEN` Cloudflare secret; there is no other
copy. You only need a new one if it leaks or the secrets have to be re-set:

1. Open Telegram and message **@BotFather**
2. Send `/mybots`
3. Select **Kite & Bike** (@kite_and_bike_bot)
4. Tap **API Token** → **Revoke current token**
5. BotFather replies with a new token — keep it in a password manager, never in this repo (it's public)

To verify it works, use a terminal rather than the browser address bar (which keeps the token in
history and syncs it):
```bash
curl -s https://api.telegram.org/bot<NEW_TOKEN>/getMe
```
Should return `"username":"kite_and_bike_bot"`.

## 2. Deploy the Cloudflare Worker

```bash
# Install the CLI
npm install -g wrangler

# Log in (opens browser)
wrangler login

# From the worker/ directory:
cd worker

# Set secrets
npx wrangler secret put TELEGRAM_BOT_TOKEN
# Paste the new token from step 1

npx wrangler secret put TELEGRAM_CHAT_ID
# Paste Rashid's chat ID (not stored in this public repo; see TROUBLESHOOTING.md to look it up)

# Deploy
npx wrangler deploy
```

Note the URL it gives you (e.g. `https://kite-and-bike-bookings.<you>.workers.dev`).

## 3. The Form

Already wired up: `src/app/[locale]/components/BookingModal.tsx` POSTs to `WORKER_URL`. Changes only go
live once they're on `main` — GitHub Pages deploys nothing else.

## 4. CORS

Done: `ALLOWED_ORIGINS` in `worker/worker.js` allows `kiteandbike.site`, `www.kiteandbike.site` and
`localhost:3000`. This only stops other websites' pages from calling the worker; it does not stop
scripts (see "Known gap" in CLAUDE.md). If the domain changes, update the list and `npx wrangler deploy`.

## 5. Test End-to-End

Submit a test booking on the site. Rashid should receive a formatted Telegram message within seconds.

## Useful Telegram API Endpoints

All use `https://api.telegram.org/bot<TOKEN>/...`

| Endpoint | Purpose |
|----------|---------|
| `/getMe` | Verify token is valid and matches the right bot |
| `/getUpdates` | See recent messages sent to the bot |
| `/getWebhookInfo` | Check if a webhook is set (interferes with getUpdates) |
| `/deleteWebhook` | Remove a webhook if one was set accidentally |
| `/sendMessage` | Send a message (what the worker uses) |
