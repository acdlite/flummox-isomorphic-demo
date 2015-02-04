'use strict';

var webpack = require('webpack');

module.exports = {
  entry: './src/client/entry',
  output: {
    path: __dirname + '/public/js/',
    filename: 'app.min.js',
    publicPath: '/js/'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    }),
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['6to5-loader?experimental&runtime'], exclude: /node_modules/ }
    ]
  }
};
