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
  }, server: {
      proxy: {
        "/api": "http://localhost:5000", // proxy API calls to backend
      },
    },

  tailwind: {
    theme: {
      extend: {
        fontFamily: {
          outfit: ["Outfit", "sans-serif"],
          // redhat: ['"Red Hat Display"', "sans-serif"],
           poppins: ['Poppins', 'sans-serif'],
        redhat: ['"Red Hat Display"', 'sans-serif'],
        },
         screens: {
        'sm425': '425px', // Custom breakpoint for 425px and above
      },
      },
    },
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
  },
});

   
