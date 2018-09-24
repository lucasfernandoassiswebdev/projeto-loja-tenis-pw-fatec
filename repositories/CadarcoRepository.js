const mongoose = require("mongoose");
const Cadarco = mongoose.model("Cadarco");

exports.find = async () => {
    return await Cadarco.find({});
};

exports.findById = async id => {
    return await Cadarco.findById(id);
};

exports.create = async cadarco_data => {
    var cadarco = new Cadarco(cadarco_data);
    await cadarco.save();
};

exports.delete = async id => {
    await Cadarco.findOneAndRemove(id);
};