const Contact = require('../models/ContactModel');

exports.index = (request, response) => {
    response.render('contact');
};

exports.register = async (request, response) => {
    try {
        const contact = new Contact(request.body);
        await contact.register();
        response.send('pagina de registro de contatos');

        if (contact.errors.length > 0) {
            request.flash('errors', contact.errors);
            request.session.save(() => response.redirect('back'));
        }

        request.flash('success', "Contato registrado com sucesso!");
        request.session.save(() => response.redirect('back'));
        return;
    }
    catch (error) {
        console.log(error);
        return response.render('page404');
    }
};