const funcionarioRepository = require('../repositories/FuncionarioRepository');
const vendasRepository = require('../repositories/VendaRepository');
const serviceExceptions = require('./exceptions/serviceExceptions');

exports.get = async (req, res) => {
    return await funcionarioRepository.find(function (error, funcionarios) {
        serviceExceptions.treatError(error, 500, 'Algo deu errado ao buscar as funcionarios cadastradas', function (goWrong, error_code, error_message) {
            if (goWrong)
                return res.status(error_code).send({ message: error_message });

            return res.status(200).send(funcionarios);
        });
    });
}

exports.getById = async (req, res) => {
    return await funcionarioRepository.findById(req.params.id, function (error, funcionario) {
        if (funcionario == null)
            serviceExceptions.treatError(true, 404, 'Funcionário buscado não existe', function (goWrong, error_code, error_message) {
                if (goWrong)
                    return res.status(error_code).send({ message: error_message });
            });
        else
            serviceExceptions.treatError(error, 500, 'Algo deu errado ao buscar o funcionário', function (goWrong, error_code, error_message) {
                if (goWrong)
                    return res.status(error_code).send({ message: error_message });

                return res.status(200).send(funcionario);
            });
    });
}

exports.post = async (req, res) => {
    serviceExceptions.validateAndSave(req, false, funcionarioRepository, function (error, exists) {
        serviceExceptions.treatError(error, 500, 'Algo deu errado ao salvar o funcionário', function () {
            if (exists)
                serviceExceptions.treatError(true, 500, 'Já existe uma funcionário com este nome cadastrado!', function (goWrong, error_code, error_message) {
                    if (goWrong)
                        return res.status(error_code).send({ message: error_message });
                });
            else
                funcionarioRepository.save(req.body, function (error) {
                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao salvar o funcionário', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        return res.status(201).send();
                    });
                });
        });
    });
};

exports.put = async (req, res) => {
    return await serviceExceptions.validateAndSave(req, true, funcionarioRepository, function (error, exists) {
        serviceExceptions.treatError(error, 500, 'Algo deu errado ao atualizar o funcionário', function (goWrong, error_code, error_message) {
            if (goWrong)
                return res.status(error_code).send({ message: error_message });
            else if (!exists)
                serviceExceptions.treatError(true, 404, 'Funcionario que está tentando ser editado não existe!', function (goWrong, error_code, error_message) {
                    if (goWrong)
                        return res.status(error_code).send({ message: error_message });
                });
            else
                funcionarioRepository.update(req.params.id, req.body, function (error) {
                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao editar o funcionário', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        return res.status(204).send();
                    });
                });
        });
    });
}

exports.delete = async (req, res) => {
    return await serviceExceptions.validateAndSave(req, true, funcionarioRepository, function (error, exists) {
        serviceExceptions.treatError(error, 500, 'Algo deu errado ao excluir o funcionário', function (goWrong, error_code, error_message) {
            if (goWrong)
                return res.status(error_code).send({ message: error_message });
            else if (!exists)
                serviceExceptions.treatError(true, 404, 'Funcionário não existe!', function (goWrong, error_code, error_message) {
                    if (goWrong)
                        return res.status(error_code).send({ message: error_message });
                });
            else
                funcionarioRepository.delete(req.params.id, function (error) {
                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao excluir o funcionário', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        return res.status(204).send();
                    });
                });
        });
    });
};

function checkVendas(id_funcionario, callback) {

}