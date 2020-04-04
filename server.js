const $ = require;
const middleware = $('webpack-dev-middleware');
const config = $('./webpack.config.js');
const webpack = $('webpack');
const express = $('express');
const compiler = webpack(config);
const frontEnd = middleware(compiler);
const app = express().use(frontEnd).listen(3000);
