const express = require('express');

app = express();

app.use('./',express.static('./dist'));

app.listen();