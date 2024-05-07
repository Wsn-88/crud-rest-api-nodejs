'use strict';
const controller = require('./controller');


module.exports = function(app){
    app.route('/').get(controller.index);
    app.route('/mahasiswa').get(controller.GetAllMahasiswa);
};