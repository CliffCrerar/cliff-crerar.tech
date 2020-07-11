const 
    $ = require,
    middleware = $('webpack-dev-middleware'),
    config = $('./webpack.config.js'),
    webpack = $('webpack'),
    express = $('express'),
    compiler = webpack(config),
    frontEnd = middleware(compiler),
    app = express().use(frontEnd).listen(3000);
