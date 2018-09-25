const cadarcoRepository = require("../repositories/CadarcoRepository");

exports.post = async (req, res) => {
    validateAndSave(req, false, function (error, exists) {
        if (error)
            return res.status(500).message({ message: 'Algo deu errado ao salvar o cadarço' });

        if (exists)
            return res.status(500).send({ message: 'Já existe um cadarço com este nome cadastrado!' });

        cadarcoRepository.save(req.body, function (error) {
            if (error)
                return res.status(500).message({ message: 'Algo deu errado ao salvar o cadarço' });

            return res.status(201).send();
        });
    });
};

exports.put = async (req, res) => {
    return await validateAndSave(req, true, function (error, exists) {
        if (error)
            return res.status(500).message({ message: 'Algo deu errado ao atualizar o cadarço' });

        if (!exists)
            return res.status(404).send({ message: 'Cadarço que está tentando ser editado não existe!' });

        cadarcoRepository.update(req.params.id, req.body, function (error) {
            if (error)
                return res.status(500).message({ message: 'Algo deu errado ao atualizar o cadarço' });

            return res.status(204).send();
        });
    });
}

exports.delete = async (req, res) => {
    return await validateAndSave(req, false, function (error, exists) {
        if (error)
            return res.status(500).message({ message: 'Algo deu errado ao excluir o cadarço' });

        if (!exists)
            return res.status(404).send({ message: 'cadarcç não existe!' });

        cadarcoRepository.delete(req.params.id);
        return res.status(204).send();
    });
};

async function validateAndSave(req, update, callback) {
    if (update) {
        await cadarcoRepository.findById(req.params.id, function (error, cadarco) {
            if (typeof callback === "function")
                callback(error, cadarco != null);
        });
    } else {
        await cadarcoRepository.findByName(req.body.nome, function (error, cadarco) {
            if (typeof callback === "function")
                callback(error, cadarco != null);
        });
    }
}
