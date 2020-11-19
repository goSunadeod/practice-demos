var webpack = require('webpack')
var path = require('path')
var TerserPlugin = require('terser-webpack-plugin');


module.exports = {
  // 入口文件地址，不需要写完，会自动查找
  entry: path.join(__dirname, 'src/main.js'),
  output: {
    filename: 'webpack.bundle.js',
    path: path.resolve(__dirname, './')
  },
  // mode: 'development',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },
  optimization: {
    usedExports: true,
    // minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    })
  ]
}
