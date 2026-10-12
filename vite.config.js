import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 350,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) return 'vendor-motion';
          if (id.includes('@supabase')) return 'vendor-supabase';
          if (id.includes('react-router') || id.includes('@remix-run')) return 'vendor-router';
          if (id.includes('react-icons')) return 'vendor-icons';
          if (id.includes('marked')) return 'vendor-marked';
          if (id.includes('react-dom') || id.includes('node_modules/react/') || id.includes('scheduler') || id.includes('react-helmet')) return 'vendor-react';
        },
      },
    },
  },
});
