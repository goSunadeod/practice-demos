// webpack 是 node 写出来的node写法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    devServer: { // 开发服务配置
        port: 3000,
        progress: true, //进度条
        contentBase: './build', //文件路径
        compress: true, // 采用gzip压缩
    },
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash:8].js', //打包后的文件名
        path: path.resolve(__dirname, 'build')// 路径必须是绝对路径
    },
    plugins: [ // 数组放着所有的webpack插件
     new HtmlWebpackPlugin({
         template: './src/index.html', //模板
         filename: "index.html", // 输出名
         minify: {
             removeAttributeQuotes: true, // 忽略引号
             collapseWhitespace: true, //折叠一行
         },
         hash: true
     })
    ]
}
