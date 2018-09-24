const mongoose = require("mongoose");
const Venda = mongoose.model("Venda");

exports.find = async () => {
    return await Venda.find({});
};

exports.findById = async id => {
    return await Venda.findById(id);
};

exports.create = async venda_data => {
    var venda = new Venda(venda_data);
    await venda.save();
};

exports.delete = async id => {
    await Venda.findOneAndRemove(id);
};