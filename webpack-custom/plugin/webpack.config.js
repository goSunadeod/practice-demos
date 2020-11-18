const path = require('path');
// 引用自己的插件
const copyWebpackPlugin = require('./plugins/copyWebpackPlugin.js');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // new自己的插件
    new copyWebpackPlugin({
      name: 'sundae'
    })
  ]
}