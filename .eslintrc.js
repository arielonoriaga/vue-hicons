module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/recommended',
    'plugin:vue/essential',
  ],
  rules: {
    indent: ['error', 2],
    semi: 'error',
    'vue/no-dupe-keys': 'error',
    'vue/no-duplicate-attributes': 'error',
    'vue/no-parsing-error': 'error',
    'vue/no-reserved-keys': 'error',
    'vue/no-unused-components': 'error',
    'vue/no-use-v-if-with-v-for': 'error',
    'vue/require-render-return': 'error',
    'vue/require-v-for-key': 'error',
    'eol-last': 'error',
    'no-trailing-spaces': 'error',
    'semi-spacing': 'error',
    'no-extra-semi': 'error',
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',
    'vue/multiline-html-element-content-newline': 'error',
    'vue/html-indent': [
      'error',
      2,
    ],
  },
  plugins: [
    'vue',
  ],
};