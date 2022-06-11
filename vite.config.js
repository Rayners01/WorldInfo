import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    EnvironmentPlugin(['API_URL'])
  ],
  optimizeDeps: { include: ["@carbon/charts"] },
})
