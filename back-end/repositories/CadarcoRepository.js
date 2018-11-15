const mongoose = require("mongoose");
const Cadarco = mongoose.model("Cadarco");

exports.find = async (callback) => {
    return await Cadarco.find({}, function (error, cadarcos) {
        if (typeof callback === "function")
            callback(error, cadarcos);

        return cadarcos;
    });
};

exports.findById = async (id, callback) => {
    return await Cadarco.findById(id, function (error, cadarco) {
        if (typeof callback === "function")
            callback(error, cadarco);

        return cadarco;
    });
};

exports.findByName = async (name, callback) => {
    return await Cadarco.findOne({ nome: name }, function (error, cadarco) {
        if (typeof callback === "function")
            callback(error, cadarco);

        return cadarco;
    });
};

exports.findByNameLike = async (name, callback) => {
    return await Cadarco.find({ nome: new RegExp('^' + name + '$', "i") }, function (error, cadarcos) {
        if (typeof callback === "function")
            callback(error, cadarcos);
    });
};

exports.save = async (cadarco_data, callback) => {
    var cadarco = new Cadarco(cadarco_data);
    await cadarco.save(function (error) {
        if (typeof callback === "function")
            callback(error);
    });
};

exports.update = async (id, cadarco_data, callback) => {
    await Cadarco.findById(id, function (error, cadarco) {
        if (error)
            callback(error);

        cadarco.nome = (cadarco_data.nome != undefined && cadarco_data.nome != null)
            ? cadarco_data.nome
            : cadarco.nome;
        cadarco.material = (cadarco_data.material != undefined && cadarco_data.material != null)
            ? cadarco_data.material
            : cadarco.material;
        cadarco.valor = (cadarco_data.valor != undefined && cadarco_data.valor != null)
            ? cadarco_data.valor
            : cadarco.valor;

        cadarco.save(function (error) {
            callback(error);
        });
    });
}

exports.delete = async (id, callback) => {
    await Cadarco.findOneAndRemove({ _id: id }, function (error) {
        callback(error);
    });
};