const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Ensure node-fetch is installed for Node < 18 or use native fetch if Node 18+
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Helper to check for API keys (using Functions Config or process.env)
const checkApiKey = (keyName, res) => {
    // In Firebase Functions, env vars are set via `firebase functions:config:set` 
    // and accessed via `functions.config().env.key` OR standard `process.env` if using .env files with newer SDKs.
    // We'll support both for flexibility.
    const key = process.env[keyName] || (functions.config().env && functions.config().env[keyName.toLowerCase()]);

    if (!key) {
        console.error(`Missing API Key: ${keyName}`);
        res.status(500).json({ error: 'Server configuration error: Missing API Key' });
        return null;
    }
    return key;
};

// --- Gemini AI Route ---
app.post('/ai/gemini', async (req, res) => {
    const apiKey = checkApiKey('GEMINI_API_KEY', res);
    if (!apiKey) return;

    try {
        const { prompt } = req.body;
        console.log('Received Gemini prompt:', prompt);

        // Placeholder for actual Gemini API call
        // const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, ...);

        res.json({ message: "Gemini response placeholder (Cloud Function)", originalPrompt: prompt });

    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ error: 'Failed to process Gemini request' });
    }
});

// --- Bria AI Route ---
app.post('/ai/bria', async (req, res) => {
    const apiKey = checkApiKey('BRIA_API_KEY', res);
    if (!apiKey) return;

    try {
        const { prompt, type } = req.body;
        console.log('Received Bria prompt:', prompt, 'Type:', type);

        // Placeholder for actual Bria API call
        res.json({ message: "Bria response placeholder (Cloud Function)", assetUrl: "https://placeholder.com/texture.jpg" });

    } catch (error) {
        console.error('Bria API Error:', error);
        res.status(500).json({ error: 'Failed to process Bria request' });
    }
});

// --- Showrooms Route (In-Memory for Demo) ---
// Note: SQLite is not suitable for serverless functions. 
// Using in-memory array which will reset on cold starts. 
// For production, use Firestore.
const showrooms = [];

app.get('/showrooms', (req, res) => {
    res.json(showrooms);
});

app.post('/showrooms', (req, res) => {
    const { name } = req.body;
    const id = `showroom-${Date.now()}`;
    const newShowroom = { id, name, modelUrl: '#', createdAt: Date.now() };
    showrooms.push(newShowroom);
    res.status(201).json(newShowroom);
});

// Expose Express API as a single Cloud Function: api
exports.api = functions.https.onRequest(app);
