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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));
// Legacy assets support
app.use('/src', express.static(path.join(__dirname, 'src')));

// Helper to check for API keys
const checkApiKey = (keyName, res) => {
    if (!process.env[keyName]) {
        console.error(`Missing API Key: ${keyName}`);
        res.status(500).json({ error: 'Server configuration error: Missing API Key' });
        return false;
    }
    return true;
};

// --- Auth Routes ---
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/');
    });

app.get('/api/auth/status', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ isAuthenticated: true, user: req.user });
    } else {
        res.json({ isAuthenticated: false });
    }
});

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// Middleware to protect API routes
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized' });
}

// --- Showroom & AR Routes ---
app.get('/api/showrooms', (req, res) => {
    db.all("SELECT * FROM showrooms", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post('/api/showrooms', ensureAuthenticated, (req, res) => {
    const { name } = req.body;
    const id = `showroom-${Date.now()}`;
    const ownerId = req.user.id;
    const createdAt = Date.now();

    const stmt = db.prepare("INSERT INTO showrooms (id, name, modelUrl, ownerId, createdAt) VALUES (?, ?, ?, ?, ?)");
    stmt.run(id, name, '#', ownerId, createdAt, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id, name, modelUrl: '#', ownerId, createdAt });
    });
    stmt.finalize();
});

app.delete('/api/showrooms/:id', ensureAuthenticated, (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare("DELETE FROM showrooms WHERE id = ?");
    stmt.run(id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Showroom not found' });
        }
    });
    stmt.finalize();
});

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
