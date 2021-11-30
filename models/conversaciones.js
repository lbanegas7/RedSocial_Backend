const mongoose = require('mongoose');

const esquema = mongoose.Schema({
    emisor:Object,
    receptor:Object,
    ultimoMensaje:String,
    fechaConversacionn:String,
    mensajes:Array
});

module.exports = mongoose.model('conversaciones',esquema);