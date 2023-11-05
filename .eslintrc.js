module.exports = {
  extends: ['@mate-academy/eslint-config-react-typescript', 'plugin:cypress/recommended'],
  include: [
    "src",
  ],
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  rules: {
    'max-len': ['error', {
      ignoreTemplateLiterals: true,
      ignoreComments: true,
    }],
    'jsx-a11y/label-has-associated-control': ["error", {
      assert: "either",
    }],
  },
};
