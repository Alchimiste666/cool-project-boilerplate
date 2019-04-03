import path from 'path';
import webpackTestConfig from "./webpack.test-config.babel";

export default function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: path.resolve(__dirname, './'),

    // frameworks to use
    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'src/js/unit-tests.js'
    ],

    // preprocess matching files before serving them to the browser
    preprocessors: {
      'src/js/**/*.js': ['webpack']
    },

    // webpack test config file
    webpack: webpackTestConfig(),

    // test results reporters to use
    reporters: ['progress', 'spec', 'coverage-istanbul'],

    specReporter: {
      maxLogLines: 5,               // limit number of lines logged per test
      suppressErrorSummary: false,  // do not print error summary
      suppressFailed: false,        // do not print information about failed tests
      suppressPassed: false,        // do not print information about passed tests
      suppressSkipped: false,       // do not print information about skipped tests
      showSpecTiming: false,        // print the time elapsed for each spec
      failFast: false               // test would finish with error when a first fail occurs. 
    },

    coverageIstanbulReporter: {

      // reports can be any that are listed here: https://github.com/istanbuljs/istanbul-reports/tree/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib
      reports: ['html', 'text', 'text-summary'],

      // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
      dir: path.join(__dirname, './coverage'),

      // if using webpack and pre-loaders, work around webpack breaking the source path
      fixWebpackSourcePaths: true,

      // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
      skipFilesWithNoCoverage: false,

      // Combines coverage information from multiple browsers into one report rather than outputting a report for each browser.
      combineBrowserReports: true,

      // output config used by istanbul for debugging
      // verbose: true
    },

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Overriding karma-mocha default timeout
    client: {
      mocha: {
        timeout: 10000 // 10 seconds
      }
    }
  });
}
