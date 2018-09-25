const marcaRepository = require("../repositories/MarcaRepository");
const marcaService = require("../services/MarcaService");

exports.get = async (req, res) => {
    return await marcaService.get(req, res);
};

exports.getById = async (req, res) => {
    return await marcaService.getById(req, res);
};

exports.post = async (req, res) => {
    return await marcaService.post(req, res);
};

exports.put = async (req, res) => {
    return await marcaService.put(req, res);
}

exports.delete = async (req, res) => {
    return await marcaService.delete(req, res);
};