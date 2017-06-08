'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _altid = require('../models/altid');

var _altid2 = _interopRequireDefault(_altid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    // general get from alternate email address input
    api.get('/:altemail', function (req, res) {
        _altid2.default.find({ email: req.params.altemail }, function (err, altid) {
            if (err) {
                res.status(500).send(err);
            }
            res.send(altid.realid);
        });
    });

    // general post to stage some users
    api.post('/', function (req, res) {
        var newUser = new _user2.default();
        newUser.realid = req.body.realid;

        newUser.save(function (err) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json({ message: "Real user created successfully" });
        });
    });

    // general post to stage some alt id's
    api.post('/altid/:realemail', function (req, res) {
        _user2.default.find({ realid: req.params.realemail }, function (err, user) {
            if (err) {
                res.status(500).send(err);
            }
            var newAltID = new _altid2.default();
            newAltID.email = req.body.email;
            newAltID.realid = user.id;

            newAltID.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).json({ message: "Alt ID created successfully" });
            });
        });
    });

    return api;
}; ////////////////////////////////////////
// ADFSUserMappingAPI
//
// Copyright (c) 2017 Jonathan Hardison
// /controllers/user.js
///////////////////////////////////////
//# sourceMappingURL=user.js.map