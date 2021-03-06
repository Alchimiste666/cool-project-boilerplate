import chalk from 'chalk';
import webpack from 'webpack';
import babelConfig from './.babelrc';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ProgressBarWebpackPlugin from 'progress-bar-webpack-plugin';

export default function webpackTestConfig(options = { watch: false }) {

  const rules = [
    {
      test: /\.(css|scss|sass|less|png|jpe?g|bmp|gif|ico|eot|svg|ttf|woff|woff2)$/i,
      loader: 'ignore-loader'
    }
  ];

  if (options.watch) {
    // Lint code in watch mode only
    rules.push({
      enforce: 'pre',
      test: /\.js$/i,
      include: /src/,
      loader: 'eslint-loader'
    });

  } else {
    // Do not instrument code in watch mode (Faster rebuild time and more accurate source-mapping)
    rules.push({
      enforce: 'post',
      test: /\.js$/i,
      include: /src/,
      exclude: /(node_modules|\.spec\.js$|-test-helper\.js$)/i,
      loader: 'istanbul-instrumenter-loader',
      options: {
        preserveComments: true,
        esModules: true,
        compact: false,
        debug: true
      }
    });
  }

  rules.push({
    test: /\.js$/i,
    exclude: /node_modules\/(?!query-string)/,
    loader: 'babel-loader',
    options: babelConfig
  });

  return {
    mode: 'development',
    watch: options.watch,
    target: 'web',
    devtool: options.watch ? 'inline-source-map' : false,
    module: { rules },
    plugins: [
      new ProgressBarWebpackPlugin({
        format: chalk.cyan.bold(' Bundling... ') + chalk.blue.bold(' [:bar] ') + chalk.green.bold(' :percent ') + chalk.yellow(' :elapsed seconds'),
        clear: false
      }),
      new CleanWebpackPlugin({ verbose: true }),
      new webpack.DefinePlugin({
        _TARGET_: JSON.stringify('TEST')
      })
    ]
  };
}
