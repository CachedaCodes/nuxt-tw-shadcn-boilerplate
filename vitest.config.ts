import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    include: ['**/__test__/**/*.spec.{js,ts,jsx,tsx}'],
  },
});
