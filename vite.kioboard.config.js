import { defineConfig } from "vite";
import postcssNesting from "postcss-nesting";
import { viteStaticCopy } from "vite-plugin-static-copy";

const LIBRARYNAME = "kioboard";

export default defineConfig({
    root: "./src",
    base: "./",
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: "layouts/*",
                    dest: "layouts"
                }
            ]
        })
    ],
    build: {
        minify: "terser",
        lib: {
            entry: `index.js`,
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
        // sourcemap: false,
        outDir: '../dist', // Output to a sibling directory
        emptyOutDir: true,
    },
    css: {
        postcss: {
            plugins: [postcssNesting()],
        }
    },
});
