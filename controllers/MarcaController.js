const marcaRepository = require("../repositories/MarcasRepository");
const marcaService = require("../services/MarcaService");

exports.get = async (req, res) => {
    return res.status(200).send(await marcaRepository.find());
};

exports.getById = async (req, res) => {
    var tenis = await marcaRepository.findById(req.params.id);

    if (tenis != null)
        return res.status(200).send(tenis);

    return res.status(404).send({ message: 'Marca não encontrada' });
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