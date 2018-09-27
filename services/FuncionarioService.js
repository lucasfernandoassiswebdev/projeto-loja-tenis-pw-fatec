const funcionarioRepository = require('../repositories/FuncionarioRepository');
const vendasRepository = require('../repositories/VendaRepository');
const cargoRepository = require('../repositories/CargoRepository');
const serviceExceptions = require('./exceptions/serviceExceptions');

exports.get = async (req, res) => {
    return await funcionarioRepository.find(function (error, funcionarios) {
        serviceExceptions.treatError(error, 500, 'Algo deu errado ao buscar os funcionarios cadastrados', function (goWrong, error_code, error_message) {
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
            else {
                checkCpf(req.body.cpf, function (error, goWrongCheck) {
                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao processar a sua requisição', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        if (goWrongCheck)
                            return res.status(428).send({ message: 'Já existe um funcionário cadastrado com este CPF' });

                        checkCargo(req.body.cargo, function (error, goWrongCheckCargo) {
                            serviceExceptions.treatError(error, 500, 'Algo deu errado ao processar a sua requisição', function (goWrong, error_code, error_message) {
                                if (goWrong)
                                    return res.status(error_code).send({ message: error_message });

                                if (goWrongCheckCargo)
                                    return res.status(428).send({ message: 'Cargo que está tentando ser vinculado não existe' });

                                funcionarioRepository.save(req.body, function (error) {
                                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao salvar o funcionário', function (goWrong, error_code, error_message) {
                                        if (goWrong)
                                            return res.status(error_code).send({ message: error_message });

                                        return res.status(201).send();
                                    });
                                });
                            });
                        });
                    })
                })
            }
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
            else {
                checkCpf(req.body.cpf, function (error, goWrongCheck) {
                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao processar a sua requisição', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        if (goWrongCheck)
                            return res.status(428).send({ message: 'Já existe um funcionário cadastrado com este CPF' });

                        checkCargo(req.body.cargo, function (error, goWrongCheckCargo) {
                            serviceExceptions.treatError(error, 500, 'Algo deu errado ao processar a sua requisição', function (goWrong, error_code, error_message) {
                                if (goWrong)
                                    return res.status(error_code).send({ message: error_message });

                                if (goWrongCheckCargo)
                                    return res.status(428).send({ message: 'Cargo que está tentando ser vinculado não existe' });

                                funcionarioRepository.update(req.params.id, req.body, function (error) {
                                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao editar o funcionário', function (goWrong, error_code, error_message) {
                                        if (goWrong)
                                            return res.status(error_code).send({ message: error_message });

                                        return res.status(204).send();
                                    });
                                });
                            });
                        });
                    });
                });
            }
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
            else {
                checkVendas(req.params.id, function (error, goWrongCheck) {
                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao processar sua requisição', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        if (goWrongCheck)
                            return res.status(428).send({ message: 'Já existem vendas vinculadas a este funcionário, por favor delete-as antes' });
                    });
                });

                funcionarioRepository.delete(req.params.id, function (error) {
                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao excluir o funcionário', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        return res.status(204).send();
                    });
                });
            }
        });
    });
};

function checkVendas(id_funcionario, callback) {
    vendasRepository.findByFuncionario(id_funcionario, function (error, lista) {
        callback(error, !lista);
    });
}

function checkCpf(cpf, callback) {
    if (cpf != undefined)
        funcionarioRepository.findByCpf(cpf, function (error, lista) {
            callback(error, lista);
        });
    else
        callback(false, false);
}

function checkCargo(id_cargo, callback) {
    if (id_cargo != undefined)
        cargoRepository.findById(id_cargo, function (error, cargo) {
            callback(error, cargo);
        });
    else
        callback(false, false);
}