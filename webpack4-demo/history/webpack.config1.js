// webpack 是 node 写出来的node写法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash:8].js', //打包后的文件名
        path: path.resolve(__dirname, 'build')// 路径必须是绝对路径
    },
    plugins: [ // 数组放着所有的webpack插件
     new HtmlWebpackPlugin({
         template: './src/index.html', //模板
         filename: "index.html",
         minify: {
             removeAttributeQuotes: true,
             collapseWhitespace: true,
         },
         hash: true
     })
    ],
    module: { // 模块
        // loader
        rules: [ // 规则 css-loader,解析@import 这种语法
          // style-loader 把css插入到header标签
          // loader的特点 希望单一
          // loader的顺序 默认从右向左执行 从下到上执行
          // 也可以对象形式 会额外传递参数
            {
                // 也可以处理less
                test: /\.css$/, use: [
                    {
                        loader: 'style-loader',
                        options: {
                            // insert: 'top'
                        }
                    },
                  'css-loader'
                ]
            },
            {
                // 也可以处理less
                test: /\.less$/, use: [
                    {
                        loader: 'style-loader',
                        options: {
                            // insert: 'top'
                        }
                    },
                    'css-loader',
                    'less-loader',
                ]
            }
        ]
    }
}
