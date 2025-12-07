// Authentication Module using Firebase SDK (Serverless)
import { auth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from '../firebase-config.js';

let currentUser = null;

// UI Elements
const authModal = document.getElementById('auth-modal');
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

    // Event Delegation for Login/Logout
    document.addEventListener('click', async (e) => {
        if (e.target.closest('.btn-login-google')) {
            e.preventDefault();
            const provider = new GoogleAuthProvider();
            try {
                await signInWithPopup(auth, provider);
                // Notification (if toast exists)
                if (window.showToast) window.showToast('Logged in successfully', 'success');
            } catch (error) {
                console.error('Login Failed:', error);
                if (window.showToast) window.showToast('Login Failed: ' + error.message, 'error');
            }
        }

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
    if (user) {
        // User is signed in
        if (userDisplay) {
            userDisplay.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span>Welcome, ${user.displayName || user.email}</span>
                    ${user.photoURL ? `<img src="${user.photoURL}" style="width: 32px; height: 32px; border-radius: 50%;">` : ''}
                    <button class="btn-secondary btn-logout" style="padding: 5px 10px; cursor: pointer;">Logout</button>
                </div>
            `;
        }
        // Hide auth modal if visible
        if (authModal) authModal.style.display = 'none';

        // Enable protected features
        const createShowroomForm = document.getElementById('create-showroom-form');
        if (createShowroomForm) {
            createShowroomForm.style.display = 'block';
        }
    } else {
        // User is signed out
        if (userDisplay) {
            userDisplay.innerHTML = `
                <button class="btn-primary btn-login-google" style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer;">
                    Login with Google
                </button>
            `;
        }

        // Disable protected features
        const createShowroomForm = document.getElementById('create-showroom-form');
        if (createShowroomForm) {
            createShowroomForm.style.display = 'none';
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', initAuth);

// Export currentUser
export { auth, currentUser };

