import path from 'path';
import webpackTestConfig from "./webpack.test-config.babel";

export default (config) => {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: path.resolve(__dirname, './'),

    // frameworks to use
    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/core-js/stable/index.js',
      'node_modules/regenerator-runtime/runtime.js',
      'src/js/unit-tests.js'
    ],

    // preprocess matching files before serving them to the browser
    preprocessors: {
      'node_modules/core-js/stable/index.js': ['webpack'],
      'src/js/**/*.js': ['webpack', 'sourcemap']
    },

    // webpack test config file
    webpack: webpackTestConfig({ watch: true }),

    // test results reporters to use
    reporters: ['progress', 'spec'],

    specReporter: {
      maxLogLines: 5,               // limit number of lines logged per test
      suppressErrorSummary: false,  // do not print error summary
      suppressFailed: false,        // do not print information about failed tests
      suppressPassed: false,        // do not print information about passed tests
      suppressSkipped: false,       // do not print information about skipped tests
      showSpecTiming: false,        // print the time elapsed for each spec
      failFast: false               // test would finish with error when a first fail occurs. 
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Open browser manually for development testing (Prevents browser from closing upon task restart -> better DX)
    // http://localhost:9876/debug.html
    browsers: [],

    // Overriding karma-mocha default timeout
    client: {
      mocha: {
        timeout: 10000 // 10 seconds
      }
    }
  });
}
