'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _status = require('../controllers/status');

var _status2 = _interopRequireDefault(_status);

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

////////////////////////////////////////
// ADFSUserMappingAPI
//
// Copyright (c) 2017 Jonathan Hardison
// /routes/index.js
////////////////////////////////////////

var router = (0, _express2.default)();

// wrapped db connection //
(0, _db2.default)(function (db) {
    // middleware //
    router.use((0, _middleware2.default)({ config: _config2.default, db: db }));

    // v1 //
    var v1Base = "/v1";

    router.use(v1Base + '/status', (0, _status2.default)({ config: _config2.default, db: db }));
    router.use(v1Base + '/user', (0, _user2.default)({ config: _config2.default, db: db }));
});

exports.default = router;
//# sourceMappingURL=index.js.map