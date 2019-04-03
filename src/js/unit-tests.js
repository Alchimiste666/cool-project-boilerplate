// Load all .js files in source folder
const testsContext = require.context(".", true, /\.js$/);

// Exclude test helpers and application entry file
testsContext.keys().filter(key => !(key.endsWith('-test-helper.js') || key.endsWith('/app.js')))
    // Create webpack bundle
    .forEach(testsContext);
