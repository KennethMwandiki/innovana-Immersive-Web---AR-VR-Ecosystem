const fetch = require('node-fetch');

exports.handler = async (event) => {
  // Handle CORS preflight
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

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { prompt, type } = JSON.parse(event.body);
    const apiKey = process.env.BRIA_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Bria API key not configured' }),
      };
    }

    console.log('Received Bria prompt:', prompt, 'Type:', type);

    // Placeholder for actual Bria API call
    // In production, implement the actual call to Bria API

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Bria response (Netlify Function - LIVE)',
        assetUrl: 'https://placeholder.com/texture.jpg',
        type: type,
        status: 'placeholder - configure BRIA_API_KEY to enable',
      }),
    };
  } catch (error) {
    console.error('Bria error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to process Bria request' }),
    };
  }
};
