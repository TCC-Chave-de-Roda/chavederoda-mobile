const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    // Definindo a versão do ECMAScript
    parserOptions: {
      ecmaVersion: 2020, // Versão do ECMAScript
      sourceType: 'module', // Para usar os módulos ES6
    },
  },
]);
