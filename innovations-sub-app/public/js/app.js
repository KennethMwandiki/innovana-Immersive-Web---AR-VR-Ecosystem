// Main App Logic with Firebase Integration
import { createShowroom, subscribeShowrooms, deleteShowroom, generateARLink } from './showrooms.js';
import { auth } from './auth.js';

// Mock data for showrooms (fallback)
const mockShowrooms = [
    {
        id: 'summer-2025',
        name: 'Summer 2025 Collection',
        modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        iosUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz'
    },
    {
        id: 'holiday-preview',
        name: 'Holiday Exclusive Preview',
        modelUrl: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
        iosUrl: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.usdz'
    }
];

document.addEventListener('DOMContentLoaded', async () => {
    // Tab Navigation Logic
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(tabId) {
        navLinks.forEach(link => {
            if (link.getAttribute('data-tab') === tabId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        tabContents.forEach(content => {
            if (content.id === tabId) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');
            switchTab(tabId);
            history.pushState(null, null, `#${tabId}`);
        });
    });

    // Handle initial hash in URL
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
        const targetTab = document.querySelector(`.nav-link[data-tab="${initialHash}"]`);
        if (targetTab) {
            switchTab(initialHash);
        }
    }

    // Initialize model-viewer
    const modelViewer = document.getElementById('showroom-viewer');
    if (modelViewer) {
        // Load default model
        modelViewer.src = mockShowrooms[0].modelUrl;
        modelViewer.iosSrc = mockShowrooms[0].iosUrl;

        // Handle showroom list clicks
        const showroomList = document.getElementById('showroom-list');
        if (showroomList) {
            // Load showrooms from Firebase
            loadShowrooms();

            showroomList.addEventListener('click', async (e) => {
                if (e.target.classList.contains('action-link')) {
                    e.preventDefault();

                    if (e.target.classList.contains('delete')) {
                        // Delete showroom
                        const listItem = e.target.closest('.showroom-item');
                        const showroomId = listItem.dataset.id;

                        if (confirm('Are you sure you want to delete this showroom?')) {
                            try {
                                await deleteShowroom(showroomId);
                                listItem.remove();
                                alert('Showroom deleted successfully!');
                            } catch (error) {
                                alert('Error deleting showroom: ' + error.message);
                            }
                        }
                    } else {
                        // View showroom
                        const listItem = e.target.closest('.showroom-item');
                        const showroomName = listItem.querySelector('span').textContent;
                        const modelUrl = listItem.dataset.modelUrl;

                        if (modelUrl && modelViewer) {
                            modelViewer.src = modelUrl;
                            const overlay = document.getElementById('viewer-overlay-text');
                            if (overlay) {
                                overlay.textContent = `Showroom: ${showroomName}`;
                            }
                        }
                    }
                }
            });
        }
    }

    // Create Showroom Form
    const showroomForm = document.getElementById('create-showroom-form');
    if (showroomForm) {
        showroomForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('showroom-name').value;
            const modelFile = document.getElementById('model-upload').files[0];

            try {
                const showroom = await createShowroom(name, modelFile);
                alert('Showroom created successfully!');
                showroomForm.reset();

                // No need to reload, real-time listener will handle it
            } catch (error) {
                alert('Error creating showroom: ' + error.message);
            }
        });
    }

    // AR Experience Form
    const arForm = document.getElementById('create-ar-form');
    if (arForm) {
        arForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const linkElement = document.getElementById('ar-link');
            const qrContainer = document.getElementById('qr-code-container');

            // Simulate generation
            linkElement.textContent = 'Generating...';
            linkElement.style.color = 'var(--color-neutral-3)';

            // Use mock model URL or get from Firebase
            const modelUrl = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';
            const arUrl = generateARLink(modelUrl);

            setTimeout(() => {
                linkElement.textContent = arUrl;
                linkElement.href = arUrl;
                linkElement.style.color = 'var(--color-primary)';

                // Generate QR Code
                if (typeof QRCode !== 'undefined') {
                    qrContainer.innerHTML = '';
                    new QRCode(qrContainer, {
                        text: arUrl,
                        width: 128,
                        height: 128,
                        colorDark: "#000000",
                        colorLight: "#ffffff",
                        correctLevel: QRCode.CorrectLevel.H
                    });
                } else {
                    qrContainer.innerHTML = '<span style="font-size: 3rem;">📱</span>';
                }

                alert('AR Experience Generated!');
            }, 1000);
        });
    }

    // Load showrooms from Firebase (Real-time)
    function loadShowrooms() {
        const showroomList = document.getElementById('showroom-list');
        if (!showroomList) return;

        // Subscribe to real-time updates
        subscribeShowrooms((showrooms) => {
            renderShowrooms(showrooms);
        });
    }

    function renderShowrooms(showrooms) {
        const showroomList = document.getElementById('showroom-list');
        if (!showroomList) return;

        if (showrooms.length > 0) {
            showroomList.innerHTML = showrooms.map(showroom => `
                <li class="showroom-item" data-id="${showroom.id}" data-model-url="${showroom.modelUrl || ''}">
                    <span>${showroom.name}</span>
                    <div>
                        <a href="#" class="action-link">View</a>
                        <span style="color: var(--color-border);">|</span>
                        <a href="#" class="action-link delete">Delete</a>
                    </div>
                </li>
            `).join('');
        } else {
            // Show mock data if no Firebase showrooms
            showroomList.innerHTML = mockShowrooms.map((showroom, index) => `
                <li class="showroom-item" data-id="${showroom.id}" data-model-url="${showroom.modelUrl}">
                    <span>${showroom.name}</span>
                    <div>
                        <a href="#" class="action-link">View</a>
                        <span style="color: var(--color-border);">|</span>
                        <a href="#" class="action-link delete">Delete</a>
                    </div>
                </li>
            `).join('');
        }
    }

    // Global error handler for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function () {
            this.src = 'https://via.placeholder.com/60x60?text=Img';
        });
    });

    // Auth Modal handling is now in auth.js

    // --- New Event Listeners for Functional Sections ---

    // AR Try-On Buttons
    document.querySelectorAll('.btn-ar-tryon').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = btn.dataset.productId;
            showToast(`Launching AR Try-On for Product #${productId}...`, 'info');
            // Simulate loading
            setTimeout(() => {
                showToast('AR Session Active! (Simulation)', 'success');
            }, 1500);
        });
    });

    // Checkout Button
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Initiating Secure Checkout...', 'info');
            setTimeout(() => {
                showToast('Payment Gateway Connected (Simulation)', 'success');
            }, 1500);
        });
    }

    // Hybrid Events - Join Avatar
    document.querySelectorAll('.btn-join-event').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Connecting to Virtual Venue...', 'info');
            setTimeout(() => {
                showToast('Connected! Welcome to the Event Space.', 'success');
            }, 2000);
        });
    });

    // Hybrid Events - Attend Person
    const attendBtn = document.querySelector('.btn-attend-person');
    if (attendBtn) {
        attendBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Opening Ticket Options...', 'info');
        });
    }

    // About Demos
    document.querySelectorAll('.btn-demo').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const demoType = btn.dataset.demo;
            let message = 'Starting Demo...';
            switch (demoType) {
                case 'classroom': message = 'Loading Virtual Classroom...'; break;
                case 'workspace': message = 'Entering Shared Workspace...'; break;
                case 'medical': message = 'Loading Medical Simulation...'; break;
                case 'events': message = 'Fetching Event Schedule...'; break;
                case 'social': message = 'Connecting to Social Hub...'; break;
                case 'game': message = 'Launching Game Engine...'; break;
                case 'ai': message = 'Initializing AI Assistant...'; break;
            }
            showToast(message, 'info');
            setTimeout(() => {
                showToast('Demo Loaded (Simulation)', 'success');
            }, 1500);
        });
    });

    // Toast Notification Function
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        let icon = '';
        if (type === 'success') icon = '✅';
        if (type === 'error') icon = '❌';
        if (type === 'info') icon = 'ℹ️';

        toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;

        document.body.appendChild(toast);

        // Trigger reflow
        toast.offsetHeight;

        // Show
        setTimeout(() => toast.classList.add('show'), 10);

        // Hide and remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Expose showToast globally if needed
    window.showToast = showToast;
});
