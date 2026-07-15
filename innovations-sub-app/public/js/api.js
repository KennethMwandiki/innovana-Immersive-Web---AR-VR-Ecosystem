import CONFIG from './config.js';

async function postJson(path, body) {
  const url = `${CONFIG.API_BASE_URL}/${path}`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await resp.text();
  try {
    return resp.ok ? JSON.parse(text || '{}') : Promise.reject(new Error(text || resp.statusText));
  } catch (e) {
    if (resp.ok) return { raw: text };
    throw new Error(text || resp.statusText);
  }
}

export function callGemini(payload) {
  return postJson('gemini', payload);
}

export function callBria(payload) {
  return postJson('bria', payload);
}

export default { callGemini, callBria };
