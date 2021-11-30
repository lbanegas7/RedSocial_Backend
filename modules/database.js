var mongoose = require('mongoose');

var servidor = 'localhost:27017';
var db = 'whatsapp';

class DataBase {
    constructor() {
        mongoose.connect(`mongodb://${servidor}/${db}`)
            .then(() => {
                console.log(`Se conecto a la base de datos ${db}`);
            }).catch(error => {
                console.log(error);
                console.log('error al conectarse a la base de datos');
            });
    }
}

module.exports = new DataBase();