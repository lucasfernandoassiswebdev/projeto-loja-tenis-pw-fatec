const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: true
    },
    marca: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Marca"
    },
    tipo_cadarco: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cadarco"
    },
    tipo_sola: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sola"
    },
    estoque: [{
        tamanho: {
            type: Number,
            required: true
        },
        quantidade_disponivel: {
            type: Number,
            required: true
        }
    }],
    valor: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Tenis', schema, 'tenis');
