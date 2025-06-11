// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // Asegúrate de que esto también esté aquí

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Asegúrate de que esto también esté aquí
  ],
  base: "/Pokedex/", // ¡Es CRUCIAL que sea el nombre de tu repositorio con barras!
});
