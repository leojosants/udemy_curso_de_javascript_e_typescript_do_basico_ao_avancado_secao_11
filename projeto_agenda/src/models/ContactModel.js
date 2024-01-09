const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: false,
        default: '',
    },
    email: {
        type: String,
        required: false,
        default: '',
    },
    phone: {
        type: String,
        required: false,
        default: '',
    },
    createdIn: {
        type: Date,
        default: Date.now,
    },
});

const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
}

Contact.prototype.register = async function () {
    this.valid();
    if (this.errors.length > 0) return;
    this.contact = await ContactModel.create(this.body);

};

Contact.prototype.valid = function () {
    this.clenUp();

    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido!');
    if (!this.body.name) this.errors.push('Nome é um campo obrigatório!');

    if (!this.body.email && !this.body.phone) {
        this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone!');
    }
}

Contact.prototype.clenUp = function () {
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }
    this.body = {
        name: this.body.name,
        lastname: this.body.lastname,
        email: this.body.email,
        phone: this.body.phone,
    };
}

module.exports = Contact;