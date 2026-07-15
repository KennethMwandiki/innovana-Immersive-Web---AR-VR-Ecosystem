// Simple in-memory orders API for Social Commerce (demo)
// For production, replace in-memory store with Firestore or a proper DB.

let orders = [];

exports.handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }

  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };

  try {
    if (event.httpMethod === 'GET') {
      return { statusCode: 200, headers, body: JSON.stringify(orders) };
    }

    if (event.httpMethod === 'POST') {
      const payload = JSON.parse(event.body || '{}');
      const { items, total, currency = 'usd', customer } = payload;
      if (!items || !Array.isArray(items) || items.length === 0) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid items' }) };
      }

      const id = `order-${Date.now()}`;
      const order = { id, items, total: total || 0, currency, customer: customer || null, status: 'created', createdAt: new Date().toISOString() };
      orders.push(order);
      return { statusCode: 201, headers, body: JSON.stringify(order) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  } catch (err) {
    console.error('Orders error:', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Internal error' }) };
  }
};
