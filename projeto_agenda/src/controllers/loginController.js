const Login = require('../models/LoginModel');

exports.index = (request, response) => {
    if(request.session.user)return response.render('loginLogado')
    return response.render('login');
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

exports.login = async function (request, response) {
    try {
        const login = new Login(request.body);
        await login.login();

        if (login.errors.length > 0) {
            request.flash('errors', login.errors);

            request.session.save(function () {
                // return response.redirect('back');
                return response.redirect('/login/index');
            });

            return;
        }

        request.flash('success', 'Usuário logado com sucesso!');
        request.session.user = login.user;

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

exports.logout = function (request, response) {
    request.session.destroy();
    return response.redirect('/');
};