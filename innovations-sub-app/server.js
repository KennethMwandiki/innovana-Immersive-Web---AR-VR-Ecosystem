const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
// Meta sends JSON, but sometimes also x-www-form-urlencoded. 
// Important: Body parser is needed for the POST events.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- META WEBHOOK VERIFICATION ---
// This endpoint is used by Meta to verify your server is real.
// You must configure the same 'VERIFY_TOKEN' in your Meta App Dashboard.
app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'innovana_secret_token';

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(400); // Bad Request
    }
});

// --- META WEBHOOK EVENT HANDLER ---
// Meta sends updates here (e.g., app install, user purchase, etc.)
app.post('/webhook', (req, res) => {
    console.log('Webhook Event Received:', JSON.stringify(req.body, null, 2));

    // Platform specific logic (e.g. Horizon, Instagram, etc.)
    // const body = req.body;
    // if (body.object === 'page') { ... }

    // Always return 200 OK immediately to acknowledge receipt
    res.status(200).send('EVENT_RECEIVED');
});

// Health check
app.get('/', (req, res) => {
    res.send('Innovana Webhook Server is Running');
});

app.listen(PORT, () => {
    console.log(`Webhook server listening on port ${PORT}`);
});
