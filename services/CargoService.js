const cargoRepository = require("../repositories/CargoRepository");
const serviceExceptions = require('./exceptions/serviceExceptions');

exports.get = async (req, res) => {
    return await cargoRepository.find(function (error, cargos) {
        serviceExceptions.treatError(error, 500, 'Algo deu errado ao buscar os cargos cadastrados', function (goWrong, error_code, error_message) {
            if (goWrong)
                return res.status(error_code).send({ message: error_message });

            return res.status(200).send(cargos);
        });
    });
}

exports.getById = async (req, res) => {
    return await cargoRepository.findById(req.params.id, function (error, cargo) {
        if (cargo == null)
            serviceExceptions.treatError(true, 404, 'Cargo buscado não existe', function (goWrong, error_code, error_message) {
                if (goWrong)
                    return res.status(error_code).send({ message: error_message });
            });
        else
            serviceExceptions.treatError(error, 500, 'Algo deu errado ao buscar o cargo', function (goWrong, error_code, error_message) {
                if (goWrong)
                    return res.status(error_code).send({ message: error_message });

                return res.status(200).send(cargo);
            });
    });
}

exports.post = async (req, res) => {
    serviceExceptions.validateAndSave(req, false, cargoRepository, function (error, exists) {
        serviceExceptions.treatError(error, 500, 'Algo deu errado ao salvar o cargo', function () {
            if (exists)
                serviceExceptions.treatError(true, 500, 'Já existe um cargo com este nome cadastrado!', function (goWrong, error_code, error_message) {
                    if (goWrong)
                        return res.status(error_code).send({ message: error_message });
                });
            else
                cargoRepository.save(req.body, function (error) {
                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao salvar o cargo', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        return res.status(201).send();
                    });
                });
        });
    });
};

exports.put = async (req, res) => {
    return await serviceExceptions.validateAndSave(req, true, cargoRepository, function (error, exists) {
        serviceExceptions.treatError(error, 500, 'Algo deu errado ao atualizar o cargo', function (goWrong, error_code, error_message) {
            if (goWrong)
                return res.status(error_code).send({ message: error_message });
            else if (!exists)
                serviceExceptions.treatError(true, 404, 'Cargo que está tentando ser editada não existe!', function (goWrong, error_code, error_message) {
                    if (goWrong)
                        return res.status(error_code).send({ message: error_message });
                });
            else
                cargoRepository.update(req.params.id, req.body, function (error) {
                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao editar o cargo', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        return res.status(204).send();
                    });
                });
        });
    });
}

exports.delete = async (req, res) => {
    return await serviceExceptions.validateAndSave(req, true, cargoRepository, function (error, exists) {
        serviceExceptions.treatError(error, 500, 'Algo deu errado ao excluir o cargo', function (goWrong, error_code, error_message) {
            if (goWrong)
                return res.status(error_code).send({ message: error_message });
            else if (!exists)
                serviceExceptions.treatError(true, 404, 'Cargo não existe!', function (goWrong, error_code, error_message) {
                    if (goWrong)
                        return res.status(error_code).send({ message: error_message });
                });
            else
                cargoRepository.delete(req.params.id, function (error) {
                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao excluir o cargo', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        return res.status(204).send();
                    });
                });
        });
    });
};