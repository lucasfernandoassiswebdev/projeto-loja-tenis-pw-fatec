const cargoService = require("../services/CargoService");

exports.get = async (req, res) => {
    return await cargoService.get(req, res);
};

exports.getById = async (req, res) => {
    return await cargoService.getById(req, res);
};

exports.post = async (req, res) => {
    return await cargoService.post(req, res);
};

exports.put = async (req, res) => {
    return await cargoService.put(req, res);
}

exports.delete = async (req, res) => {
    return await cargoService.delete(req, res);
};