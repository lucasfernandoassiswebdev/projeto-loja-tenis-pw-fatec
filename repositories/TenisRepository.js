const mongoose = require("mongoose");
const Tenis = mongoose.model("Tenis");

exports.find = async (callback) => {
    return await Tenis.find({}, function (error, tenis) {
        if (typeof callback === "function")
            callback(error, tenis);

        return tenis;
    });
};

exports.findById = async (id, callback) => {
    return await Tenis.findById(id, function (error, tenis) {
        if (typeof callback === "function")
            callback(error, tenis);

        return tenis;
    });
};

exports.findByName = async (name, callback) => {
    return await Tenis.findOne({ nome: name }, function (error, tenis) {
        if (typeof callback === "function")
            callback(error, tenis);

        return tenis;
    });
};

exports.findByNameLike = async (name, callback) => {
    return await Tenis.find({ nome: new RegExp('^' + name + '$', "i") }, function (error, tenis) {
        if (typeof callback === "function")
            callback(error, tenis);
    });
};

exports.save = async (tenis_data, callback) => {
    var tenis = new tenis(tenis_data);
    await Tenis.save(function (error) {
        if (typeof callback === "function")
            callback(error);
    });
};

exports.update = async (id, tenis_data, callback) => {
    await Tenis.findById(id, function (error, tenis) {
        if (error)
            callback(error);

        tenis.nome = (tenis_data.nome != undefined && tenis_data.nome != null)
            ? tenis_data.nome
            : tenis.nome;
        tenis.marca = (tenis_data.marca != undefined && tenis_data.marca != null)
            ? tenis_data.marca
            : tenis.marca;
        tenis.tipo_cadarco = (tenis_data.tipo_cadarco != undefined && tenis_data.tipo_cadarco != null)
            ? tenis_data.tipo_cadarco
            : tenis.tipo_cadarco;
        tenis.tipo_sola = (tenis_data.tipo_sola != undefined && tenis_data.tipo_sola != null)
            ? tenis_data.tipo_sola
            : tenis.tipo_sola;
        tenis.estoque = (tenis_data.estoque != undefined && tenis_data.estoque != null)
            ? tenis_data.estoque
            : tenis.estoque;
        tenis.valor = (tenis_data.valor != undefined && tenis_data.valor != null)
            ? tenis_data.valor
            : tenis.valor;

        tenis.save(function (error) {
            callback(error);
        });
    });
}

exports.delete = async (id, callback) => {
    await Tenis.findOneAndRemove({ _id: id }, function (error) {
        callback(error);
    });
};