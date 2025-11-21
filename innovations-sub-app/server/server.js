const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('./auth');
const db = require('./db');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../public')));
app.use('/src', express.static(path.join(__dirname, '../src')));

// Auth Routes
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
        // Successful authentication, redirect home.
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

// Persistent API Endpoints
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
    // In a real app, check if req.user.id owns the showroom
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

// Serve Index
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Innovations Sub-App running at http://localhost:${PORT}`);
});

