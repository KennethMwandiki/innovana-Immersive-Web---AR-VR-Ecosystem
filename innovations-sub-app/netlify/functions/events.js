// Events function for Hybrid Events (demo - in-memory store)
let events = [];

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } };
  }
  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
  try {
    if (event.httpMethod === 'GET') {
      return { statusCode: 200, headers, body: JSON.stringify(events) };
    }
    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body || '{}');
      const { title, startAt, endAt, metadata } = body;
      if (!title || !startAt) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing title or startAt' }) };
      const id = `event-${Date.now()}`;
      const e = { id, title, startAt, endAt: endAt || null, metadata: metadata || {}, createdAt: new Date().toISOString() };
      events.push(e);
      return { statusCode: 201, headers, body: JSON.stringify(e) };
    }
    if (event.httpMethod === 'DELETE') {
      const id = event.queryStringParameters?.id;
      if (!id) return { statusCode: 400, headers, body: JSON.stringify({ error: 'id required' }) };
      const idx = events.findIndex(ev => ev.id === id);
      if (idx === -1) return { statusCode: 404, headers, body: JSON.stringify({ error: 'not found' }) };
      events.splice(idx,1);
      return { statusCode: 200, headers, body: JSON.stringify({ message: 'deleted', id }) };
    }
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  } catch (err) {
    console.error('Events error:', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Internal error' }) };
  }
};
