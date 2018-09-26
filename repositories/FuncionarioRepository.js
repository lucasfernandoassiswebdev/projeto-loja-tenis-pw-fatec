const mongoose = require("mongoose");
const Funcionario = mongoose.model("Funcionario");

exports.find = async (callback) => {
    return await Funcionario.find({}, function (error, funcionarios) {
        if (typeof callback === "function")
            callback(error, funcionarios);

        return funcionarios;
    });
};

exports.findById = async (id, callback) => {
    return await Funcionario.findById(id, function (error, funcionario) {
        if (typeof callback === "function")
            callback(error, funcionario);

        return funcionario;
    });
};

exports.findByName = async (name, callback) => {
    return await Funcionario.findOne({ nome: name }, function (error, funcionario) {
        if (typeof callback === "function")
            callback(error, funcionario);

        return funcionario;
    });
};

exports.findByCargo = async (id, callback) => {
    return await Funcionario.find({ cargo: id }, function (error, funcionarios) {
        if (typeof callback === "function")
            callback(error, funcionario);

        return funcionarios;
    });
}

exports.findByNameLike = async (name, callback) => {
    return await Funcionario.find({ nome: new RegExp('^' + name + '$', "i") }, function (error, funcionarios) {
        if (typeof callback === "function")
            callback(error, funcionarios);
    });
};

exports.save = async (funcionario_data, callback) => {
    var funcionario = new funcionario(funcionario_data);
    await funcionario.save(function (error) {
        if (typeof callback === "function")
            callback(error);
    });
};

exports.update = async (id, funcionario_data, callback) => {
    await Funcionario.findById(id, function (error, funcionario) {
        if (error)
            callback(error);

        funcionario.nome = funcionario_data.nome;
        funcionario.avaliacao_media = (funcionario_data.avaliacao_media != undefined && funcionario_data.avaliacao_media != null)
            ? funcionario_data.avaliacao_media
            : Funcionario.avaliacao_media;

        funcionario.save(function (error) {
            callback(error);
        });
    });
}

exports.delete = async (id, callback) => {
    await Funcionario.findOneAndRemove({ _id: id }, function (error) {
        callback(error);
    });
};