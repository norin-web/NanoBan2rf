import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Custom domain nanobananagen.skin (public/CNAME) → served from the root.
  // If the domain is ever removed, switch back to "/NanoBan2rf/" in the same
  // commit as deleting public/CNAME, or every asset 404s (white screen).
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
