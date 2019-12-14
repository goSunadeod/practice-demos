const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
     new HtmlWebpackPlugin({
         template: './src/index.html',
         filename: "index.html",
     }),
      new MiniCssExtractPlugin({
          filename: '[name].css'
      }),
      // new webpack.ProvidePlugin({
      //     $: 'jquery' // 在每个模块中都注入dev
      // })
    ],
    // externals: {
    //    jquery: '$'
    // },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'eslint-loader',
            //         options: {
            //             enforce: 'pre' // previous post(pre 普通之前)
            //         }
            //     }
            // },
            {
                test: /\.js$/, // normal 普通的loader
                use: {
                    loader: 'babel-loader',
                    options: { // 用babel-loader 需要把es6-es5
                        presets: [
                          '@babel/preset-env',
                        ],
                        plugins: [
                           ["@babel/plugin-proposal-decorators", { "legacy": true }],
                           ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                            "@babel/plugin-transform-runtime"
                        ]
                    },
                },
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/, use: [
                    MiniCssExtractPlugin.loader,
                  'css-loader',
                  'postcss-loader'
                ]
            },
            {
                test: /\.less$/, use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                     'postcss-loader',
                    'less-loader',
                ]
            }
        ]
    }
}
