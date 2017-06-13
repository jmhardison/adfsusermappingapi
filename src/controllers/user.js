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
    api.get('/altid/email/:altemail', (req, res) => {
        Altid.find({email: req.params.altemail}, (err, altid) =>{
            if(err){
                res.status(500).send(err);
            }

            if((typeof altid !== "undefined") && (altid.length > 0)){
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                
                User.findById(altid[0].user, (err, user) =>{
                    if(err){
                        res.status(500).send(err);
                    }
                    
                    res.status(200).send(user.realid);
                });
            }
            else{
                res.status(200).send(req.params.altemail);
            }
            
        }) 
    });

    // general get from alternate email by id
    api.get('/altid/:id', (req, res) => {
        Altid.findById(req.params.id, (err, altid) =>{
            if(err){
                res.status(500).send(err);
            }
            res.status(200).send(altid.realid);
        }) 
    });
    
    // general get from real email address input
    api.get('/email/:realemail', (req, res) => {
        User.find({realid: req.params.realemail}, (err, user) =>{
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(user);
        }) 
    });

    // general get from real email address input with ID
    api.get('/:id', (req, res) => {
        User.findById(req.params.realemail, (err, user) =>{
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(user);
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
    api.post('/altid/:realid', (req, res) => {
        User.findById(req.params.realid, (err, user) => {
            if(err){
                res.status(500).send(err);
            }
            let newAltID = new Altid();
            newAltID.email = req.body.email;
            newAltID.user = user.id;

            newAltID.save((err, altid) => {
            if(err){
                res.status(500).send(err);
            }
            user.altids.push(newAltID);
            user.save(err => {
                if(err){
                    res.status(500).send(err);
                }
                res.status(200).json({message: "Alt ID created successfully"});
                }); 
            });
        });
    });



    return api;
}