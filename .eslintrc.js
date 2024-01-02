module.exports = {
  extends: ['@mate-academy/eslint-config-react-typescript', 'plugin:cypress/recommended'],
  rules: {
    'max-len': ['error', {
      ignoreTemplateLiterals: true,
      ignoreComments: true,
    }],
    'jsx-a11y/label-has-associated-control': ["error", {
      assert: "either",
    }],
    "react/jsx-filename-extension": [ "warn", {"extensions": [".tsx"]} ]
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
