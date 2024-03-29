module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'plugin:cypress/recommended',
  ],
  rules: {
      "jsx-a11y/label-has-associated-control": [ 0, {
        "required": {
          "some": [ "nesting", "id" ]
        }
      }]
  },
};
