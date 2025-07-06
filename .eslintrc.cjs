module.exports = {
  root: true, // Garante que esta é a configuração raiz
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    // Adicione 'plugin:prettier/recommended' se você usa Prettier
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    // REMOVIDO: project: './tsconfig.json', // Esta linha foi removida do nível superior
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: 'detect', // Detecta automaticamente a versão do React
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  rules: {
    // Adicione suas regras ESLint específicas aqui
    "react/prop-types": "off", // Desativa a validação de propTypes, pois TypeScript já lida com isso
    "react/react-in-jsx-scope": "off" // Desativa a necessidade de importar React explicitamente para JSX (para React 17+)
  },
  overrides: [
    {
      // Aplica estas regras e configurações a arquivos dentro da pasta cypress e ao cypress.config.ts
      files: ['cypress/**/*.ts', 'cypress.config.ts'],
      parserOptions: {
        // Usa o tsconfig.cypress.json para esses arquivos
        project: './tsconfig.cypress.json', // Aponta para o tsconfig.cypress.json
        tsconfigRootDir: __dirname,
      },
      extends: [
        'plugin:cypress/recommended', // Adiciona regras específicas do Cypress
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
        'cypress/no-unnecessary-waiting': 'warn',
      },
      env: {
        'cypress/globals': true, // Expõe as variáveis globais do Cypress (cy, expect, etc.)
        node: true, // O arquivo de configuração do Cypress é executado em ambiente Node.js
        browser: false // Não há globais de navegador para o arquivo de configuração
      },
    },
    // Adicione uma nova entrada para arquivos de código-fonte da aplicação se precisar de linting com tipagem
    {
      files: ['src/**/*.{ts,tsx}'], // Aplica a arquivos TypeScript/TSX em src/
      parserOptions: {
        project: './tsconfig.json', // Aponta para o tsconfig.json principal para o código da aplicação
        tsconfigRootDir: __dirname,
      },
    }
  ],
};
