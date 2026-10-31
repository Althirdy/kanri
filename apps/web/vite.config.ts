/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // In dev, the browser talks to Vite, and Vite forwards /api to the NestJS app.
    proxy: { '/api': 'http://localhost:3000' },
  },
  test: {
    environment: 'jsdom',
  },
});
