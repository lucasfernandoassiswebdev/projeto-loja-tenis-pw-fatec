const mongoose = require("mongoose");
const Marca = mongoose.model("Marca");

exports.find = async (callback) => {
    return await Marca.find({}, function (error, marcas) {
        if (typeof callback === "function")
            callback(error, marcas);

        return marcas;
    });
};

exports.findById = async (id, callback) => {
    return await Marca.findById(id, function (error, marca) {
        if (typeof callback === "function")
            callback(error, marca);

        return marca;
    });
};

exports.findByName = async (name, callback) => {
    return await Marca.findOne({ nome: name }, function (error, marca) {
        if (typeof callback === "function")
            callback(error, marca);

        return marca;
    });
};

exports.findByNameLike = async (name, callback) => {
    return await Marca.find({ nome: new RegExp('^' + name + '$', "i") }, function (error, marcas) {
        if (typeof callback === "function")
            callback(error, marcas);
    });
};

exports.save = async (marca_data, callback) => {
    var marca = new Marca(marca_data);
    await marca.save(function (error) {
        if (typeof callback === "function")
            callback(error);
    });
};

exports.update = async (id, marca_data, callback) => {
    await Marca.findById(id, function (error, marca) {
        if (error)
            callback(error);

        marca.nome = (marca_data.nome != undefined && marca_data.nome != null)
            ? marca_data.nome
            : marca.nome;
        marca.avaliacao_media = (marca_data.avaliacao_media != undefined && marca_data.avaliacao_media != null)
            ? marca_data.avaliacao_media
            : marca.avaliacao_media;

        marca.save(function (error) {
            callback(error);
        });
    });
}

exports.delete = async (id, callback) => {
    await Marca.findOneAndRemove({ _id: id }, function (error) {
        callback(error);
    });
};