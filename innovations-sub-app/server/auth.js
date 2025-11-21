const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./db');

// REPLACE WITH YOUR ACTUAL CREDENTIALS OR ENV VARIABLES
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'YOUR_CLIENT_ID';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'YOUR_CLIENT_SECRET';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        // Insert or update user in DB
        const stmt = db.prepare("INSERT OR REPLACE INTO users (id, displayName, email, photoUrl, provider) VALUES (?, ?, ?, ?, ?)");
        const photo = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null;
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

        stmt.run(profile.id, profile.displayName, email, photo, 'google', (err) => {
            if (err) return cb(err);
            return cb(null, profile);
        });
        stmt.finalize();
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        done(err, row);
    });
});

module.exports = passport;
