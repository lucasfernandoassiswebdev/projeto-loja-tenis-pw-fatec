exports.validateAndSave = async (req, byId, repository, callback) => {
    if (byId) {
        await repository.findById(req.params.id, function (error, marca) {
            if (typeof callback === "function")
                callback(error, marca != null);
        });
    } else {
        await repository.findByName(req.body.nome, function (error, marca) {
            if (typeof callback === "function")
                callback(error, marca != null);
        });
    }
};

exports.treatError = (error, code, message, callback) => {    
    var error_code = (code != null && code != undefined) ? code : 500;
    var error_message = (message != undefined && message != null && message != '') ? message : 'Ocorreu um erro ao processar sua requisição';

    if (error && callback != undefined && typeof callback === "function")
        callback(true, error_code, error_message);
    else if (callback != undefined && typeof callback === "function")
        callback(false, null, null);
};