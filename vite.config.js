import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      host: "localhost",
      port: parseInt(env.VITE_PORT_FRONTEND) || 3000
    }
  };
});
