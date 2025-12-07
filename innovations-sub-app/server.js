const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const passport = require('./server/auth');
const db = require('./server/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'https://innovana-web-ar-vr.web.app'],
    credentials: true
}));
app.post('/api/ar-experiences', ensureAuthenticated, (req, res) => {
    res.json({
        arUrl: `https://ar.innovana.com/view?model=${req.body.modelId}`,
        qrCodeDataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
    });
});

// --- Gemini AI Route ---
app.post('/api/ai/gemini', async (req, res) => {
    if (!checkApiKey('GEMINI_API_KEY', res)) return;

    try {
        const { prompt } = req.body;
        console.log('Received Gemini prompt:', prompt);
        // Placeholder for actual Gemini API call
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
        const { prompt, type } = req.body;
        const endpoint = process.env.BRIA_API_ENDPOINT || 'https://api.bria.ai/v1';
        console.log('Received Bria prompt:', prompt, 'Type:', type);
        // Placeholder for actual Bria API call
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
    console.log(`Innovations Sub-App running at http://localhost:${PORT}`);
    console.log('Environment variables loaded:', {
        GEMINI_KEY_SET: !!process.env.GEMINI_API_KEY,
        BRIA_KEY_SET: !!process.env.BRIA_API_KEY
    });
});
