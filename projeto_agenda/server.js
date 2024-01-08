require('dotenv').config();
const express = require('express');
const port = Number(3000);
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('pronto');
    })
    .catch((error) => {
        console.log(error);
    });

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCSRFerror, csrfMiddleware } = require('./src/middlewares/middleware');

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: process.env.MYSECRET,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    }
});

app.use(sessionOptions);
app.use(flash());
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(csrf());
app.use(middlewareGlobal);  // our own middleware
app.use(checkCSRFerror);    // our own middleware
app.use(csrfMiddleware);    // our own middleware
app.use(routes);

app.on('pronto', () => {
    app.listen(port, () => {
        console.log(`Acessar http://localhost:${port}`);
        console.log(`Servidor executando na porta ${port}`);
    });
});