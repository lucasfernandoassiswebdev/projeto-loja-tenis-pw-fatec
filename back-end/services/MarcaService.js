const marcaRepository = require('../repositories/MarcaRepository');
const serviceExceptions = require('./exceptions/serviceExceptions');

exports.get = async (req, res) => {
    return await marcaRepository.find(function (error, marcas) {
        serviceExceptions.treatError(error, 500, 'Algo deu errado ao buscar as marcas cadastradas', function (goWrong, error_code, error_message) {
            if (goWrong)
                return res.status(error_code).send({ message: error_message });

            return res.status(200).send(marcas);
        });
    });
}

exports.getById = async (req, res) => {
    return await marcaRepository.findById(req.params.id, function (error, marca) {
        if (marca == null)
            serviceExceptions.treatError(true, 404, 'Marca buscada não existe', function (goWrong, error_code, error_message) {
                if (goWrong)
                    return res.status(error_code).send({ message: error_message });
            });
        else
            serviceExceptions.treatError(error, 500, 'Algo deu errado ao buscar a marca', function (goWrong, error_code, error_message) {
                if (goWrong)
                    return res.status(error_code).send({ message: error_message });

                return res.status(200).send(marca);
            });
    });
}

exports.post = async (req, res) => {
    serviceExceptions.validateAndSave(req, false, marcaRepository, function (error, exists) {
        serviceExceptions.treatError(error, 500, 'Algo deu errado ao salvar a marca', function () {
            if (exists)
                serviceExceptions.treatError(true, 500, 'Já existe uma marca com este nome cadastrada!', function (goWrong, error_code, error_message) {
                    if (goWrong)
                        return res.status(error_code).send({ message: error_message });
                });
            else
                marcaRepository.save(req.body, function (error) {
                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao salvar a marca', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        return res.status(201).send();
                    });
                });
        });
    });
};

exports.put = async (req, res) => {
    return await serviceExceptions.validateAndSave(req, true, marcaRepository, function (error, exists) {
        serviceExceptions.treatError(error, 500, 'Algo deu errado ao atualizar a marca', function (goWrong, error_code, error_message) {
            if (goWrong)
                return res.status(error_code).send({ message: error_message });
            else if (!exists)
                serviceExceptions.treatError(true, 404, 'Marca que está tentando ser editada não existe!', function (goWrong, error_code, error_message) {
                    if (goWrong)
                        return res.status(error_code).send({ message: error_message });
                });
            else
                marcaRepository.update(req.params.id, req.body, function (error) {
                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao editar a marca', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        return res.status(204).send();
                    });
                });
        });
    });
}

exports.delete = async (req, res) => {
    return await serviceExceptions.validateAndSave(req, true, marcaRepository, function (error, exists) {
        serviceExceptions.treatError(error, 500, 'Algo deu errado ao excluir a marca', function (goWrong, error_code, error_message) {
            if (goWrong)
                return res.status(error_code).send({ message: error_message });
            else if (!exists)
                serviceExceptions.treatError(true, 404, 'Marca não existe!', function (goWrong, error_code, error_message) {
                    if (goWrong)
                        return res.status(error_code).send({ message: error_message });
                });
            else
                marcaRepository.delete(req.params.id, function (error) {
                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao excluir a marca', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        return res.status(204).send();
                    });
                });
        });
    });
};