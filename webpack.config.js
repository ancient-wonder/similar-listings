const webpack = require('webpack');
const path = require('path');

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
        test:/\.(s*)css$/,
        use:['style-loader','css-loader', 'sass-loader'],
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
};

module.exports = config;
