const usuarios = require('../models/usuarios');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


/* OBTENER TODOS LOS USUARIOS */

router.get("/",(req,res)=>{
    usuarios.find({},{nombre:true,imagen:true}).then(result =>{

        res.send(result);
        res.end();
    }).catch(e =>{
        res.send(e);
        res.end();
    })

});

/* OBTENER LOS CHATS DE UN USUARIO EN ESPECIFICO */

router.get("/:idUsuario/chats",(req,res)=>{
    usuarios.find({_id:req.params.idUsuario},{conversaciones:true}).then(result =>{
        res.send(result[0].conversaciones);
        res.end();
    }).catch(e =>{
        res.send(e);
        res.end();
    })

});


/* OBTENER LOS DATOS DE LOS CONTACTOS DE UN USUARIO */

router.get("/:idUsuario/contactos",(req,res)=>{
    usuarios.find({_id:req.params.idUsuario},{contactos:true}).then(result =>{

        let contacts =result[0].contactos;
        let dataContacts = [];

        usuarios.find({},{nombre:true,imagen:true}).then(results =>{
            
            for(let i=0;i<results.length;i++){
                if(contacts.includes(results[i]._id)){
                    dataContacts.push({nombre:results[i].nombre,imagen:results[i].imagen,_id:results[i]._id})
                }
            }
            
            res.send(dataContacts);
            res.end();
        }).catch(e =>{
            res.send({result:false});
            res.end();
        })

    }).catch(e =>{
        res.send({result:false});
        res.end();
    })

});


/* OBTENER LISTA DE USUARIOS QUE AUN NO SON CONTACTOS, PARA MOSTRARLOS EN LA MODAL Y PODER AGREGARSE
COMO NUEVO CONTACTO DE UN USUARIO. */

router.get("/:idUsuario/faltanAgregarContactos",(req,res)=>{
    usuarios.find({_id:req.params.idUsuario},{contactos:true}).then(result =>{

        let contacts =result[0].contactos;
        let dataContacts = [];

        usuarios.find({},{nombre:true,imagen:true}).then(results =>{
            
            for(let i=0;i<results.length;i++){
                if(!contacts.includes(results[i]._id)){
                    if(results[i]._id!=req.params.idUsuario){

                        dataContacts.push({nombre:results[i].nombre,imagen:results[i].imagen,_id:results[i]._id})
                    }
                }
            }
            res.send(dataContacts);
            res.end();

        }).catch(e =>{
            res.send({result:false});
            res.end();
        })

    }).catch(e =>{
        res.send({result:false});
        res.end();
    })
})

/* AGREGAR UN NUEVO CONTACTO */

router.put("/agregarContacto",(req,res)=>{
    usuarios.updateOne({_id:req.body.id},{$push:{contactos:req.body.idContacto}}).then(result =>{
        res.send({result:true});
        res.end();

    }).catch(e=>{
        res.send({result:false});
        res.end();
    })
})

module.exports= router;