const tenisService = require("../services/TenisService");

exports.get = async (req, res) => {
    return await tenisService.get(req, res);
};

exports.getById = async (req, res) => {
    return await tenisService.getById(req, res);
};

exports.post = async (req, res) => {
    return await tenisService.post(req, res);
};

exports.put = async (req, res) => {
    return await tenisService.put(req, res);
}

exports.delete = async (req, res) => {
    return await tenisService.delete(req, res);
};