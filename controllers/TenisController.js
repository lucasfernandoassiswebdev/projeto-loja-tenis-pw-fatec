const tenisRepository = require("../repositories/TenisRepository");
const tenisService = require("../services/TenisService");

exports.get = async (req, res, next) => {
    return res.status(200).send(await tenisRepository.get());
};

exports.getById = async (req, res, next) => {
    var tenis = await tenisRepository.getById(req.params.id);

    if (tenis != null)
        return res.status(200).send(tenis);

    return res.status(404).send('Tênis não encontrado');
};

exports.post = async (req, res, next) => {
    await tenisRepository.create({
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password + global.SALT_KEY),
        roles: ["user"]
    });

    res.status(201).send({
        message: "Cliente cadastrado com sucesso!"
    });
};

exports.delete = async (req, res, next) => {
    try {
        res.status(200).send(await customerRepository.delete(req.params.id));
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
};