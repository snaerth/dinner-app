module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
    'jest/globals': true
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  plugins: ['svelte3', 'eslint-plugin-jest'],
  extends: ['eslint:recommended'],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  settings: {
    'svelte3/ignore-styles': () => true
  },
  ignorePatterns: ['src/node_modules/@sapper/service-worker.js'],
}
