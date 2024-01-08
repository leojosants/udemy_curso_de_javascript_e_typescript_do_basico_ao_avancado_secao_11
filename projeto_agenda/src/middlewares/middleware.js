const { request } = require("express");

exports.middlewareGlobal = (request, response, next) => {
    response.locals.umaVariavelLocal = 'Este é o valor da variável local.'
    next();
};

exports.checkCSRFerror = (error, request, response, next) => {
    if (error && error.code === 'EBADCSRFTOKEN') {
        return response.render('page404');
    }
};

exports.csrfMiddleware = (request, response, next) => { 
    response.locals.csrfToken = request.csrfToken();
    next();
};