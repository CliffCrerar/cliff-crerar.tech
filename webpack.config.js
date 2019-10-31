const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require(path.join(__dirname, 'app.config.json'));
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

module.exports = (env) => {
	console.log('env', env);
	const development = env.NODE_ENV === 'development'
	return {
		mode: config.mode,
		entry: path.resolve(__dirname, config.Directories.entry),
		devtool: 'inline-source-map',
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				  },
				{
					test: /\.scss$/,
					use: [
						"style-loader", // creates style nodes from JS strings
						"css-loader", // translates CSS into CommonJS
						"sass-loader" // compiles Sass to CSS, using Node Sass by default
					]
				},
				{
					test: /\.svg$/,
					loader: 'svg-inline-loader'
				},
				{ test: /\.css$/, use: ['style-loader', 'css-loader'] }, // css loader
				{ test: /\.(png|jpeg|jpg|gif)$/, use: ['file-loader'] }, // file loader
				{ test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] }, // font loader
				{ test: /\.(csv|tsv)$/, use: ['csv-loader'] }, // csv loader
				{ test: /\.xml$/, use: ['xml-loader'] }, // xml loader
				{
					test: /\.html$/,
					use: [{
						loader: 'html-loader'
						// options: {
						//  minimize: ,
						//  removeComments: ,
						//  collapseWhitespace: "
						// }
					}]
				},
				{ test: /\.md$/, use: [{ loader: "html-loader" }, { loader: "markdown-loader", options: {/* your options here */ } }] }
			]
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js']
		},
		plugins: [
			new CleanWebpackPlugin(),
			new ManifestPlugin(),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, config.Directories.public, 'index.html'),
				favicon: "./favicon.png"
				// favicon: "https://cdn-cloudflare.ga/assets/own-logo/Own-icon-5.png"
			}),
			new webpack.HotModuleReplacementPlugin({
				// Options...
			}),
			// new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV) }),
			new webpack.EnvironmentPlugin({
				DEV: development
			})
		],
		output: {
			filename: '[name].source.js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: config.publicPath
		}
	}
};