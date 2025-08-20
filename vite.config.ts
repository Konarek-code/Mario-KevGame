import { defineConfig } from "vite";

// Eksportujemy konfigurację za pomocą `defineConfig`
export default defineConfig({
  base: "./", // żeby assety ładowały się poprawnie
  server: {
    host: true, // ← to pozwoli na dostęp z zewnątrz
  },
});
