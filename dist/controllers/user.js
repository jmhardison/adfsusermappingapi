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
    api.get('/altid/email/:altemail', function (req, res) {
        _altid2.default.find({ email: req.params.altemail }, function (err, altid) {
            if (err) {
                res.status(500).send(err);
            }

            if (typeof altid !== "undefined" && altid.length > 0) {
                //adding CORS here, but need to refactor the middleware to support it with Next()
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

                _user2.default.findById(altid[0].user, function (err, user) {
                    if (err) {
                        res.status(500).send(err);
                    }

                    res.status(200).send(user.realid);
                });
            } else {
                res.status(200).send(req.params.altemail);
            }
        });
    });

    // general get from alternate email by id
    api.get('/altid/:id', function (req, res) {
        _altid2.default.findById(req.params.id, function (err, altid) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(altid.realid);
        });
    });

    // general get from real email address input
    api.get('/email/:realemail', function (req, res) {
        _user2.default.find({ realid: req.params.realemail }, function (err, user) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(user);
        });
    });

    // general get from real email address input with ID
    api.get('/:id', function (req, res) {
        _user2.default.findById(req.params.realemail, function (err, user) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(user);
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
    api.post('/altid/:realid', function (req, res) {
        _user2.default.findById(req.params.realid, function (err, user) {
            if (err) {
                res.status(500).send(err);
            }
            var newAltID = new _altid2.default();
            newAltID.email = req.body.email;
            newAltID.user = user.id;

            newAltID.save(function (err, altid) {
                if (err) {
                    res.status(500).send(err);
                }
                user.altids.push(newAltID);
                user.save(function (err) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(200).json({ message: "Alt ID created successfully" });
                });
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