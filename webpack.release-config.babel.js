import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import babelConfig from './babel.config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ProgressBarWebpackPlugin from 'progress-bar-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

const distFolder = path.join(__dirname, 'dist');

const scriptsPathPrefix = 'scripts/';
const stylesPathPrefix = 'styles/';

export default {
  mode: 'production',
  target: 'web',
  devtool: 'hidden-source-map',
  context: path.resolve('./src/'),
  entry: {
    app: './js/app'
  },
  output: {
    path: distFolder,
    filename: scriptsPathPrefix + '[contenthash].[name].bundle.js',
    chunkFilename: scriptsPathPrefix + '[contenthash].[name].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'webpack-strip-block',
        options: {
          start: '<TEST_ONLY>',
          end: '</TEST_ONLY>'
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
            loader: MiniCssExtractPlugin.loader
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
            loader: MiniCssExtractPlugin.loader
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
        test: /\.(woff2|woff|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[contenthash].[name].[ext]',
          outputPath: stylesPathPrefix + 'fonts/',
          publicPath: 'fonts/'
        }
      },
      {
        test: /\.(svg|ico)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[contenthash].[name].[ext]',
          outputPath: stylesPathPrefix + 'icons/',
          publicPath: '/icons'
        }
      },
      {
        test: /.*\.(gif|png|jpe?g|gif)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[contenthash].[name].[ext]',
              outputPath: stylesPathPrefix + 'images/',
              publicPath: 'images/'
            }
          },
          {
            loader: 'img-loader',
            options: {
              optipng: false,
              pngquant: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ProgressBarWebpackPlugin({
      format: chalk.cyan.bold(' Bundling... ') + chalk.blue.bold(' [:bar] ') + chalk.green.bold(' :percent ') + chalk.yellow(' :elapsed seconds'),
      clear: false
    }),
    new CleanWebpackPlugin({ verbose: true }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      _TARGET_: JSON.stringify('PROD'),
      API_URL: JSON.stringify(process.env.API_URL || 'https://my-api-url.com')
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        collapseWhitespace: true,
        removeComments: true,
        keepClosingSlash: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: stylesPathPrefix + '[contenthash].[name].bundle.css',
      chunkFilename: stylesPathPrefix + '[contenthash].[name].chunk.css'
    }),
    new CopyWebpackPlugin([
      { from: './favicon.png', to: distFolder }
    ]),
    new CompressionPlugin()
  ]
};
