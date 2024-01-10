import 'core-js/stable';                // for old browsers
import 'regenerator-runtime/runtime';   // for old browsers
import Login from './modules/Login';
// import './assets/css/style.css';

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');

login.init();
cadastro.init();