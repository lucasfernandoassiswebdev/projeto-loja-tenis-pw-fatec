const tenisRepository = require('../repositories/TenisRepository');
const cadarcoRepository = require('../repositories/CadarcoRepository');
const solaRepository = require('../repositories/SolaRepository');
const marcaRepository = require('../repositories/MarcaRepository');
const serviceExceptions = require('./exceptions/serviceExceptions');

exports.get = async (req, res) => {
    return await tenisRepository.find(function (error, tenis) {
        serviceExceptions.treatError(error, 500, 'Algo deu errado ao buscar os tênis cadastrados', function (goWrong, error_code, error_message) {
            if (goWrong)
                return res.status(error_code).send({ message: error_message });

            return res.status(200).send(tenis);
        });
    });
}

exports.getById = async (req, res) => {
    return await tenisRepository.findById(req.params.id, function (error, tenis) {
        if (tenis == null)
            serviceExceptions.treatError(true, 404, 'Tênis buscado não existe', function (goWrong, error_code, error_message) {
                if (goWrong)
                    return res.status(error_code).send({ message: error_message });
            });
        else
            serviceExceptions.treatError(error, 500, 'Algo deu errado ao buscar o tênis', function (goWrong, error_code, error_message) {
                if (goWrong)
                    return res.status(error_code).send({ message: error_message });

                return res.status(200).send(tenis);
            });
    });
}

exports.post = async (req, res) => {
    serviceExceptions.validateAndSave(req, false, tenisRepository, function (error, exists) {
        serviceExceptions.treatError(error, 500, 'Algo deu errado ao salvar o tênis', function () {
            if (exists)
                serviceExceptions.treatError(true, 500, 'Já existe uma tênis com este nome cadastrado!', function (goWrong, error_code, error_message) {
                    if (goWrong)
                        return res.status(error_code).send({ message: error_message });
                });
            else {
                checkCadarco(req.body.cadarco, function (error, goWrongCheck) {
                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao processar a sua requisição', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        if (goWrongCheck)
                            return res.status(428).send({ message: 'O cadarço que está tentando ser vinculado não existe' });

                        checkSola(req.body.sola, function (error, goWrongcheckSola) {
                            serviceExceptions.treatError(error, 500, 'Algo deu errado ao processar a sua requisição', function (goWrong, error_code, error_message) {
                                if (goWrong)
                                    return res.status(error_code).send({ message: error_message });

                                if (goWrongcheckSola)
                                    return res.status(428).send({ message: 'A sola que está tentando ser vinculada não existe' });

                                checkMarca(req.body.marca, function (error, goWrongCheckMarca) {
                                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao processar a sua requisição', function (goWrong, error_code, error_message) {
                                        if (goWrong)
                                            return res.status(error_code).send({ message: error_message });

                                        if (goWrongcheckSola)
                                            return res.status(428).send({ message: 'A marca que está tentando ser vinculada não existe' });

                                        tenisRepository.save(req.body, function (error) {
                                            serviceExceptions.treatError(error, 500, 'Algo deu errado ao salvar o tênis', function (goWrong, error_code, error_message) {
                                                if (goWrong)
                                                    return res.status(error_code).send({ message: error_message });

                                                return res.status(201).send();
                                            });
                                        });
                                    });
                                });
                            })
                        });
                    });
                });
            }
        });
    });
};

exports.put = async (req, res) => {
    return await serviceExceptions.validateAndSave(req, true, tenisRepository, function (error, exists) {
        serviceExceptions.treatError(error, 500, 'Algo deu errado ao atualizar o tênis', function (goWrong, error_code, error_message) {
            if (goWrong)
                return res.status(error_code).send({ message: error_message });
            else if (!exists)
                serviceExceptions.treatError(true, 404, 'Tênis que está tentando ser editado não existe!', function (goWrong, error_code, error_message) {
                    if (goWrong)
                        return res.status(error_code).send({ message: error_message });
                });
            else
                tenisRepository.update(req.params.id, req.body, function (error) {
                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao editar o tênis', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        return res.status(204).send();
                    });
                });
        });
    });
}

exports.delete = async (req, res) => {
    return await serviceExceptions.validateAndSave(req, true, tenisRepository, function (error, exists) {
        serviceExceptions.treatError(error, 500, 'Algo deu errado ao excluir o tênis', function (goWrong, error_code, error_message) {
            if (goWrong)
                return res.status(error_code).send({ message: error_message });
            else if (!exists)
                serviceExceptions.treatError(true, 404, 'Tênis não existe!', function (goWrong, error_code, error_message) {
                    if (goWrong)
                        return res.status(error_code).send({ message: error_message });
                });
            else {
                tenisRepository.delete(req.params.id, function (error) {
                    serviceExceptions.treatError(error, 500, 'Algo deu errado ao excluir o tênis', function (goWrong, error_code, error_message) {
                        if (goWrong)
                            return res.status(error_code).send({ message: error_message });

                        return res.status(204).send();
                    });
                });
            }
        });
    });
};

function checkCadarco(id_cadarco, callback) {
    if (id_cadarco != undefined)
        cadarcoRepository.findById(id_cadarco, function (error, cadarco) {
            callback(error, cadarco);
        });
    else
        callback(false, false);
}

function checkSola(id_sola, callback) {
    if (id_sola != undefined)
        solaRepository.findById(id_sola, function (error, sola) {
            callback(error, sola);
        });
    else
        callback(false, false);
}

function checkMarca(id_marca, callback) {
    if (id_marca != undefined)
        marcaRepository.findById(id_marca, function (error, marca) {
            callback(error, marca);
        });
    else
        callback(false, false);
}
