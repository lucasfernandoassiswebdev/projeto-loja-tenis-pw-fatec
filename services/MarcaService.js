const marcaRepository = require("../repositories/MarcaRepository");

exports.get = async (req, res) => {
    return await marcaRepository.find(function (error, marcas) {
        treatError(error, 500, 'Algo deu errado ao buscar as marcas cadastradas', function (goWrong, error_code, error_message) {
            if (goWrong)
                return res.status(error_code).send({ message: error_message });

            return res.status(200).send(marcas);
        });
    });
}

exports.getById = async (req, res) => {
    return await marcaRepository.findById(req.params.id, function (error, marca) {
        if (marca == null)
            treatError(true, 404, 'Marca buscada não existe', function (goWrong, error_code, error_message) {
                if (goWrong)
                    return res.status(error_code).send({ message: error_message });
            });
        else
            treatError(error, 500, 'Algo deu errado ao buscar a marca', function (goWrong, error_code, error_message) {
                if (goWrong)
                    return res.status(error_code).send({ message: error_message });

                return res.status(200).send(marca);
            });
    });
}

exports.post = async (req, res) => {
    validateAndSave(req, false, function (error, exists) {
        treatError(error, 500, 'Algo deu errado ao salvar a marca', function () {
            if (exists)
                treatError(true, 500, 'Já existe uma marca com este nome cadastrada!', function (goWrong, error_code, error_message) {
                    if (goWrong)
                        return res.status(error_code).send({ message: error_message });
                });
            else
                marcaRepository.save(req.body, function (error) {
                    treatError(error, 500, 'Algo deu errado ao salvar a marca', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        return res.status(201).send();
                    });
                });
        });
    });
};

exports.put = async (req, res) => {
    return await validateAndSave(req, true, function (error, exists) {
        treatError(error, 500, 'Algo deu errado ao atualizar a marca', function (goWrong, error_code, error_message) {
            if (goWrong)
                return res.status(error_code).send({ message: error_message });
            else if (!exists)
                treatError(true, 404, 'Marca que está tentando ser editada não existe!', function (goWrong, error_code, error_message) {
                    if (goWrong)
                        return res.status(error_code).send({ message: error_message });
                });
            else
                marcaRepository.update(req.params.id, req.body, function (error) {
                    treatError(error, 500, 'Algo deu errado ao editar a marca', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        return res.status(204).send();
                    });
                });
        });
    });
}

exports.delete = async (req, res) => {
    return await validateAndSave(req, true, function (error, exists) {
        treatError(error, 500, 'Algo deu errado ao excluir a marca', function (goWrong, error_code, error_message) {
            if (goWrong)
                return res.status(error_code).send({ message: error_message });
            else if (!exists)
                treatError(true, 404, 'Marca não existe!', function (goWrong, error_code, error_message) {
                    if (goWrong)
                        return res.status(error_code).send({ message: error_message });
                });
            else
                marcaRepository.delete(req.params.id, function (error) {
                    treatError(error, 500, 'Algo deu errado ao excluir a marca', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        return res.status(204).send();
                    });
                });
        });
    });
};

async function validateAndSave(req, update, callback) {
    if (update) {
        await marcaRepository.findById(req.params.id, function (error, marca) {
            if (typeof callback === "function")
                callback(error, marca != null);
        });
    } else {
        await marcaRepository.findByName(req.body.nome, function (error, marca) {
            if (typeof callback === "function")
                callback(error, marca != null);
        });
    }
}

function treatError(error, code, message, callback) {
    var error_code = (code != null && code != undefined) ? code : 500;
    var error_message = (message != undefined && message != null && message != '') ? message : 'Ocorreu um erro ao processar sua requisição';

    if (error && callback != undefined && typeof callback === "function")
        callback(true, error_code, error_message);
    else if (callback != undefined && typeof callback === "function")
        callback(false, null, null);
}
