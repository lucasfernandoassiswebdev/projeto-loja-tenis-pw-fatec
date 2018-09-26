const cadarcoService = require("../services/CadarcoService");

exports.get = async (req, res) => {
    return await cadarcoService.get(req, res);
};

exports.getById = async (req, res) => {
    return await cadarcoService.getById(req, res);
};

exports.post = async (req, res) => {
    return await cadarcoService.post(req, res);
};

exports.put = async (req, res) => {
    return await cadarcoService.put(req, res);
}

exports.delete = async (req, res) => {
    return await cadarcoService.delete(req, res);
};