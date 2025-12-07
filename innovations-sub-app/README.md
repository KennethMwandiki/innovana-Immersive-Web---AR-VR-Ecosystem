# Innovana Innovations Implementation - README

## Project Structure

This project consists of three integrated components:

### 1. **Core Web App** (`public/`)
- Vanilla JavaScript with Firebase integration
- 3D model viewing via `<model-viewer>`
- QR code generation for AR experiences
- Firebase Authentication (Email/Password)
- Firestore database for showrooms
- Firebase Storage for 3D model files

### 2. **Immersive Module** (`immersive/`)
- Meta Immersive Web SDK (IWSDK)
- High-fidelity VR/MR experiences for Meta Quest
- Three.js for 3D rendering
- PWA-ready for standalone installation

### 3. **Mobile App** (`mobile/`)
- React Native (Expo)
- WebView integration for seamless web experience
- Points to Firebase Hosting URL

---

## Firebase Setup

### Required Services
- **Authentication**: Email/Password provider
- **Firestore**: Database for showrooms
- **Storage**: 3D model file storage
- **Hosting**: Static web hosting

### Configuration Steps

#### 1. Update Firebase Config
Edit `public/firebase-config.js` with your actual Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "innovana-web-ar-vr.firebaseapp.com",
  projectId: "innovana-web-ar-vr",
  storageBucket: "innovana-web-ar-vr.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

#### 2. Enable Firebase Services
```bash
# Enable Email/Password Authentication
firebase auth:enable emailpassword

# Create Firestore Database (in Firebase Console)
# Go to Firestore Database → Create Database → Start in production mode

# Enable Storage (in Firebase Console)
# Go to Storage → Get Started
```

#### 3. Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /showrooms/{showroomId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

#### 4. Storage Security Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /showrooms/{userId}/{filename} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## Development

### Core Web App
```bash
# Development server
npm run dev

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

### Immersive Module
```bash
cd immersive
npm install
npm run dev        # Local development
npm run build      # Production build
```

### Mobile App
```bash
cd mobile
npm install
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
```

---

## Features Implemented

### ✅ Authentication
- Email/Password sign-up
- Email/Password sign-in
- Session persistence
- Protected routes (Create Showroom)

### ✅ Showrooms Management
- Create showroom with name and 3D model file
- Upload model to Firebase Storage
- Store metadata in Firestore
- List user's showrooms
- Delete showroom

### ✅ 3D/AR Viewing
- Interactive 3D model viewer
- AR mode support (WebXR, Scene Viewer, Quick Look)
- Camera controls (orbit, zoom, pan)
- Auto-rotate
- Shadows

### ✅ QR Code Generation
- Generate AR links for models
- QR code display
- Standalone AR viewer page

### ✅ Mobile Integration
- React Native WebView
- Points to live Firebase Hosting URL
- Full web app functionality in native wrapper

---

## Live URLs

- **Web App**: https://innovana-web-ar-vr.web.app/
- **AR Viewer**: https://innovana-web-ar-vr.web.app/ar-viewer.html

---

## Next Steps

1. **Add API Keys**: Update `firebase-config.js` with real credentials
2. **Enable Firebase Services**: Authentication, Firestore, Storage
3. **Deploy Security Rules**: Apply Firestore and Storage rules
4. **Test Features**:
   - Sign up / Sign in
   - Create showroom with model file
   - View in 3D
   - Generate AR link
   - Scan QR code on mobile
5. **Build Immersive Module**: Complete IWSDK implementation
6. **Test Mobile App**: Run on device/emulator

---

## Technologies Used

- **Frontend**: Vanilla JS, HTML5, CSS3
- **3D/AR**: Google Model Viewer 3.3.0
- **QR Codes**: QRCode.js
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Immersive**: Meta IWSD SDK, Three.js
- **Mobile**: React Native, Expo, react-native-webview
- **Hosting**: Firebase Hosting
- **Build Tool**: Vite

---

## License

Apache 2.0

## Acknowledgments

- AI Assistance: Google DeepMind Gemini
- 3D Models: ModelViewer.dev sample assets
