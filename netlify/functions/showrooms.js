// In-memory showrooms store (resets on cold starts - suitable for demo/MVP)
// For production, integrate with a database (Firebase Firestore, Supabase, etc.)
let showrooms = [];

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    // GET /showrooms - list all showrooms
    if (event.httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(showrooms),
      };
    }

    // POST /showrooms - create a new showroom
    if (event.httpMethod === 'POST') {
      const { name } = JSON.parse(event.body);
      if (!name) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Showroom name is required' }),
        };
      }

      const newShowroom = {
        id: `showroom-${Date.now()}`,
        name,
        modelUrl: '#',
        createdAt: new Date().toISOString(),
      };

      showrooms.push(newShowroom);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(newShowroom),
      };
    }

    // DELETE /showrooms?id=<showroom-id> - delete a showroom
    if (event.httpMethod === 'DELETE') {
      const id = event.queryStringParameters?.id;
      if (!id) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Showroom ID is required' }),
        };
      }

      const index = showrooms.findIndex((s) => s.id === id);
      if (index === -1) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Showroom not found' }),
        };
      }

      showrooms.splice(index, 1);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Showroom deleted', id }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  } catch (error) {
    console.error('Showrooms error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to process showrooms request' }),
    };
  }
};
