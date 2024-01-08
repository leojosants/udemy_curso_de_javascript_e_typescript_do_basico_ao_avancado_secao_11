const Login = require('../models/LoginModel');

exports.index = (request, response) => {
    response.render('login');
};

exports.register = async function (request, response) {
    try {
        const login = new Login(request.body);
        await login.register();

        if (login.errors.length > 0) {
            request.flash('errors', login.errors);

            request.session.save(function () {
                // return response.redirect('back');
                return response.redirect('/login/index');
            });

            return;
        }

        request.flash('success', 'Usuário criado com sucesso!');

        request.session.save(function () {
            // return response.redirect('back');
            return response.redirect('/login/index');
        });
    }
    catch (error) {
        console.log(error);
        return response.render('page404');
    }
}