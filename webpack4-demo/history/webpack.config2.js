const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
    optimization: { // 优化项
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    mode: 'production',
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
      })
    ],
    module: {
        rules: [
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
