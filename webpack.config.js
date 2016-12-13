'use strict';

const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    path: path.join(__dirname, 'target'),
    filename: 'bundle.js' 
  },
  devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : null,
  watch: NODE_ENV === 'development',
  watchOptions: {
    poll: true,
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    fallback: path.join(__dirname, 'node_modules'),
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader',
          'css?minimize!postcss!sass'),
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        loader: 'url-loader',
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
      },
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'], }) ],
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('./bundle.css'),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      env: NODE_ENV,
      template: __dirname + '/src/views/layout.html',
    }),
  ],
};

if (NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        /* eslint camelcase: ["error", {properties: "never"}] */
        drop_console: true,
        unsafe: true,
      },
      output: {
        comments: false,
      },
    })
  );
}
