const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: {
		app: './src/main.ts'
	},
	mode: 'production',
	devtool: 'inline-source-map',
	plugins: [
		new CleanWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /\.(ts|js)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	}
};