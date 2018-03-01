const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Build directory is where the bundle file will be placed
const BUILD_DIR = path.resolve(__dirname, 'client/dist');
// App directory is where raw JSX files will be placed
const APP_DIR = path.resolve(__dirname, 'client/src');

const config = {
  entry: APP_DIR + '/index.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: APP_DIR,
        use: ['babel-loader'],
      },
      {
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract({ 
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: BUILD_DIR,
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({filename: 'bundle.css'}),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
};

module.exports = config;
