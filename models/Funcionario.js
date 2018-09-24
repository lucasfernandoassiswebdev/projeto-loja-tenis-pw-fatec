const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: Number,
        required: true
    },
    cargo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cargo"
    }
});

module.exports = mongoose.model('Funcionario', schema, 'funcionarios');
