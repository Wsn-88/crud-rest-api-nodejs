const express = require('express');
const auth = require('./auth');
const routes = express.Router();

//daftarkan menu registrasi
routes.post('/api/v1/registration', auth.register);

module.exports = routes;