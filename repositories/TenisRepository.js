const mongoose = require("mongoose");
const Tenis = mongoose.model("Tenis");

exports.find = async () => {
    return await Tenis.find({});
};

exports.findById = async id => {
    return await Tenis.findById(id);
};

exports.create = async tenis_data => {
    var tenis = new Tenis(tenis_data);
    await tenis.save();
};

exports.delete = async id => {
    await Tenis.findOneAndRemove(id);
};