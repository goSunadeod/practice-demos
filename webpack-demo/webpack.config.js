const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const addAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');


module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name][hash:4].bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: 'index.html'
    }),
    new addAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, './dll/vendors.dll.js'),
      publicPath: '',
      includeSourcemap: false,
      hash: true
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, './dll/vendors.manifest.json')
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}