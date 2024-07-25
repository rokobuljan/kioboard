import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import postcssNesting from "postcss-nesting";
import { viteStaticCopy } from "vite-plugin-static-copy";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIBRARYNAME = "kioboard";

export default defineConfig({
    base: "./",
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: "src/layouts/*",
                    dest: "layouts"
                }
            ]
        })
    ],
    build: {
        minify: "terser",
        lib: {
            entry: path.resolve(__dirname, `src/${LIBRARYNAME}.js`),
            name: "kioboard",
            fileName: "kioboard",
            minify: true,
        },
        rollupOptions: {
            output: {
                chunkFileNames: "layouts/[name].js",
                assetFileNames: `${LIBRARYNAME}.[ext]`, // Prevent renaming kioboard.css to style.css
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