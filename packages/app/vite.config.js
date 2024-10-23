"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_url_1 = require("node:url");
var plugin_vue_1 = require("@vitejs/plugin-vue");
// https://vitejs.dev/config/
exports.default = {
    build: {
        target: 'esnext'
    },
    plugins: [
        (0, plugin_vue_1.default)(),
    ],
    resolve: {
        alias: {
            '@': (0, node_url_1.fileURLToPath)(new node_url_1.URL('./src', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler' // or "modern"
            }
        }
    }
};
