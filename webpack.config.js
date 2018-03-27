const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CompressionPlugin = require('compression-webpack-plugin');

// Build directory is where the bundle file will be placed
const BUILD_DIR = path.resolve(__dirname, 'public/dist');
// App directory is where raw JSX files will be placed
const APP_DIR = path.resolve(__dirname, 'client/src');

const common = {
  context: path.resolve(__dirname, 'client/src'),
  plugins: [
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
    new ExtractTextPlugin({ filename: 'bundle.css' }),
    new Dotenv(),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      'pg-native': path.join(__dirname, 'aliases/pg-native.js'),
    },
  },
};

const client = {
  entry: './index.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: APP_DIR,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'sass-loader', // compiles Sass to CSS
        }],
      },
    ],
  },
  output: {
    path: BUILD_DIR,
    filename: 'app.js',
  },
};

const server = {
  entry: './server.jsx',
  target: 'node',
  output: {
    path: BUILD_DIR,
    filename: 'app-server.js',
    libraryTarget: 'commonjs-module',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: APP_DIR,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$$/,
        use: [{
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'sass-loader', // compiles Sass to CSS
        }],
      },
    ],
  },
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server),
];
