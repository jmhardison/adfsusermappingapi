////////////////////////////////////////
// ADFSUserMappingAPI
//
// Copyright (c) 2017 Jonathan Hardison
// /controllers/user.js
///////////////////////////////////////

import mongoose from 'mongoose';
import express from 'express';
import {Router} from 'express';
import User from '../models/user';
import Altid from '../models/altid';


export default({ config, db}) => {
    let api = Router();
    
    // general get from alternate email address input
    api.get('/:altemail', (req, res) => {
        Altid.find({email: req.params.altemail}, (err, altid) =>{
            if(err){
                res.status(500).send(err);
            }
            res.send(altid.realid);
        }) 
    });
    

    // general post to stage some users
    api.post('/', (req, res) => {
        let newUser = new User();
        newUser.realid = req.body.realid;

        newUser.save(err => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json({message: "Real user created successfully"});
        });
    });

    // general post to stage some alt id's
    api.post('/altid/:realemail', (req, res) => {
        User.find({realid: req.params.realemail}, (err, user) => {
            if(err){
                res.status(500).send(err);
            }
            let newAltID = new Altid();
            newAltID.email = req.body.email;
            newAltID.realid = user.id;

            newAltID.save(err => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json({message: "Alt ID created successfully"});
        });

        })
        
    });



    return api;
}