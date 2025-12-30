# Meta Horizon Immersive Web Development Plan

## Executive Summary
This document outlines the strategic plan for leveraging **Meta's Immersive Web SDK (IWSDK)** to build and deploy high-fidelity immersive experiences for the **Innovana** ecosystem. By utilizing the IWSDK, we aim to bridge the gap between traditional web development and spatial computing, enabling users to access rich, interactive AR/VR content directly through the Meta Quest Browser on Horizon OS.

## 1. Technology Stack

### Core Frameworks
*   **Meta Immersive Web SDK (IWSDK)**: The primary toolkit for building WebXR experiences. It provides a high-performance Entity-Component-System (ECS) optimized for Horizon OS.
*   **Three.js**: The underlying 3D rendering engine. IWSDK is built on top of Three.js, allowing us to leverage its vast ecosystem of libraries and examples.
*   **WebXR Device API**: The standard web API that enables access to VR/AR hardware features directly from the browser.

### Development Tools
*   **Node.js & npm**: For package management and build scripts.
*   **Vite**: For fast development server and optimized production builds.
*   **Meta Immersive Web Emulator**: A browser extension (Chrome/Edge) to simulate Meta Quest devices during development.
*   **Meta Spatial Editor**: A visual tool for composing scenes and placing assets without writing code.

## 2. Development Workflow

### Setup & Initialization
1.  **Project Scaffolding**: Use the IWSDK CLI to generate a new project structure.
    ```bash
    npm create @iwsdk@latest
    ```
2.  **Configuration**: Select **TypeScript** for type safety and enable **Hand Tracking** and **Passthrough** templates.

### Iteration Cycle
1.  **Local Development**: Run `npm run dev` to start the local server.
2.  **Emulation**: Use the **Immersive Web Emulator** to test interactions (hands, controllers) and locomotion in a simulated 3D environment on the desktop.
3.  **On-Device Testing**:
    *   Connect Meta Quest headset via USB or Wi-Fi.
    *   Use **Meta Quest Developer Hub (MQDH)** to port forward the local server.
    *   Access the local URL (e.g., `http://localhost:5173`) in the Meta Quest Browser.

## 3. Key Features & Implementation

### Immersive Interactions
*   **Hand Tracking**: Implement natural interactions using the SDK's `HandTrackingSystem`. Users can grab, push, and manipulate virtual objects with their real hands.
*   **Locomotion**: Utilize pre-built teleportation and smooth locomotion components to allow users to navigate large virtual spaces comfortably.
*   **Spatial UI**: Build user interfaces using the SDK's UI kit, which supports curved panels and spatial positioning for better readability in VR.

### Mixed Reality (Passthrough)
*   **Scene Understanding**: Use the SDK to detect real-world planes (floors, walls, tables).
*   **Anchors**: Place virtual objects that persist in the real world using **Spatial Anchors**.
*   **Passthrough Layer**: Overlay virtual content onto the user's physical environment for AR experiences.

### Audio & Physics
*   **Spatial Audio**: Integrate 3D positional audio to enhance immersion. Sounds will attenuate and pan based on the user's head position.
*   **Physics Engine**: Enable the **Havok** physics integration for realistic object collisions and gravity.

## 4. Deployment Strategy

### Progressive Web App (PWA)
To ensure the highest quality user experience and discoverability, we will package the web application as a PWA.

1.  **Manifest Configuration**: Create a `manifest.json` defining the app's name, icons, and display mode (`standalone`).
2.  **Service Workers**: Implement service workers for offline caching and faster load times.
3.  **Oculus Packaging**: Use **Bubblewrap** CLI to wrap the PWA into an Android Package (APK) suitable for the Horizon Store.

### Distribution Channels
*   **Meta Horizon Store (App Lab)**: Submit the packaged PWA for distribution to a wider audience.
*   **Web Access**: Users can also access the experience directly via URL in the Meta Quest Browser, with an option to "Install" it to their library.

## 5. Roadmap

*   **Phase 1: Prototype**: Build a simple "Showroom" scene with basic object interaction and hand tracking.
*   **Phase 2: Core Features**: Implement spatial UI, locomotion, and backend API integration for dynamic content.
*   **Phase 3: Mixed Reality**: Add Passthrough and Scene Understanding features for AR use cases.
*   **Phase 4: Polish & Deploy**: Optimize performance (frame rate, load times), package as PWA, and submit to App Lab.

## 6. React Native Integration Strategy

For applications that already exist as React Native mobile apps, we can seamlessly integrate immersive web experiences using the following strategy.

### WebView Integration
The primary method for embedding WebXR content within a React Native app is through a **WebView**.

1.  **Library**: Use `react-native-webview` for robust WebView capabilities.
2.  **Implementation**:
    ```javascript
    import { WebView } from 'react-native-webview';

    const ImmersiveView = () => {
      return (
        <WebView
          source={{ uri: 'ht
          htps://innovana-web-ar-vr.web.app' }}
          style={{ flex: 1 }}
          allowsInlineMediaPlayback={true}
          javaScriptEnabled={true}
          // Enable WebXR support flags if available/needed for specific WebView implementations
        />
      );
    };
    ```
3.  **Communication**: Use `postMessage` to enable two-way communication between the React Native app and the immersive web content (e.g., passing user auth tokens or theme preferences).

### Deep Linking
To provide a "Launch in VR" experience from the mobile app to the Meta Quest headset:

1.  **Universal Links**: Configure the immersive web app with Universal Links (iOS) and App Links (Android).
2.  **Oculus Browser**: Use the `oculus://` URL scheme to open the specific URL directly in the Meta Quest Browser if the user is on the device.
    ```javascript
    import { Linking } from 'react-native';

    const openInVR = () => {
      const url = 'https://innovana-web-ar-vr.web.app';
      // Check if running on Quest or trigger a "Send to Headset" flow
      Linking.openURL(url);
    };
    ```

### Native Modules (Advanced)
If deeper integration is required (e.g., accessing native device sensors not exposed to WebXR):

1.  **Bridge**: Create a React Native Bridge module to expose native Android/Horizon OS APIs to JavaScript.
2.  **Hybrid App**: For complex use cases, consider a hybrid approach where the React Native app handles 2D UI and state, while a native view (via `react-native-three` or similar) renders the 3D content, though this increases complexity significantly compared to the WebView approach.

### Recommendation
For the **Innovana** ecosystem, we recommend the **WebView Integration** approach for mobile apps. It maintains a single codebase for the immersive experience (web) while allowing it to be surfaced within the native mobile app context.
