// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'never'],
  },
});
