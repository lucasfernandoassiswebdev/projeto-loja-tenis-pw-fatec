const mongoose = require("mongoose");
const Sola = mongoose.model("Sola");

exports.find = async (callback) => {
    return await Sola.find({}, function (error, solas) {
        if (typeof callback === "function")
            callback(error, solas);

        return solas;
    });
};

exports.findById = async (id, callback) => {
    return await Sola.findById(id, function (error, sola) {
        if (typeof callback === "function")
            callback(error, sola);

        return sola;
    });
};

exports.findByName = async (name, callback) => {
    return await Sola.findOne({ nome: name }, function (error, sola) {
        if (typeof callback === "function")
            callback(error, sola);

        return sola;
    });
};

exports.findByNameLike = async (name, callback) => {
    return await Sola.find({ nome: new RegExp('^' + name + '$', "i") }, function (error, solas) {
        if (typeof callback === "function")
            callback(error, solas);
    });
};

exports.save = async (sola_data, callback) => {
    var sola = new Sola(sola_data);
    await sola.save(function (error) {
        if (typeof callback === "function")
            callback(error);
    });
};

exports.update = async (id, sola_data, callback) => {
    await Sola.findById(id, function (error, sola) {
        if (error)
            callback(error);

        sola.nome = (sola_data.nome != undefined && sola_data.nome != null)
            ? sola_data.nome
            : Sola.nome;
        sola.material = (sola_data.material != undefined && sola_data.material != null)
            ? sola_data.material
            : Sola.material;
        sola.durabilidade_media = (sola_data.durabilidade_media != undefined && sola_data.durabilidade_media != null)
            ? sola_data.durabilidade_media
            : Sola.durabilidade_media;
        sola.valor = (sola_data.valor != undefined && sola_data.valor != null)
            ? sola_data.valor
            : Sola.valor;

        sola.save(function (error) {
            callback(error);
        });
    });
}

exports.delete = async (id, callback) => {
    await Sola.findOneAndRemove({ _id: id }, function (error) {
        callback(error);
    });
};