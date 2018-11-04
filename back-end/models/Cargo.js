const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: true
    },
    nivel_hierarquico: { 
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Cargo', schema, 'cargos');
