const mongoose = require("mongoose");
const Funcionario = mongoose.model("Funcionario");

exports.find = async () => {
    return await Funcionario.find({});
};

exports.findById = async id => {
    return await Funcionario.findById(id);
};

exports.create = async funcionario_data => {
    var funcionario = new Funcionario(funcionario_data);
    await funcionario.save();
};

exports.delete = async id => {
    await Funcionario.findOneAndRemove(id);
};