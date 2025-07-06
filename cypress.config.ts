import { defineConfig } from 'cypress';

export default defineConfig({ // Usar export default
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000', // Confirme a URL base do seu aplicativo
    defaultCommandTimeout: 4000,
    pageLoadTimeout: 60000, // Aumenta o tempo limite de carregamento da página para 60 segundos
  },
});
