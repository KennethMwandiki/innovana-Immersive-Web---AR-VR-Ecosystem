import { defineConfig } from 'vite';

export default defineConfig({
  base: '/innovana-Immersive-Web---AR-VR-Ecosystem/immersive/',
  server: {
    host: true, // Needed for accessing from Quest
  },
});
