const { request } = require("express");

exports.middlewareGlobal = (request, response, next) => {
    response.locals.umaVariavelLocal = 'Este é o valor da variável local.'
    next();
};

exports.checkCSRFerror = (error, request, response, next) => {
    if (error) {
        return response.render('page404');
    }
    next();
};

exports.csrfMiddleware = (request, response, next) => { 
    response.locals.csrfToken = request.csrfToken();
    next();
};