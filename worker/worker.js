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
      const { name, email, phone, date, guests, tour, message } =
        await request.json();

      // Basic validation
      if (!name || !email || !date || !tour) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
          status: 400,
          headers: corsHeaders(origin),
        });
      }

      // Format the Telegram message
      const text = [
        `🆕 *New Booking Request*`,
        ``,
        `👤 *Name:* ${escapeMarkdown(name)}`,
        `📧 *Email:* ${escapeMarkdown(email)}`,
        phone ? `📱 *Phone:* ${escapeMarkdown(phone)}` : null,
        `📅 *Date:* ${escapeMarkdown(date)}`,
        `👥 *Guests:* ${guests || 1}`,
        `🏄 *Tour:* ${escapeMarkdown(tour)}`,
        message ? `\n💬 *Message:*\n${escapeMarkdown(message)}` : null,
      ]
        .filter(Boolean)
        .join("\n");

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

// Escape special Markdown characters for Telegram
function escapeMarkdown(text) {
  return String(text).replace(/([_*[\]()~`>#+\-=|{}.!])/g, "\\$1");
}
