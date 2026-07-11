// Configuration for API Endpoints
const CONFIG = {
    // Check if running locally or in production
    API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000'
        : '/.netlify/functions' // Netlify Functions endpoint for live deployment
};

export default CONFIG;
