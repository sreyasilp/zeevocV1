import { mergeConfig, defineConfig } from 'vite';

export default defineConfig((config) => {
  return mergeConfig(config, {
    server: {
      allowedHosts: ['admin.zeevocdigital.com']
    }
  });
});