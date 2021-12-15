const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (env, argv) => {
	const isDevMode = argv.mode === 'development'

	return {
		context: __dirname,
		entry: ['./client/index.js'],
		target: 'web',
		output: {
			path: path.resolve(__dirname, 'server/public'),
			publicPath: '/',
			filename: 'bundle.js',
		},
		resolve: {
			modules: ['node_modules'],
			extensions: ['.ts', '.tsx', '.js', '.jsx'],
			alias: {
				'@': path.resolve(__dirname, 'client'),
			},
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx|js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
					},
				},
				{
					test: /\.html$/,
					use: {
						loader: 'html-loader',
					},
				},
			],
		},
		plugins: [
			new HtmlPlugin({
				template: path.resolve(__dirname, 'client/index.html'),
				inject: true,
				publicPath: '/',
			}),
			...(isDevMode
				? []
				: [
						new CopyPlugin({
							patterns: [{ from: 'client/robots.txt' }],
						}),
						new CompressionPlugin({
							test: /\.(js|css|html)$/,
						}),
						new BrotliPlugin({
							test: /\.(js|css|html)$/,
						}),
				  ]),
		],
		// devServer: {
		// 	contentBase: path.join(__dirname, 'public'),
		// 	compress: true,
		// 	hotOnly: true,
		// 	historyApiFallback: true,
		// 	proxy: {
		// 		'/api': {
		// 			target: 'https://services-intouchg-api-1-0-1.intouch.intouch-preview.com',
		// 			changeOrigin: true,
		// 			secure: false,
		// 		},
		// 	},
		// },
		optimization: {
			minimize: !isDevMode,
		},
		performance: {
			hints: !isDevMode ? 'warning' : false,
		},
		stats: 'normal',
		// Enable devtool: 'source-map' for better debugging but much slower builds
		// devtool: 'source-map',
		devtool: false,
	}
}
