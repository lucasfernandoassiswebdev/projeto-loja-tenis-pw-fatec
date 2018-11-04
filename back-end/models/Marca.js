const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: true
    }, 
    avaliacao_media: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Marca', schema, 'marcas');
