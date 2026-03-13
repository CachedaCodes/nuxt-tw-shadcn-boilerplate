import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['**/__test__/**/*.spec.{js,ts,jsx,tsx}'],
  },
});
