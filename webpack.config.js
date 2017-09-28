'use strict';
var path = require('path')
var webpack = require('webpack') 

module.exports = {
  entry: path.resolve(__dirname, './views/app.js'),
  output: {
    path: path.resolve(__dirname, './views/dist'),
    publicPath: 'http://localhost:3000/dist/',
    filename: 'build.js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.less/,
        loaders: ['style', 'css', 'autoprefixer', 'less'],
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  vue:{
    loaders:{
      js:'babel'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true
  }
}

