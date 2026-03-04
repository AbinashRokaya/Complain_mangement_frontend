import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://transport-complain-management-system-4.onrender.com",
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
      },
    },
  },
});
