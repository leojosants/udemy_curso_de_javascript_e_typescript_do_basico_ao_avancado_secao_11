const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController');
const { loginRequired } = require('./src/middlewares/middleware');

/* home routes */
route.get('/', homeController.index);

/* login routes*/
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

/* routes contact */
route.get('/contato/index', loginRequired, contactController.index);
route.post('/contato/register', loginRequired, contactController.register);

module.exports = route;