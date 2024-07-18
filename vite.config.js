import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import postcssNesting from "postcss-nesting";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIBRARYNAME = "kioboard";

export default defineConfig({
    base: "./",
    build: {
        minify: 'terser', // Or 'esbuild' (depending on your preference)
        lib: {
            entry: path.resolve(__dirname, `src/${LIBRARYNAME}.js`),
            name: "kioboard",
            fileName: "kioboard",
            // formats: ["es"],
            minify: true,
        },
        rollupOptions: {
            output: {
                chunkFileNames: "layouts/[name].js",
                assetFileNames: `${LIBRARYNAME}.[ext]`, // Prevent renaming kioboard.css to style.css
                // entryFileNames: '[name].[format].js',
            }
        },
        sourcemap: false,
        emptyOutDir: true,
    },
    css: {
        postcss: {
            plugins: [postcssNesting()],
        }
    },
});