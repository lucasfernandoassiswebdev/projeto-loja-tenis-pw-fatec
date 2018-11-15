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
        enum: ["Algodão", "Poliester", "Elástico", "Outro"],
        default: "Algodão"
    },
    valor: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Cadarco', schema, 'cadarcos');
