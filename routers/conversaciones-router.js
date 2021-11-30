const conversaciones = require('../models/conversaciones');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


/* OBTENER CONVERSACION */

router.get('/:idConversacion',(req,res)=>{
    conversaciones.find({_id:req.params.idConversacion}).then(result =>{

        res.send(result[0]);
        res.end();
        
    }).catch(e =>{
        res.send({result:false});
        res.end();
    })
})

/* OBTENR TODAS LAS CONVERSACIONES */

router.get('/',(req,res)=>{
    conversaciones.find({}).then(result =>{
        res.send(result[0]);
        res.end();
    }).catch(e =>{
        res.send({result:false});
        res.end();
    })

})


/* GUARDAR NUEVO MENSAJE */

router.put('/nuevoMensaje',(req,res)=>{
    if(req.body.tipo == 'sticker'){

        conversaciones.updateOne({_id:req.body.idConversacion},{$push:{mensajes:{
            _id: mongoose.Types.ObjectId(),
            emisor: mongoose.Types.ObjectId(req.body.emisor),
            receptor: mongoose.Types.ObjectId(req.body.receptor),
            stiker:req.body.stiker,
            tipo:req.body.tipo,
            hora:req.body.hora,
        }}}).then(result =>{
    
            res.send({result:true});
            res.end();
    
        }).catch(e =>{
            res.send({result:false});
            res.end();
        })
        
    }else{

        conversaciones.updateOne({_id:req.body.idConversacion},{$push:{mensajes:{
            _id: mongoose.Types.ObjectId(),
            emisor: mongoose.Types.ObjectId(req.body.emisor),
            receptor: mongoose.Types.ObjectId(req.body.receptor),
            mensaje:req.body.mensaje,
            tipo:req.body.tipo,
            hora:req.body.hora,
        }}}).then(result =>{
    
            res.send({result:true});
            res.end();
    
        }).catch(e =>{
            res.send({result:false});
            res.end();
        })


    }


})

/* CONVERSACIONES ENTRE DOS USUARIOS CON SOLO TENER SUS IDS */
router.get('/usuarios/:idPrimerUsuario/:idSegundoUsuario',(req,res)=>{
    conversaciones.find({'emisor._id':mongoose.Types.ObjectId(req.params.idPrimerUsuario),'receptor._id':mongoose.Types.ObjectId(req.params.idSegundoUsuario)}).then(result =>{
        // console.log(result.length == 0);

        if(result.length == 0){
            conversaciones.find({'emisor._id':mongoose.Types.ObjectId(req.params.idSegundoUsuario),'receptor._id':mongoose.Types.ObjectId(req.params.idPrimerUsuario)}).then(reslt =>{

                res.send(reslt[0]);
                res.end();

            }).catch(e =>{

                res.send({result:false});
                res.end();
            })

        }
    }).catch(e =>{
        res.send({result:false});
        res.end();
    })
})










module.exports= router;