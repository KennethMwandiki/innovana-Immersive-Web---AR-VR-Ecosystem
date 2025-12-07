    // Add global error handler for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function () {
            this.src = 'https://via.placeholder.com/60x60?text=Img';
        });
    });
});
