// Authentication Module using Firebase SDK (Serverless)
import { auth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase-config.js';

let currentUser = null;

// UI Elements
const userDisplay = document.getElementById('user-display');

// Initialize Auth Listener
function initAuth() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUser = user;
            updateUI(user);
        } else {
            currentUser = null;
            updateUI(null);
        }
    });

    setupAuthModal();
    setupAuthListeners();
}

function setupAuthModal() {
    const modal = document.getElementById('auth-modal');
    const closeBtn = document.querySelector('.close-modal');
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');

    // Close Modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Tab Switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));

            tab.classList.add('active');
            const targetId = tab.dataset.target;
            document.getElementById(targetId).classList.add('active');
        });
    });
}

function setupAuthListeners() {
    // Open Modal Button
    document.addEventListener('click', (e) => {
        if (e.target.closest('#show-signin-modal')) {
            const modal = document.getElementById('auth-modal');
            if (modal) {
                modal.style.display = 'flex';
            }
        }
    });

    // Google Login
    document.addEventListener('click', async (e) => {
        if (e.target.closest('.btn-login-google')) {
            e.preventDefault();
            const provider = new GoogleAuthProvider();
            try {
                await signInWithPopup(auth, provider);
                const modal = document.getElementById('auth-modal');
                if (modal) modal.style.display = 'none';
                if (window.showToast) window.showToast('Logged in successfully', 'success');
            } catch (error) {
                console.error('Login Failed:', error);
                if (window.showToast) window.showToast('Login Failed: ' + error.message, 'error');
            }
        }
    });

    // Email Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            try {
                await signInWithEmailAndPassword(auth, email, password);
                const modal = document.getElementById('auth-modal');
                if (modal) modal.style.display = 'none';
                if (window.showToast) window.showToast('Logged in successfully', 'success');
            } catch (error) {
                if (window.showToast) window.showToast('Login Error: ' + error.message, 'error');
            }
        });
    }

    // Email Signup
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirm = document.getElementById('signup-confirm-password').value;

            if (password !== confirm) {
                if (window.showToast) window.showToast('Passwords do not match', 'error');
                return;
            }

            try {
                await createUserWithEmailAndPassword(auth, email, password);
                const modal = document.getElementById('auth-modal');
                if (modal) modal.style.display = 'none';
                if (window.showToast) window.showToast('Account created successfully!', 'success');
            } catch (error) {
                if (window.showToast) window.showToast('Signup Error: ' + error.message, 'error');
            }
        });
    }

    // Logout
    document.addEventListener('click', async (e) => {
        if (e.target.closest('.btn-logout')) {
            e.preventDefault();
            try {
                await signOut(auth);
                if (window.showToast) window.showToast('Logged out', 'info');
            } catch (error) {
                console.error('Logout Failed:', error);
            }
        }
    });
}

// Update UI based on auth state
function updateUI(user) {
    const createShowroomForm = document.getElementById('create-showroom-form');

    if (user) {
        // User is signed in
        if (userDisplay) {
            userDisplay.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="text-align: right;">
                        <div style="font-weight: bold; font-size: 0.9em;">${user.displayName || 'User'}</div>
                        <div style="font-size: 0.8em; color: rgba(255,255,255,0.8);">${user.email}</div>
                    </div>
                    ${user.photoURL ? `<img src="${user.photoURL}" style="width: 32px; height: 32px; border-radius: 50%;">` : '<div style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-accent); display: flex; align-items: center; justify-content: center; color: white;">' + (user.email[0].toUpperCase()) + '</div>'}
                    <button class="btn-secondary btn-logout" style="padding: 5px 10px; cursor: pointer; border-color: rgba(255,255,255,0.5); color: white;">Logout</button>
                </div>
            `;
        }

        if (createShowroomForm) createShowroomForm.style.display = 'block';

    } else {
        // User is signed out
        if (userDisplay) {
            userDisplay.innerHTML = `
                <button id="show-signin-modal" class="btn-primary" style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer;">
                    Log In / Sign Up
                </button>
            `;
        }

        if (createShowroomForm) createShowroomForm.style.display = 'none';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', initAuth);

// Export currentUser
export { auth, currentUser };

