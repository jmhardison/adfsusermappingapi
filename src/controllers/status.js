////////////////////////////////////////
// ADFSUserMappingAPI
//
// Copyright (c) 2017 Jonathan Hardison
// /controllers/status.js
///////////////////////////////////////

import mongoose from 'mongoose';
import express from 'express';
import {Router} from 'express';


export default({ config, db}) => {
    let api = Router();
    
    // general
    api.get('/', (req, res) => {
        res.json({status: "running"});
    });
    
    return api;
}