# Distribution Platform Setup Guide
**Innovana Immersive Web & AR/VR Ecosystem**

This guide covers step-by-step setup for all major distribution platforms.

---

## 1. SideQuest / Meta Quest App Lab

### Prerequisites
- Meta Developer Account ([developer.oculus.com](https://developer.oculus.com))
- Node.js installed
- Your PWA live at `https://innovana-web-ar-vr.web.app`

### Steps

#### A. Package PWA as APK
```bash
# Install Bubblewrap CLI
npm install -g @bubblewrap/cli

# Initialize project
npx @bubblewrap/cli init --manifest https://innovana-web-ar-vr.web.app/manifest.json

# Follow prompts:
# - App name: Innovana XR
# - Package name: com.innovana.webxr
# - Display mode: standalone
# - Signing key: Generate new

# Build APK
npx @bubblewrap/cli build

# Output: app-release-signed.apk
```

#### B. Submit to App Lab
1. Go to [Meta Quest Developer Hub](https://developer.oculus.com/manage)
2. Click **Create New App**
3. Fill in details:
   - **App Name:** Innovana XR
   - **Category:** Productivity / Entertainment
   - **Platform:** Quest
4. Upload **APK** (`app-release-signed.apk`)
5. Add **Screenshots** (4-5 images, 1024x1024)
6. Set **Age Rating**
7. Add **Privacy Policy URL**
8. Submit for **App Lab** (instant approval, public listing)

**Approval Time:** 1-2 business days

---

## 2. PWA Directory

### Steps
1. Visit [pwa-directory.appspot.com](https://pwa-directory.appspot.com/)
2. Click **"Submit a PWA"**
3. Enter URL: `https://innovana-web-ar-vr.web.app`
4. Add metadata:
   - **Name:** Innovana Immersive Ecosystem
   - **Description:** Build and deploy AR/VR experiences directly from the web
   - **Category:** Productivity / WebXR
5. Submit
6. **Auto-approved** if `manifest.json` is valid

**Approval Time:** Instant

---

## 3. Microsoft Store (Windows PWA)

### Prerequisites
- Microsoft Partner Center account ($19 one-time fee)
- PWABuilder tool

### Steps

#### A. Generate MSIX Package
1. Go to [pwabuilder.com](https://www.pwabuilder.com/)
2. Enter URL: `https://innovana-web-ar-vr.web.app`
3. Click **"Build My PWA"**
4. Select **"Windows"** platform
5. Download **MSIX package**

#### B. Submit to Microsoft Store
1. Go to [Partner Center](https://partner.microsoft.com/dashboard)
2. Click **"New product"** → **"App"**
3. Reserve app name: **Innovana XR**
4. Go to **"Packages"** → Upload MSIX
5. Fill in store listing:
   - **Description:** (See template below)
   - **Screenshots:** 1366x768 or 1920x1080
   - **Category:** Productivity
6. Set **Age rating:** 3+
7. Add **Privacy Policy URL**
8. Submit for review

**Approval Time:** 1-3 business days

---

## 4. Google Play Store (Android TWA)

### Prerequisites
- Google Play Developer account ($25 one-time)
- Android Studio (or Bubblewrap)

### Steps

#### A. Create TWA (Trusted Web Activity)
```bash
# Using Bubblewrap
npx @bubblewrap/cli init --manifest https://innovana-web-ar-vr.web.app/manifest.json

# Select platform: Android
# Build AAB (Android App Bundle)
npx @bubblewrap/cli build --target=bundle

# Output: app-release-bundle.aab
```

#### B. Submit to Google Play
1. Go to [Google Play Console](https://play.google.com/console)
2. Click **"Create app"**
3. Fill in details:
   - **App name:** Innovana XR
   - **Category:** Productivity
4. Go to **"Production"** → Upload AAB
5. Complete **Store listing**:
   - **Short description:** (max 80 chars)
   - **Full description:** (See template below)
   - **Screenshots:** 16:9 ratio (min 2)
6. Set **Content rating**
7. Add **Privacy Policy**
8. Submit for review

**Approval Time:** 3-7 business days

---

## 5. Itch.io

### Steps
1. Create account at [itch.io](https://itch.io/)
2. Click **"Upload new project"**
3. Fill in details:
   - **Title:** Innovana Immersive Ecosystem
   - **Project URL:** `innovana-xr`
   - **Kind of project:** HTML
4. **Upload files:**
   - Zip your `public/` folder
   - Upload as HTML5 build
5. Set **Embed options:**
   - **Viewport:** 1920x1080
   - **Fullscreen:** Enabled
6. Click **"This file will be played in the browser"**
7. Set **Pricing:** Free (or pay-what-you-want)
8. Publish

**Approval Time:** Instant (goes live immediately)

---

## 6. WebXR Directory

### Steps
1. Visit [webxr.directory](https://webxr.directory/)
2. Click **"Submit"** (or similar)
3. Enter details:
   - **URL:** `https://innovana-web-ar-vr.web.app`
   - **Name:** Innovana XR
   - **Tags:** WebXR, AR, VR, Showroom, PWA
4. Submit

**Approval Time:** Manual review (1-2 weeks)

---

## 7. Product Hunt

### Steps
1. Create account at [producthunt.com](https://www.producthunt.com/)
2. Click **"Submit"** → **"Post a product"**
3. Fill in details:
   - **Name:** Innovana Immersive Ecosystem
   - **Tagline:** "Build AR/VR experiences from the web"
   - **Link:** `https://innovana-web-ar-vr.web.app`
   - **Topics:** WebXR, AR/VR, No-code, Developer Tools
4. Add **Screenshots/GIF** (500x400 recommended)
5. Write **Description:** (See template below)
6. Schedule launch or post immediately

**Best Practice:** Launch on Tuesday-Thursday, 12:01 AM PST

---

## 8. PICO Store

### Prerequisites
- PICO Developer account ([developer.picoxr.com](https://developer.picoxr.com))
- APK (use same from App Lab)

### Steps
1. Go to [PICO Developer Console](https://developer.picoxr.com/console)
2. Click **"Create Application"**
3. Upload **APK** (from Bubblewrap build)
4. Fill in store listing:
   - **Languages:** English + others
   - **Screenshots:** 1920x1080
   - **Category:** Productivity / Utilities
5. Set **Age rating**
6. Add **Privacy Policy**
7. Submit for review

**Approval Time:** 5-10 business days

---

## 9. Viveport (HTC Vive)

### Prerequisites
- Viveport Developer account ([developer.vive.com](https://developer.vive.com))
- WebVR/WebXR build URL

### Steps
1. Go to [Viveport Developer Console](https://developer.viveport.com/console)
2. Click **"Submit Content"**
3. Select **"WebVR"** as platform
4. Enter **URL:** `https://innovana-web-ar-vr.web.app`
5. Fill in metadata:
   - **Title:** Innovana XR
   - **Description:** (See template below)
   - **Genre:** Productivity / Utilities
6. Upload **Promotional images** (16:9 and 1:1)
7. Set **Pricing:** Free
8. Submit for review

**Approval Time:** 7-14 business days

---

## Ready-to-Use Content Templates

### Short Description (80 chars)
```
Build immersive AR/VR showrooms and experiences directly from your browser.
```

### Full Description (500-4000 chars)
```
Innovana is a web-based platform for creating and deploying immersive AR/VR experiences without code. 

KEY FEATURES:
• Virtual Showroom Builder - Create 3D product galleries
• AR Experience Generator - QR-code enabled AR views
• Real-time Collaboration - Firestore-powered live sync
• Google Authentication - Secure user management
• PWA Technology - Install like a native app on any device
• Cross-platform - Works on Quest, PC, Mobile

PERFECT FOR:
- E-commerce brands showcasing products in 3D
- Real estate virtual tours
- Educational immersive content
- Marketing campaigns with AR elements
- Event organizers creating hybrid experiences

TECHNICAL HIGHLIGHTS:
- Built with WebXR standards
- Firebase backend (Auth + Firestore)
- Offline-capable PWA
- Works in Meta Quest Browser without sideloading

No headset required to get started - works in any modern browser!
```

### Privacy Policy URL
Create a simple privacy policy at:
- [privacypolicies.com](https://www.privacypolicies.com/live/innovana-web-ar-vr.web.app) (free generator)
- Host on Firebase: `https://innovana-web-ar-vr.web.app/privacy.html`

---

## Quick Win Priority

✅ **This Week (0-2 hours total):**
1. PWA Directory
2. Product Hunt
3. WebXR Directory
4. Itch.io

✅ **This Month (4-8 hours):**
5. App Lab (Meta Quest)
6. Microsoft Store

✅ **Quarter 1 (8-16 hours):**
7. Google Play Store
8. PICO Store
9. Viveport

---

## Troubleshooting

### Common Issues

**APK Build Fails:**
- Ensure `manifest.json` has all required fields (`start_url`, `icons`, `display`)
- Check Node.js version (use v18 or v20)
- Run `npx @bubblewrap/cli doctor` for diagnostics

**Store Rejection:**
- **Missing Privacy Policy:** Add link to manifest and store listing
- **Low-quality screenshots:** Use 4K resolution (3840x2160)
- **Age rating mismatch:** Ensure consistent across all platforms

**PWA Not Installing:**
- Check Service Worker is registered (Dev Tools → Application)
- Verify HTTPS is enabled
- Ensure `manifest.json` is properly linked in `index.html`

---

## Support Resources

- **Meta Quest:** [developer.oculus.com/resources](https://developer.oculus.com/resources)
- **Microsoft Store:** [docs.microsoft.com/windows/uwp/publish](https://docs.microsoft.com/windows/uwp/publish)
- **Google Play:** [developer.android.com/distribute](https://developer.android.com/distribute)
- **Bubblewrap Docs:** [github.com/GoogleChromeLabs/bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap)

---

**Questions?** Check the main [README.md](./README.md) or open an issue on GitHub.
