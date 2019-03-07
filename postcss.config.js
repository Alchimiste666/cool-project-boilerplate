const supportedBrowsers = require('./supported-browsers');

module.exports = {
  plugins: {
    autoprefixer: {
      browsers: supportedBrowsers
    },
    cssnano: {
      safe: true
    }
  }
};
