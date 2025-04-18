import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000, // Choose a completely different port
    host: 'localhost', // Only listen on localhost
    strictPort: true, // Don't try other ports if 4000 is taken
    open: false, // Don't open browser automatically
  }
});