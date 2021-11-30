const mongoose = require('mongoose');

const esquema = mongoose.Schema({
    sticker:String
});

module.exports = mongoose.model('stickers',esquema);