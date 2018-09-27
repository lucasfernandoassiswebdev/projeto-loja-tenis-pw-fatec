const vendaService = require("../services/VendaService");

exports.get = async (req, res) => {
    return await vendaService.get(req, res);
};

exports.getById = async (req, res) => {
    return await vendaService.getById(req, res);
};

exports.post = async (req, res) => {
    return await vendaService.post(req, res);
};

exports.delete = async (req, res) => {
    return await vendaService.delete(req, res);
};