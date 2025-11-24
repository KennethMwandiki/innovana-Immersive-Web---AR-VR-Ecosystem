const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper to check for API keys
const checkApiKey = (keyName, res) => {
    if (!process.env[keyName]) {
        console.error(`Missing API Key: ${keyName}`);
        res.status(500).json({ error: 'Server configuration error: Missing API Key' });
        return false;
    }
    return true;
};

// --- Gemini AI Route ---
app.post('/api/ai/gemini', async (req, res) => {
    if (!checkApiKey('GEMINI_API_KEY', res)) return;

    try {
        const { prompt } = req.body;
        // This is a simplified example. In production, you'd use the Google Generative AI SDK
        // or construct the full fetch request to the specific Gemini model endpoint.
        // For now, we'll mock the interaction or use a direct fetch if the user provides a specific endpoint.

        // Placeholder for actual Gemini API call
        // const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, { ... });

        console.log('Received Gemini prompt:', prompt);
        res.json({ message: "Gemini response placeholder", originalPrompt: prompt });

    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ error: 'Failed to process Gemini request' });
    }
});

// --- Bria AI Route ---
app.post('/api/ai/bria', async (req, res) => {
    if (!checkApiKey('BRIA_API_KEY', res)) return;

    try {
        const { prompt, type } = req.body; // type could be 'texture', 'image', etc.
        const endpoint = process.env.BRIA_API_ENDPOINT || 'https://api.bria.ai/v1';

        // Placeholder for actual Bria API call
        console.log('Received Bria prompt:', prompt, 'Type:', type);
        res.json({ message: "Bria response placeholder", assetUrl: "https://placeholder.com/texture.jpg" });

    } catch (error) {
        console.error('Bria API Error:', error);
        res.status(500).json({ error: 'Failed to process Bria request' });
    }
});

// Serve Immersive App (if built)
app.use('/immersive', express.static(path.join(__dirname, 'public/immersive')));

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Environment variables loaded:', {
        GEMINI_KEY_SET: !!process.env.GEMINI_API_KEY,
        BRIA_KEY_SET: !!process.env.BRIA_API_KEY
    });
});
