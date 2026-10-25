# Troubleshooting

## getUpdates returns empty `{"ok":true,"result":[]}`

This was hit during initial setup. Possible causes:

1. **A webhook is set** — webhooks and getUpdates are mutually exclusive. Check with `/getWebhookInfo`. If the `url` field is non-empty, clear it with `/deleteWebhook`, then retry.

2. **No new messages** — old messages expire from the update queue. Have someone send a fresh message to the bot, then call getUpdates immediately.

3. **Wrong token** — verify with `/getMe` that the token maps to the expected bot username.

In our case, the messages eventually came through after sending fresh ones — the original messages had likely expired.

## Bot token lost or compromised

1. Message @BotFather → `/mybots` → select bot → API Token → Revoke
2. Update the Cloudflare secret: `npx wrangler secret put TELEGRAM_BOT_TOKEN`
3. Redeploy: `npx wrangler deploy`

Nothing else changes — the chat ID, worker code, and form all stay the same.

## Finding Rashid's chat ID

It's deliberately not written in this repo (the repo is public). You only need it when re-setting the
Cloudflare secrets, which means you've just rotated the token and have a fresh one:

1. Ask Rashid to send any message to @kite_and_bike_bot
2. `curl -s https://api.telegram.org/bot<TOKEN>/getUpdates` — his ID is `message.chat.id` (if `result` is empty, see the first section)

## CORS errors in the browser console

The worker only accepts browser requests from the origins in `ALLOWED_ORIGINS` (`worker/worker.js`). A new domain must be added there exactly as the browser sends it (including `https://` and no trailing slash), then redeployed.

## Telegram message formatting breaks

The worker uses Markdown parse mode. Special characters in user input (`_`, `*`, `[`, etc.) are escaped by the `escapeMarkdown` function. If messages aren't rendering correctly, check that function covers the character causing issues.
