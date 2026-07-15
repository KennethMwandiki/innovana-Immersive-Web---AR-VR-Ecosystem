// Payments function (Stripe Integration Skeleton)
// Requires STRIPE_SECRET_KEY in Netlify environment variables
// POST to create a PaymentIntent: { amount, currency }

const stripeSecret = process.env.STRIPE_SECRET_KEY;
let Stripe = null;
try {
  if (stripeSecret) Stripe = require('stripe')(stripeSecret);
} catch (e) {
  console.warn('Stripe not configured or unavailable in runtime.');
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } };
  }

  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };

  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

  if (!Stripe) return { statusCode: 500, headers, body: JSON.stringify({ error: 'Stripe not configured' }) };

  try {
    const body = JSON.parse(event.body || '{}');
    const { amount, currency = 'usd' } = body;
    if (!amount) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Amount is required' }) };

    const paymentIntent = await Stripe.paymentIntents.create({ amount, currency });
    return { statusCode: 200, headers, body: JSON.stringify({ clientSecret: paymentIntent.client_secret, id: paymentIntent.id }) };
  } catch (err) {
    console.error('Payments error:', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Payment creation failed' }) };
  }
};
