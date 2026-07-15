// Stripe webhook receiver skeleton
// Requires STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET in environment
let Stripe = null;
try { if (process.env.STRIPE_SECRET_KEY) Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); } catch (e) { console.warn('Stripe not available'); }

exports.handler = async (event) => {
  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  if (!Stripe) return { statusCode: 500, headers, body: JSON.stringify({ error: 'Stripe not configured' }) };

  try {
    // In a real webhook, verify signature: stripe.webhooks.constructEvent(rawBody, sigHeader, webhookSecret)
    // Netlify Functions don't expose raw body easily without extra setup; recommend using Netlify's native webhook proxy or a small server.
    const body = JSON.parse(event.body || '{}');
    console.log('Received Stripe webhook (demo):', body.type || 'unknown');
    return { statusCode: 200, headers, body: JSON.stringify({ received: true }) };
  } catch (err) {
    console.error('Webhook error:', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Webhook processing failed' }) };
  }
};
