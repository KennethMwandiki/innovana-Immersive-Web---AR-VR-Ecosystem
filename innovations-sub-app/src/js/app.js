// Check Auth Status
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/auth/status')
        .then(res => res.json())
        .then(data => {
            const loggedOutDiv = document.getElementById('logged-out');
            const loggedInDiv = document.getElementById('logged-in');
            const createShowroomForm = document.getElementById('create-showroom-form');

            if (data.isAuthenticated) {
                loggedOutDiv.style.display = 'none';
                loggedInDiv.style.display = 'flex';
                document.getElementById('user-name').textContent = data.user.displayName;
                if (data.user.photos && data.user.photos.length > 0) {
                    document.getElementById('user-photo').src = data.user.photos[0].value;
                }
                if (createShowroomForm) createShowroomForm.style.display = 'block';
            } else {
                loggedOutDiv.style.display = 'block';
                loggedInDiv.style.display = 'none';
                if (createShowroomForm) {
                    createShowroomForm.innerHTML = '<p>Please <a href="/auth/google">login</a> to create showrooms.</p>';
                }
            }
        });
});

function openInnovationTab(evt, tabName) {
    var i, tabcontent, tablinks;
    // Hide all tab content
    tabcontent = document.getElementById('innovations').getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Deactivate all tab links
    tablinks = document.getElementById('innovations-nav').getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the selected tab and activate the link
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Mock functionality for buttons (Updated for Real API)
document.addEventListener('DOMContentLoaded', () => {
    const createShowroomForm = document.getElementById('create-showroom-form');
    if (createShowroomForm) {
        createShowroomForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('showroom-name').value;

            fetch('/api/showrooms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            })
                .then(res => {
                    if (res.status === 401) {
                        alert('You must be logged in to do that.');
                        window.location.href = '/auth/google';
                        return;
                    }
                    return res.json();
                })
                .then(data => {
                    if (data) {
                        alert('Showroom created: ' + data.name);
                        // Ideally, reload the list here
                        location.reload();
                    }
                });
        });
    }
});

