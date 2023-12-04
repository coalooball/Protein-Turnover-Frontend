import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import envFile from 'ini';
import fs from 'fs';

const data = fs.readFileSync('./.env', 'utf-8');
const config = envFile.parse(data);
const targetUrl = config.proxy.target;

// https://vitejs.dev/config/
export default defineConfig({
  base: "/protein_turnover",
  plugins: [
    vue(),
    // @quasar/plugin-vite options list:
    // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
    // quasar({
    //   sassVariables: 'src/quasar-variables.sass'
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: targetUrl,
        changeOrigin: true
      },
    }
  }
});
