const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register() {
        this.valid();
        if (this.errors.length > 0) return;
        await this.userExistes();
        if (this.errors.length > 0) return;
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        try {
            this.user = await LoginModel.create(this.body);
        }
        catch (error) {
            console.log(error);
        }
    }

    async userExistes() {
        const user = await LoginModel.findOne({
            email: this.body.email
        });

        if (user) {
            this.errors.push('Usuário já existe');
            return;
        }
    }
    
    
    valid() {
        this.clenUp();
        
        if (!validator.isEmail(this.body.email)) {
            this.errors.push('E-mail inválido');
            return;
        }
        
        if (this.body.password.length < 3 || this.body.password.length > 50) {
            this.errors.push('A senha precisar ser entre 3 e 50 caracteres');
            return;
        }
    }

    clenUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password,
        };
    }
}

module.exports = Login;