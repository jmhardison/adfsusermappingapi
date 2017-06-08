////////////////////////////////////////
// ADFSUserMappingAPI
//
// Copyright (c) 2017 Jonathan Hardison
// /routes/index.js
////////////////////////////////////////

import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDB from '../db';
import statusController from '../controllers/status';
import userController from '../controllers/user';

let router = express();

// wrapped db connection //
initializeDB(db => {
    // middleware //
    router.use(middleware({config, db}));

    // v1 //
    var v1Base = "/v1";
    
    router.use(`${v1Base}/status`, statusController({config, db}));
    router.use(`${v1Base}/user`, userController({config, db}));
    
    
});

export default router;