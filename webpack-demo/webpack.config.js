const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const addAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');


const makePlugins = function () {
  const plugins = [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: 'index.html'
    }),
  ];

  // 动态分析文件
  const files = fs.readdirSync(path.resolve(__dirname, './dll'));
  files.forEach(file => {
    // 如果是xxx.dll.js文件
    if (/.*\.dll.js/.test(file)) {
      plugins.push(
        new addAssetHtmlWebpackPlugin({
          filepath: path.resolve(__dirname, './dll', file),
          publicPath: '',
          includeSourcemap: false,
          hash: true
        })
      )
    }
    // 如果是xxx.manifest.json文件
    if (/.*\.manifest.json/.test(file)) {
      plugins.push(
        new webpack.DllReferencePlugin({
          manifest: path.resolve(__dirname, './dll', file)
        })
      )
    }
  })
  return plugins;
}


module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name][hash:4].bundle.js',
  },
  plugins: makePlugins(),
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