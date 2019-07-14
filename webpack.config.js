const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const config = require( path.join( __dirname, 'app.config.json' ) );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const ManifestPlugin = require( 'webpack-manifest-plugin' );
const webpack = require( 'webpack' );

module.exports = {
	mode: config.mode,
	entry: path.resolve( __dirname, config.Directories.entry ),
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					"style-loader", // creates style nodes from JS strings
					"css-loader", // translates CSS into CommonJS
					"sass-loader" // compiles Sass to CSS, using Node Sass by default
				]
			},
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] }, // css loader
			{ test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] }, // file loader
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
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	plugins: [
		new CleanWebpackPlugin(),
		new ManifestPlugin(),
		new HtmlWebpackPlugin( {
			title: config['Page title'],
			template: path.resolve( __dirname, config.Directories.public, 'index.html' )
		} ),
		new webpack.EnvironmentPlugin( {
			// define environment vars
		} ),
		new webpack.HotModuleReplacementPlugin( {
			// Options...
		} )
	],
	output: {
		filename: '[name].source.js',
		path: path.resolve( __dirname, 'dist' ),
		publicPath: config.publicPath
	}
};