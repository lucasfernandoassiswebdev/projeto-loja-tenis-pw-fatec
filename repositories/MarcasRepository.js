const mongoose = require("mongoose");
const Marca = mongoose.model("Marca");

exports.find = async () => {
    return await Marca.find({});
};

exports.findById = async (id, callback) => {
    return await Marca.findById(id, function (error, marca) {
        if (callback != undefined)
            callback(marca);

        return marca;
    });
};

exports.findByName = async (name, callback) => {
    return await Marca.findOne({ nome: name }, function (error, marca) {
        if (typeof callback === "function")
            callback(marca);

        return marca;
    });
};

exports.findByNameLike = async name => {
    return await Marca.find({ nome: new RegExp('^' + name + '$', "i") });
};

exports.save = async (marca_data, callback) => {
    var marca = new Marca(marca_data);
    await marca.save(function () {
        if (typeof callback === "function")
            callback();
    });
};

exports.update = async (id, marca_data, callback) => {
    await Marca.findByIdAndUpdate(id, marca_data, function () {
        if (typeof callback === "function")
            callback();
    });
}

exports.delete = async id => {
    await Marca.findByIdAndRemove(id);
};