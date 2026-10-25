const WORKER_URL = 'https://kite-and-bike-bookings.chrishinesabdn.workers.dev';

type WorkerPayload =
  | { type: 'booking'; name: string; email: string; phone: string; date: string; guests: string; tour: string; message: string }
  | { type: 'contact'; name: string; email: string; phone: string; subject: string; message: string };

// Forwards a form submission to Rashid's Telegram via the Cloudflare Worker (worker/worker.js).
export async function sendToWorker(payload: WorkerPayload) {
  const res = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
}
