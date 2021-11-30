const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const database = require('./modules/database');
const app = express();
const stickesRouter = require('./routers/stickers-router')
const usuariosRouter = require('./routers/usuarios-router')
const conversacionesRouter = require('./routers/conversaciones-router')


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/stickers',stickesRouter);
app.use('/usuarios',usuariosRouter);
app.use('/conversaciones',conversacionesRouter);


app.listen(3000,()=>{
    console.log("servidor iniciado, puerto 3000.");
})