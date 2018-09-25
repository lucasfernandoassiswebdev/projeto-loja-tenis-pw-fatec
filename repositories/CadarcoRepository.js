const mongoose = require("mongoose");
const Cadarco = mongoose.model("Cadarco");

exports.find = async () => {
    return await Cadarco.find({});
};

exports.findById = async (id, callback) => {
    return await Cadarco.findById(id, function (error, Cadarco) {
        if (callback != undefined)
            callback(error, Cadarco);

        return Cadarco;
    });
};

exports.findByName = async (name, callback) => {
    return await Cadarco.findOne({ nome: name }, function (error, cadarco) {
        if (typeof callback === "function")
            callback(error, cadarco);

        return cadarco;
    });
};

exports.findByNameLike = async name => {
    return await Cadarco.find({ nome: new RegExp('^' + name + '$', "i") });
};

exports.save = async (cadarco_data, callback) => {
    var cadarco = new Cadarco(cadarco_data);
    await cadarco.save(function (error) {
        if (typeof callback === "function")
            callback(error);
    });
};

exports.update = async (id, cadarco_data, callback) => {
    await Cadarco.findByIdAndUpdate(id, cadarco_data, function (error) {
        if (typeof callback === "function")
            callback(error);
    });
}

exports.delete = async id => {
    await Cadarco.findByIdAndRemove(id);
};