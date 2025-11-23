import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true, // Needed for accessing from Quest
  },
});
