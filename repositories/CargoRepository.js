const mongoose = require("mongoose");
const Cargo = mongoose.model("Cargo");

exports.find = async (callback) => {
    return await Cargo.find({}, function (error, cargos) {
        if (typeof callback === "function")
            callback(error, cargos);

        return cargos;
    });
};

exports.findById = async (id, callback) => {
    return await Cargo.findById(id, function (error, cargo) {
        if (typeof callback === "function")
            callback(error, cargo);

        return cargo;
    });
};

exports.findByName = async (name, callback) => {
    return await Cargo.findOne({ nome: name }, function (error, cargo) {
        if (typeof callback === "function")
            callback(error, cargo);

        return cargo;
    });
};

exports.findByNameLike = async (name, callback) => {
    return await Cargo.find({ nome: new RegExp('^' + name + '$', "i") }, function (error, cargos) {
        if (typeof callback === "function")
            callback(error, cargos);
    });
};

exports.save = async (cargo_data, callback) => {
    var cargo = new Cargo(cargo_data);
    await cargo.save(function (error) {
        if (typeof callback === "function")
            callback(error);
    });
};

exports.update = async (id, cargo_data, callback) => {
    await Cargo.findById(id, function (error, cargo) {
        if (error)
            callback(error);

            cargo.nome = cargo_data.nome;
            cargo.avaliacao_media = (cargo_data.avaliacao_media != undefined && cargo_data.avaliacao_media != null)
            ? cargo_data.avaliacao_media
            : cargo.avaliacao_media;

            cargo.save(function (error) {
            callback(error);
        });
    });
}

exports.delete = async (id, callback) => {
    await Cargo.findOneAndRemove({ _id: id }, function (error) {
        callback(error);
    });
};