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
    tamanhos_disponiveis: {
        type: Number,
        required: true,
        enum: [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
        default: 38
    },
    valor: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Tenis', schema, 'tenis');
