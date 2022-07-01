import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    plugins: [vue()],
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/components/index.ts"),
            name: "vue-roller",
            fileName: (format) => `vue-roller.${format}.js`,
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
    esbuild: {
        jsxInject: `import { h } from 'vue'`,
        jsxFactory: "h",
        jsxFragment: "Fragment",
    },
});
