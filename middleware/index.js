const express = require('express');
const auth = require('./auth');
const routes = express.Router();
const verifikasi = require('./verification');

//daftarkan menu registrasi
routes.post('/api/v1/registration', auth.register);

//menu login
routes.post('/api/v1/login', auth.login);

//alamat yang perlu otorisasi
routes.get('/api/v1/home', verifikasi(), auth.HalamanUtama);

module.exports = routes;