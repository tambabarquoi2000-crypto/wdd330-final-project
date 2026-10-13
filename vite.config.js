import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { defineConfig } from "vite";

// export default {
//     base: "/wdd330-final-project/",
//     plugins: [
//         tailwindcss(),
//     ]
// };


export default defineConfig({
root: "src/",

base: "/wdd330-final-project/",

plugins: [
         tailwindcss(),
    ],

build: {
outDir: "../dist",
rollupOptions: {
input: {
main: resolve(__dirname, "src/index.html"),
fireDetection: resolve(__dirname, "src/repair/fire_detection.html"),
services: resolve(__dirname, "src/services/index.html")
},
},
},
});
