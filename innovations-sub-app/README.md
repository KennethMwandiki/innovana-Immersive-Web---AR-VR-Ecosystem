# Innovana Immersive Web & AR/VR

Innovana Suite is building a multi‑purpose immersive ecosystem that blends AR/VR with AI, haptics, and multisensory innovation. Designed to scale across industries, our platform transforms how people learn, work, play, heal, and connect.

## Defining Factors We Deliver

*   **Presence:** Experiences that make users feel truly “inside” the environment.
*   **Interactivity:** Real‑time actions with immediate, natural responses.
*   **Immersion:** Multi‑sensory depth across sight, sound, and touch.

## Emerging Applications

*   **Education & Training 🎓:** Interactive classrooms, labs, and simulations.
*   **Collaboration & Workspaces 💼:** Immersive meetings and co‑creation hubs.
*   **Healthcare & Wellness 🏥:** Safe, tactile environments for therapy and training.
*   **Events & Entertainment 🎤:** Hybrid concerts, conferences, and cultural showcases.
*   **Community & Social Spaces 🌍:** Shared XR hubs for connection and exploration.
*   **Gaming 🎮:** Next‑gen XR gameplay with tactile realism and social interaction.
*   **AI‑Driven Experiences 🤖:** Adaptive environments that respond to user behavior and emotion.

## Futuristic Predictions We’re Building Toward

*   **Haptic & Multisensory Integration:** Gloves, suits, and controllers that simulate texture, pressure, and resistance.
*   **Spatial Computing & Gesture Control:** Natural hand/eye tracking for seamless interaction.
*   **Full‑Body Immersion:** Environmental simulation (temperature, vibration, wind) for authentic presence.
*   **Neural Interfaces:** Preparing for direct brain‑computer links as the next frontier.

## Access & Testing

### Live Deployment
The latest version of the Innovations Sub-App is automatically deployed to GitHub Pages.

**URL**: `https://kennethmwandiki.github.io/innovana-Immersive-Web---AR-VR-Ecosystem/` (Note: URL may vary based on repository name).

### Testing Instructions

#### 1. General UI
- Open the main URL on any desktop or mobile browser.
- Navigate through the "About", "Strategy", and "Innovations" tabs.
- Verify the "Emerging Applications" grid cards are interactive.

#### 2. Immersive Experience (WebXR)
- **Desktop**: Use the [Immersive Web Emulator](https://chrome.google.com/webstore/detail/immersive-web-emulator/cgffilbngalglplfmhlduphcdkcfhbop) extension to simulate a headset. Navigate to `/immersive/index.html` (e.g., append `immersive/` to the base URL).
- **Meta Quest**: Open the URL in the Meta Quest Browser. Click "Enter VR" (if implemented) or view the 3D scene directly.

#### 3. Mobile App (React Native)
- Clone the repository and navigate to the `mobile` directory.
- Run `npm install` and `npx expo start`.
- Use the Expo Go app on your phone to scan the QR code.
- The app will load the immersive web view (ensure the URL in `App.js` points to the live deployment or your local IP).

## Technical Implementation

### Frontend Architecture
The application is built using a modern, cost-effective stack designed for immersive web experiences:
*   **Core Framework:** React with Vite (TypeScript template) for fast development and minimal setup.
*   **3D/AR Engine:** Three.js ecosystem, specifically `@react-three/fiber`, `@react-three/drei`, and `@react-three/xr` for WebXR support.
*   **Component Structure:**
    *   `VirtualShowroom.tsx`: Manages state, lists, and forms for showrooms.
    *   `ARExperiences.tsx`: Handles AR generation logic.
    *   `ThreeCanvas.tsx`: Reusable 3D viewer component.
    *   `ar-viewer.html`: Lightweight page for QR code links.

### Backend Architecture
A lightweight REST API (e.g., Express.js or NestJS) manages assets and experience generation:
*   **POST /api/showrooms**: Uploads new showrooms (multipart/form-data).
*   **GET /api/showrooms**: Retrieves list of available showrooms.
*   **DELETE /api/showrooms/:id**: Removes a showroom.
*   **POST /api/ar-experiences**: Generates shareable AR links and QR codes from existing models.

