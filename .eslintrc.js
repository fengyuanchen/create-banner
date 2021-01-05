module.exports = {
  env: {
    node: true,
  },
  extends: 'airbnb-typescript/base',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: 'tsconfig.eslint.json',
  },
  plugins: [
    '@typescript-eslint',
  ],
  overrides: [
    {
      files: 'test.js',
      env: {
        mocha: true,
      },
    },
  ],
};
