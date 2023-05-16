const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: true,
  numTestsKeptInMemory: 100,
  e2e: {
    watchForFileChanges: true,
    execTimeout: 20000,
    defaultCommandTimeout: 15000,
    requestTimeout: 20000,
    pageLoadTimeout: 60000,
    responseTimeout: 20000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
