module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:prettier/recommended', // 使用prettier

        'plugin:react/recommended',
        // 'eslint:recommended',
        'plugin:react/jsx-runtime', // 解决react非必须引入问题
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'prettier',
        'react',
        // 'jsx-a11y',
        '@typescript-eslint',
    ],
    rules: {
        'prettier/prettier': ['error', { singleQuote: true, semi: false }],
    },
}
