const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true,
        enum: ["Couro", "Borracha", "Outro"],
        default: "Borracha"
    },
    durabilidade_media: { //meses
        type: Number,
        required: false
    },
    valor: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Sola', schema, 'solas');
