module.exports = {
  env: {
    browser: true,
    es2024: true,
    node: true,
  },

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },

  extends: [
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:cypress/recommended',
    'eslint:recommended',
    'plugin:import/recommended',
  ],

  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
    '@typescript-eslint',
    'prettier',
    'import',
  ],

  overrides: [
    {
      files: ['**/*.spec.{js,jsx,ts,tsx}', 'cypress/**/*.{js,jsx,ts,tsx}'],
      rules: {
        'react/jsx-filename-extension': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
      },
    },
  ],

  rules: {
    /* Base */
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    'prefer-const': 'error',
    curly: ['error', 'all'],
    'no-console': 'error',
    'implicit-arrow-linebreak': 'off',
    'object-curly-newline': 'off',
    'object-property-newline': 'off',
    'operator-linebreak': 'off',
    'max-len': ['error', { code: 120, ignoreComments: true }],
    'no-param-reassign': ['error', { props: false }],

    /* React */
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',

    /* Hooks */
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    /* a11y */
    'jsx-a11y/label-has-associated-control': [
      'error',
      { assert: 'either' },
    ],

    /* TypeScript */
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    /* Prettier */
    'prettier/prettier': 'error',

    /* Import */
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
  },

  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },

  ignorePatterns: [
    'dist',
    'vite.config.ts',
    'src/vite-env.d.ts',
  ],
};
