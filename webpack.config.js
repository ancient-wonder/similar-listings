const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CompressionPlugin = require('compression-webpack-plugin');

// Build directory is where the bundle file will be placed
const BUILD_DIR = path.resolve(__dirname, 'public/dist');
// App directory is where raw JSX files will be placed
const APP_DIR = path.resolve(__dirname, 'client/src');

const config = {
  context: APP_DIR,
  entry: './index.jsx',
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
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
    new ExtractTextPlugin({ filename: 'bundle.css' }),
    new Dotenv(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
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
