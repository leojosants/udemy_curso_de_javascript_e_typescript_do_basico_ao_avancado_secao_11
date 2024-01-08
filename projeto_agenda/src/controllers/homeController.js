exports.homePage = (request, response) => {
    response.render('index', {
        titulo: 'Título da página',
        numeros: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    });
    return;
}

exports.treatPost = (request, response) => {
    response.send(request.body);
    return;
};