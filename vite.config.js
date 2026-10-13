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
request: resolve(__dirname, "src/repair/request.html"),
request: resolve(__dirname, "src/repair/schedule.html"),
request: resolve(__dirname, "src/repair/fire_detection.html"),
request: resolve(__dirname, "src/partials/header.html"),
request: resolve(__dirname, "src/partials/footer.html"),
request: resolve(__dirname, "src/services/index.html")
},
},
},
});
