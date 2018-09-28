const mongoose = require("mongoose");
const Venda = mongoose.model("Venda");

exports.find = async (callback) => {
    return await Venda.find({}, function (error, vendas) {
        if (typeof callback === "function")
            callback(error, vendas);

        return vendas;
    });
};

exports.findById = async (id, callback) => {
    return await Venda.findById(id, function (error, venda) {
        if (typeof callback === "function")
            callback(error, venda);

        return venda;
    }).populate('funcionario tenis_venda.tenis');
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

exports.delete = async (id, callback) => {
    await Venda.findOneAndRemove({ _id: id }, function (error) {
        callback(error);
    });
};