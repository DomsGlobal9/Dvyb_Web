import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
  },
  css: {
    // You can use this for future global CSS config if needed
  },
  tailwind: {
    theme: {
      extend: {
        fontFamily: {
          outfit: ["Outfit", "sans-serif"],
          redhat: ['"Red Hat Display"', "sans-serif"],
        },
      },
    },
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
  },
});

    // server: {
    //   proxy: {
    //     "/api": "http://localhost:5000", // proxy API calls to backend
    //   },
    // },

