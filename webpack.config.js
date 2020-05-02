const
	path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	config = require(path.join(__dirname, 'app.config.json')),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	ManifestPlugin = require('webpack-manifest-plugin'),
	os = require('os'),
	webpack = require('webpack'),
	CopyPlugin = require('copy-webpack-plugin');

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
module.exports ={
	
	// const development = env.NODE_ENV === 'development'
	
		mode: 'development',
		entry: path.resolve(__dirname, config.Directories.entry),
		devtool: 'inline-source-map',
		module: {
			rules: [{
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
					loader: 'html-loader',
					options: {
						minimize: true,
						removeComments: true,
						collapseWhitespace: true
					}
				}]
			},
			{ test: /\.md$/, use: [{ loader: "html-loader" }, { loader: "markdown-loader", options: { /* your options here */ } }] }
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
				favicon: "./public/favicon.ico"
				// favicon: "https://cdn-cloudflare.ga/assets/own-logo/Own-icon-5.png"
			}),
			new webpack.HotModuleReplacementPlugin({
				// Options...
			}),
			new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
			new webpack.EnvironmentPlugin({
				DEV: this.mode,
				NODE_PATH: ['./', './src'].join(os.platform() === 'win32', ';', ':')
			}),
			new CopyPlugin([
				{ from: './public/sitemap.xml', to: './sitemap.xml' }
				// { from: './api/sitemap.js', to: './api/sitemap.js' }
				// { from: 'other', to: 'public' },
			])
		],
		output: {
			filename: '[name].source.[hash].js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: config.publicPath
		}
	
};
