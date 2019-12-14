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
          filename: 'main.css'
      }),
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                // use: 'file-loader'
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        outputPath: 'img/'
                    }
                },
            },
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
