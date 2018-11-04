const funcionarioService = require("../services/FuncionarioService");

exports.get = async (req, res) => {
    return await funcionarioService.get(req, res);
};

exports.getById = async (req, res) => {
    return await funcionarioService.getById(req, res);
};

exports.post = async (req, res) => {
    return await funcionarioService.post(req, res);
};

exports.put = async (req, res) => {
    return await funcionarioService.put(req, res);
}

exports.delete = async (req, res) => {
    return await funcionarioService.delete(req, res);
};