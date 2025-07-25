import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
    plugins: [react()],
    root: resolve(__dirname, '.'),
    publicDir: resolve(__dirname, 'public'),
    build: {
        outDir: resolve(__dirname, 'dist'),
    },
    server: {
        fs: {
            // Allow serving files from one level up from the example directory
            allow: [resolve(__dirname, '..')]
        }
    },
    resolve: {
        alias: {
            // Alias the library source for development
            'react-lightweight-router': resolve(__dirname, '../src')
        }
    },
    optimizeDeps: {
        include: ['react', 'react-dom']
    }
}); 