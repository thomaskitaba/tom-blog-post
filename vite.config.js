import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import reactRefresh from '@vitejs/plugin-react-refresh';
import dotenv from 'dotenv';

// https://vitejs.dev/config/
export default defineConfig({
  base:'/tom-blog-post/',
  plugins: [react()],
})
