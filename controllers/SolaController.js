const solaService = require("../services/SolaService");

exports.get = async (req, res) => {
    return await solaService.get(req, res);
};

exports.getById = async (req, res) => {
    return await solaService.getById(req, res);
};

exports.post = async (req, res) => {
    return await solaService.post(req, res);
};

exports.put = async (req, res) => {
    return await solaService.put(req, res);
}

exports.delete = async (req, res) => {
    return await solaService.delete(req, res);
};