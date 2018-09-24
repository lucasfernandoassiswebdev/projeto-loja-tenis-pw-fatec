const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    data: {
        type: Date,
        required: true,
        default: Date.now()
    },
    funcionario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Funcionario"
    },
    tenis_venda: [{
        tenis: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Funcionario"
        }
    }
    ]
});

module.exports = mongoose.model('Venda', schema, 'vendas');
