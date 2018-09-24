const marcaRepository = require("../repositories/MarcasRepository");

exports.post = async (req, res) => {
    validateAndSave(req, false, function (exists) {
        if (exists)
            return res.status(500).send({ message: 'Já existe uma marca com este nome cadastrada!' });

        marcaRepository.save(req.body, function () {
            return res.status(201).send();
        });
    });
};

exports.put = async (req, res) => {
    return await validateAndSave(req, true, function (exists) {
        if (!exists)
            return res.status(404).send({ message: 'Marca que está tentando ser editada não existe!' });

        marcaRepository.update(req.params.id, req.body, function () {
            return res.status(204).send();
        });
    });
}

exports.delete = async (req, res) => {
    return await validateAndSave(req, false, function (exists) {
        if (!exists)
            return res.status(404).send({ message: 'Marca não existe!' });

        marcaRepository.delete(req.params.id);
        return res.status(204).send();
    });
};

async function validateAndSave(req, update, callback) {
    if (update) {
        await marcaRepository.findById(req.params.id, function (marca) {
            if (typeof callback === "function")
                callback(marca != null);
        });
    } else {
        await marcaRepository.findByName(req.body.nome, function (marca) {
            if (typeof callback === "function")
                callback(marca != null);
        });
    }
}
