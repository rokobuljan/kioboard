import { defineConfig } from "vite";
import postcssNesting from "postcss-nesting";

export default defineConfig({
    root: "./src/page",
    base: "./",

    build: {
        minify: "terser",
        // sourcemap: false,
        outDir: '../../docs', // Output to a sibling directory
        emptyOutDir: true,
    },
    css: {
        postcss: {
            plugins: [postcssNesting()],
        }
    },
});