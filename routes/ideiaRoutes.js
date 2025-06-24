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

route.post('/deletaIdeia', checkAuth, IdeiasController.deletarIdeia);

route.get('/editar/:id', checkAuth, IdeiasController.editarIdeia)
route.post('/edit', checkAuth, IdeiasController.editarIdeiaPost)

module.exports = route;
