// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [react(), dts({
        insertTypesEntry: true,
        tsconfigPath: './tsconfig.json',
        rollupTypes: true
    })],
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'LightweightRouter',
            formats: ['es', 'umd'],
            fileName: (format) => `react-lightweight-router.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'React',
                },
                extend: true,
                inlineDynamicImports: true,
            }
        },
        sourcemap: true,
        minify: true,
    },
});
