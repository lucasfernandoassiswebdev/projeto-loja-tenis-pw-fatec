const mongoose = require("mongoose");
const Cargo = mongoose.model("Cargo");

exports.find = async () => {
    return await Cargo.find({});
};

exports.findById = async id => {
    return await Cargo.findById(id);
};

exports.create = async cargo_data => {
    var cargo = new Cargo(cargo_data);
    await cargo.save();
};

exports.delete = async id => {
    await Cargo.findOneAndRemove(id);
};