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
    }).populate('cargo');
};

exports.findByName = async (name, callback) => {
    return await Funcionario.findOne({ nome: name }, function (error, funcionario) {
        if (typeof callback === "function")
            callback(error, funcionario);

        return funcionario;
    });
};

exports.findByNameLike = async (name, callback) => {
    return await Funcionario.find({ nome: new RegExp('^' + name + '$', "i") }, function (error, funcionarios) {
        if (typeof callback === "function")
            callback(error, funcionarios);
    });
};

exports.findByCargo = async (id, callback) => {
    return await Funcionario.find({ cargo: id }, function (error, funcionarios) {
        if (typeof callback === "function")
            callback(error, funcionarios);

        return funcionarios;
    });
}

exports.findByCpf = async (cpf, callback) => {
    return await Funcionario.find({ cpf: cpf }, function (error, funcionarios) {
        if (typeof callback === "function")
            callback(error, funcionarios);

        return funcionarios;
    });
}

exports.save = async (funcionario_data, callback) => {
    var funcionario = new Funcionario(funcionario_data);
    await funcionario.save(function (error) {
        if (typeof callback === "function")
            callback(error);
    });
};

exports.update = async (id, funcionario_data, callback) => {
    await Funcionario.findById(id, function (error, funcionario) {
        if (error)
            callback(error);

        funcionario.nome = (funcionario_data.nome != undefined && funcionario_data.nome != null)
            ? funcionario_data.nome
            : funcionario.nome;
        funcionario.cpf = (funcionario_data.cpf != undefined && funcionario_data.cpf != null)
            ? funcionario_data.cpf
            : funcionario.cpf;
        funcionario.cargo = (funcionario_data.cargo != undefined && funcionario_data.cargo != null)
            ? funcionario_data.cargo
            : funcionario.cargo;

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