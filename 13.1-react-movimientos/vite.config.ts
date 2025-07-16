import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import type { UserConfig as VitestUserConfigInterface } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from 'path';

const vitestConfig: VitestUserConfigInterface = {
  test: {
    globals: true,
  },
};

export default defineConfig({
  plugins: [checker({ typescript: true }), react()],
  test: vitestConfig.test,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
