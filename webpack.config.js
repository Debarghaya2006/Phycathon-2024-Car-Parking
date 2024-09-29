const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    approval: './src/approval.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // your main HTML file
      filename: 'index.html',
      chunks: ['index'] // include the index bundle
    }),
    new HtmlWebpackPlugin({
      template: './src/approval.html', // your approval HTML file
      filename: 'approval.html',
      chunks: ['approval'] // include the approval bundle
    })
  ]
};