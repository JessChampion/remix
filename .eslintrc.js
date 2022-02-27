module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': 0,
    'no-console': (process.env.NODE_ENV === 'production') ? 'error' : 'off',
    'no-debugger': (process.env.NODE_ENV === 'production') ? 'error' : 'off',
    'react/jsx-filename-extension': [2, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    'camelcase': 0,
    'comma-dangle': 0,
    'object-curly-newline': 0
  }
};
