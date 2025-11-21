const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'innovations.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath + ': ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initDb();
    }
});

function initDb() {
    db.serialize(() => {
        // Users table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            displayName TEXT,
            email TEXT,
            photoUrl TEXT,
            provider TEXT
        )`);

        // Showrooms table
        db.run(`CREATE TABLE IF NOT EXISTS showrooms (
            id TEXT PRIMARY KEY,
            name TEXT,
            modelUrl TEXT,
            ownerId TEXT,
            createdAt INTEGER
        )`);
    });
}

module.exports = db;
