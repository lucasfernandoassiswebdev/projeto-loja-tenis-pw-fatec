const solaRepository = require("../repositories/SolaRepository");
const serviceExceptions = require('./exceptions/serviceExceptions');

exports.get = async (req, res) => {
    return await solaRepository.find(function (error, solas) {
        serviceExceptions.treatError(error, 500, 'Algo deu errado ao buscar as solas cadastradas', function (goWrong, error_code, error_message) {
            if (goWrong)
                return res.status(error_code).send({ message: error_message });

            return res.status(200).send(solas);
        });
    });
}

exports.getById = async (req, res) => {
    return await solaRepository.findById(req.params.id, function (error, sola) {
        if (cadarco == null)
            serviceExceptions.treatError(true, 404, 'Sola buscada não existe', function (goWrong, error_code, error_message) {
                if (goWrong)
                    return res.status(error_code).send({ message: error_message });
            });
        else
            serviceExceptions.treatError(error, 500, 'Algo deu errado ao buscar a sola', function (goWrong, error_code, error_message) {
                if (goWrong)
                    return res.status(error_code).send({ message: error_message });

                return res.status(200).send(sola);
            });
    });
}

exports.post = async (req, res) => {
    serviceExceptions.validateAndSave(req, false, solaRepository, function (error, exists) {
        serviceExceptions.treatError(error, 500, 'Algo deu errado ao salvar a sola', function () {
            if (exists)
                serviceExceptions.treatError(true, 500, 'Já existe uma sola com este nome cadastrado!', function (goWrong, error_code, error_message) {
                    if (goWrong)
                        return res.status(error_code).send({ message: error_message });
                });
            else
                solaRepository.save(req.body, function (error) {
                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao salvar a sola', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        return res.status(201).send();
                    });
                });
        });
    });
};

exports.put = async (req, res) => {
    return await serviceExceptions.validateAndSave(req, true, solaRepository, function (error, exists) {
        serviceExceptions.treatError(error, 500, 'Algo deu errado ao atualizar a sola', function (goWrong, error_code, error_message) {
            if (goWrong)
                return res.status(error_code).send({ message: error_message });
            else if (!exists)
                serviceExceptions.treatError(true, 404, 'Sola que está tentando ser editada não existe!', function (goWrong, error_code, error_message) {
                    if (goWrong)
                        return res.status(error_code).send({ message: error_message });
                });
            else
                solaRepository.update(req.params.id, req.body, function (error) {
                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao editar a sola', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        return res.status(204).send();
                    });
                });
        });
    });
}

exports.delete = async (req, res) => {
    return await serviceExceptions.validateAndSave(req, true, solaRepository, function (error, exists) {
        serviceExceptions.treatError(error, 500, 'Algo deu errado ao excluir a sola', function (goWrong, error_code, error_message) {
            if (goWrong)
                return res.status(error_code).send({ message: error_message });
            else if (!exists)
                serviceExceptions.treatError(true, 404, 'Sola não existe!', function (goWrong, error_code, error_message) {
                    if (goWrong)
                        return res.status(error_code).send({ message: error_message });
                });
            else
                solaRepository.delete(req.params.id, function (error) {
                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao excluir a sola', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        return res.status(204).send();
                    });
                });
        });
    });
};