const mongoose = require("mongoose");
const Venda = mongoose.model("Venda");

exports.find = async (callback) => {
    return await Venda.find({})
        .populate({
            path: 'funcionario',
            populate: {
                path: 'cargo',
                model: 'Cargo'
            }
        })
        .exec(function (error, vendas) {
            if (typeof callback === "function")
                callback(error, vendas);

            return vendas;
        });
};

exports.findById = async (id, callback) => {
    return await Venda.findById(id)
        .populate({
            path: 'funcionario',
            populate: {
                path: 'cargo',
                model: 'Cargo'
            }
        })
        .populate('tenis_venda.tenis')
        .populate({
            path: 'tenis_venda.tenis',
            populate: {
                path: 'marca',
                model: 'Marca'
            }
        })
        .populate({
            path: 'tenis_venda.tenis',
            populate: {
                path: 'tipo_cadarco',
                model: 'Cadarco'
            }
        })
        .populate({
            path: 'tenis_venda.tenis',
            populate: {
                path: 'tipo_sola',
                model: 'Sola'
            }
        })
        .exec(function (error, venda) {
            if (typeof callback === "function")
                callback(error, venda);

            return venda;
        });
};

exports.findByName = async (name, callback) => {
    return await Venda.findOne({ nome: name }, function (error, venda) {
        if (typeof callback === "function")
            callback(error, venda);

        return venda;
    });
};

exports.findByNameLike = async (name, callback) => {
    return await Venda.find({ nome: new RegExp('^' + name + '$', "i") }, function (error, vendas) {
        if (typeof callback === "function")
            callback(error, vendas);
    });
};

exports.findByFuncionario = async (idFuncionario, callback) => {
    return await Venda.find({ funcionario: idFuncionario }, function (error, vendas) {
        if (typeof callback === "function")
            callback(error, vendas);
    });
}

exports.save = async (venda_data, callback) => {
    var venda = new Venda(venda_data);
    await venda.save(function (error) {
        if (typeof callback === "function")
            callback(error);
    });
};

exports.update = async (id, venda_data, callback) => {
    await Venda.findById(id, function (error, venda) {
        if (error)
            callback(error);

        venda.data = (venda_data.data != undefined && venda_data.data != null)
            ? venda_data.data
            : venda.data;
        venda.funcionario = (venda_data.funcionario != undefined && venda_data.funcionario != null)
            ? venda_data.funcionario
            : venda.funcionario;
        venda.tenis_venda = (venda_data.tenis_venda != undefined && venda_data.tenis_venda != null)
            ? venda_data.tenis_venda
            : venda.tenis_venda;

        venda.save(function (error) {
            callback(error);
        });
    });
}

exports.delete = async (id, callback) => {
    await Venda.findOneAndRemove({ _id: id }, function (error) {
        callback(error);
    });
};