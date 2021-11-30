const stickers = require('../models/stickers');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


/* API PARA OBTENER STICKERS EXISTENTES */
router.get('/',(req,res)=>{

    stickers.find().then(result=>{
        res.send(result);
        res.end();
    }).catch(e =>{
        res.send(e);
        res.end();
    })
})














module.exports= router;