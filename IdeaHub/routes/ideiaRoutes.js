const express = require('express');
const route = express.Router();

//Controllers
const IdeiasController = require('../controllers/IdeiasControllers');

// Middleware para autenticação
const checkAuth = require('../helpers/auth').checkAuth

route.get('/', IdeiasController.showIdeias);

//usando o middleware checkAuth para proteger a rota de dashboard
route.get('/dashboard', checkAuth, IdeiasController.showDashboard);

route.get('/novaIdeia', checkAuth, IdeiasController.criarIdeia);
route.post('/novaIdeia', checkAuth, IdeiasController.criarIdeiaPost);

module.exports = route;
