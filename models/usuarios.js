const mongoose = require('mongoose');
const conversaciones = require('./conversaciones');

const esquema = mongoose.Schema({
    nombre:String,
    imagen:String,
    contactos:Array,
    conversaciones:Array
});

module.exports = mongoose.model('usuarios',esquema);