module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: [
    '@nuxtjs/eslint-config-typescript', 
    'plugin:prettier/recommended'
  ],
  plugins: [
    'unused-imports'
  ],
  rules: {
    "prettier/prettier": [
      "warn",
      {
        printWidth: Infinity,
        semi: false,
        singleQuote: true,
      },
    ],
    // "@typescript-eslint/no-unused-vars": "off",
    // "unused-imports/no-unused-imports": "error",
    "quotes": ["error", "single"],
    // "vue/no-unused-vars": "error",
    // "no-unused-vars": "error",
    // "max-len": "off",
    "semi": ["error", "never"],
    "vue/no-multiple-template-root": "off",
    "vue/no-v-html": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-v-for-template-key": "off",
    "vue/no-v-for-template-key-on-child": "error",
    "camelcase": "off",
    "vue/no-setup-props-destructure": "off"
  },
}