module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'standard-jsx',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended'
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
    // 'prettier',
    'react',
    // 'jsx-a11y',
    '@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-unused-vars': 0
    // 'prettier/prettier': ['error', { singleQuote: true, semi: false }],
  }
}
