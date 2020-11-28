module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'import/prefer-default-export': 0,
    'no-console': 0,
    'class-methods-use-this': 0,
    'no-plusplus': 0,
    'default-case': 0,
    'import/extensions': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 'error',
    'no-shadow': 0,
    'consistent-return': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/no-shadow': ['error'],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
