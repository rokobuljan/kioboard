import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    base: './',
    build: {
        minify: "terser",
        lib: {
            entry: path.resolve(__dirname, 'src/kioboard.js'),
            name: 'kioboard',
            fileName: 'kioboard',
            formats: ['es'],
            minify: true,
        },
        rollupOptions: {
            output: {
                chunkFileNames: 'layouts/[name].js',
            }
        },
        sourcemap: true,
        emptyOutDir: true,
    }
});