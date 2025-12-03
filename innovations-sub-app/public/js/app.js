document.addEventListener('DOMContentLoaded', () => {
    // Tab Navigation Logic
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(tabId) {
        // Update active state for nav links
        navLinks.forEach(link => {
            if (link.getAttribute('data-tab') === tabId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Show active tab content
        tabContents.forEach(content => {
            if (content.id === tabId) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }

    // Add click event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');
            switchTab(tabId);
            // Update URL hash without scrolling
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

    // Mock Form Submissions
    const showroomForm = document.getElementById('create-showroom-form');
    if (showroomForm) {
        showroomForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Showroom saved! (Mock API call)');
            showroomForm.reset();
        });
    }

    const arForm = document.getElementById('create-ar-form');
    if (arForm) {
        arForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const linkElement = document.getElementById('ar-link');
            const qrContainer = document.getElementById('qr-code-container');

            // Simulate generation
            linkElement.textContent = 'Generating...';
            linkElement.style.color = 'var(--color-neutral-3)';

            setTimeout(() => {
                const mockUrl = `https://ar.innovana.com/view?id=${Date.now()}`;
                linkElement.textContent = mockUrl;
                linkElement.href = mockUrl;
                linkElement.style.color = 'var(--color-primary)';
                qrContainer.innerHTML = '<span style="font-size: 3rem;">📱</span>';
                alert('AR Experience Generated!');
            }, 1000);
        });
    }

    // Add global error handler for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function () {
            this.src = 'https://via.placeholder.com/60x60?text=Img';
        });
    });
});
