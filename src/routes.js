'use strict';
const controller = require('./controller');


module.exports = function(app){
    app.route('/').get(controller.index);

    //menampilkan semua data mahasiswa
    app.route('/mahasiswa').get(controller.GetAllMahasiswa);

    //tampil mahasiswa by id
    app.route('/mahasiswa/:id').get(controller.GetMahasiswaById);

    //tambah data mahasiswa
    app.route('/addMahasiswa').post(controller.AddData);
};