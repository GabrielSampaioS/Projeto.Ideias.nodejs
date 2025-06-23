const express = require('express');
const route = express.Router();

// Controllers
const AuthController = require('../controllers/AuthController.js');

route.get('/login', AuthController.Login);
route.post('/login', AuthController.LoginPost);

route.get('/register', AuthController.Register);
route.post('/register', AuthController.RegisterPost);
route.get('/logout', AuthController.Lougout);

// Exporting the route
module.exports = route;