import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import babelConfig from './babel.config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ProgressBarWebpackPlugin from 'progress-bar-webpack-plugin';
import WriteFileWebpackPlugin from 'write-file-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import StyleLintWebpackPlugin from 'stylelint-bare-webpack-plugin';

process.env.NODE_ENV = 'development';

const distFolder = path.join(__dirname, 'dist');

export default {
  mode: 'development',
  watch: true,
  target: 'web',
  devtool: 'eval-source-map',
  context: path.resolve('./src/'),
  entry: {
    index: './js/index'
  },
  output: {
    path: distFolder,
    filename: 'scripts/[name].bundle.js',
    chunkFilename: 'scripts/[name].chunk.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/i,
        include: [/src/, /mock-server/, /proxy-server/],
        loader: 'eslint-loader',
        options: {
          fix: false
        }
      },
      {
        test: /\.js$/i,
        include: /src/,
        loader: 'babel-loader',
        options: babelConfig
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          mimetype: 'application/vnd.ms-fontobject',
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml',
          name: '[name].[ext]',
          outputPath: 'icons/'
        }
      },
      {
        test: /\.ico$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/x-icon',
          name: '[name].[ext]',
          outputPath: 'images/'
        }
      },
      {
        test: /\.(png|jpe?g|bmp|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/'
        }
      }
    ]
  },
  plugins: [
    new ProgressBarWebpackPlugin({
      format: chalk.cyan.bold(' Bundling... ') + chalk.blue.bold(' [:bar] ') + chalk.green.bold(' :percent ') + chalk.yellow(' :elapsed seconds'),
      clear: false
    }),
    new CleanWebpackPlugin({ verbose: true }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      _TARGET_: JSON.stringify('DEV'),
      API_URL: JSON.stringify(process.env.API_URL || 'https://my-api-url.com')
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CopyWebpackPlugin([
      { from: './favicon.png', to: distFolder }
    ]),
    new StyleLintWebpackPlugin({
      files: 'src/scss/**/*.scss'
    }),
    // Useful plugins for debugging
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    new WriteFileWebpackPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: distFolder,
    port: 7070,
    open: true
  }
};
