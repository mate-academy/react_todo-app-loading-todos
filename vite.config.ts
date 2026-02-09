import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react_todo-app-loading-todos/',
  server: {
    port: 3000,
  },
});
