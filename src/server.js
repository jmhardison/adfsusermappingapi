////////////////////////////////////////
// ADFSUserMappingAPI
//
// Copyright (c) 2017 Jonathan Hardison
////////////////////////////////////////

import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';

import config from './config';
import routes from './routes';

// consts //
let app = express();
app.server = http.createServer(app);

// middleware //
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'sts.simd.today');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(bodyParser.json({
    limit: config.bodyLimit
}));

app.use(allowCrossDomain);

// all routes and versions in routes //
app.use('/', routes);

// listen and binding setup //
app.server.listen(config.port);
console.log(`Started API Service on port: ${app.server.address().port}`);

export default app;