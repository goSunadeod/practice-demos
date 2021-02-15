const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
  mode: 'development',  // production Or development 环境
  entry: "./main.js", // 入口文件
  output: {
    path: path.resolve(__dirname, "dist"), // 必须是绝对路径
    filename: "js/[name].[hash].js", // 「入口分块(entry chunk)」的文件名模板（出口分块？）
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true, // 压缩
    port: 8080,
    hot: true, // 热加载
    open: false, //自定打开默认浏览器
  },
  plugins: [ // 插件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      minify: true, //压缩
      hash: false, //添加hash清除缓存
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: path.resolve(__dirname, 'node_modules') // 排除文件
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
		          limit: 10000
            }
          }
        ]
      }
    ]
  },
}