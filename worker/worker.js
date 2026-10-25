const ALLOWED_ORIGINS = [
  "https://kiteandbike.site",
  "https://www.kiteandbike.site",
  "http://localhost:3000", // local dev
];

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          ...corsHeaders(origin),
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const body = await request.json();

      // Bookings come from BookingModal, contact messages from the contact page.
      // Requests without a type are bookings, for pages cached from before the field existed.
      const text = body.type === "contact" ? contactMessage(body) : bookingMessage(body);

      if (!text) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
          status: 400,
          headers: corsHeaders(origin),
        });
      }

      // Send to Telegram
      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text,
            parse_mode: "MarkdownV2",
          }),
        }
      );

      if (!telegramResponse.ok) {
        const err = await telegramResponse.text();
        console.error("Telegram API error:", err);
        return new Response(JSON.stringify({ error: "Failed to send notification" }), {
          status: 500,
          headers: corsHeaders(origin),
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: corsHeaders(origin),
      });
    } catch (err) {
      console.error("Worker error:", err);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: corsHeaders(origin),
      });
    }
  },
};

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": allowed,
    "Vary": "Origin",
  };
}

// Each message starts with its label, so Rashid can tell them apart from the notification alone.
// Returns null when required fields are missing.
function bookingMessage({ name, email, phone, date, guests, tour, message }) {
  if (!name || !email || !date || !tour) return null;

  return [
    `*BOOKING REQUEST*`,
    ``,
    `👤 *Name:* ${escapeMarkdown(name)}`,
    `📧 *Email:* ${escapeMarkdown(email)}`,
    phone ? `📱 *Phone:* ${escapeMarkdown(phone)}` : null,
    `📅 *Date:* ${escapeMarkdown(date)}`,
    `👥 *Guests:* ${escapeMarkdown(guests || 1)}`,
    `🏄 *Tour:* ${escapeMarkdown(tour)}`,
    message ? `\n💬 *Message:*\n${escapeMarkdown(message)}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function contactMessage({ name, email, phone, subject, message }) {
  if (!name || !email || !message) return null;

  return [
    `*CONTACT MESSAGE*`,
    ``,
    `👤 *Name:* ${escapeMarkdown(name)}`,
    `📧 *Email:* ${escapeMarkdown(email)}`,
    phone ? `📱 *Phone:* ${escapeMarkdown(phone)}` : null,
    subject ? `📌 *Subject:* ${escapeMarkdown(subject)}` : null,
    `\n💬 *Message:*\n${escapeMarkdown(message)}`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

// Escape special Markdown characters for Telegram
function escapeMarkdown(text) {
  return String(text).replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}
