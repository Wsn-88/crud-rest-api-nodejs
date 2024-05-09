'use strict';
const controller = require('./controller');


module.exports = function(app){
    app.route('/').get(controller.index);

    //menampilkan semua data mahasiswa
    app.route('/mahasiswa').get(controller.getAllMahasiswa);

    //tampil mahasiswa by id
    app.route('/mahasiswa/:id').get(controller.getMahasiswaById);

    //tambah data mahasiswa
    app.route('/tambah').post(controller.addData);

    //ubah data mahasiswa
    app.route('/ubah/:id').put(controller.editData);

    //delete data
    app.route('/hapus/:id').delete(controller.deleteData);

    //tampil grup nested matakuliah
    app.route('/tampilmatakuliah').get(controller.viewGroupMatakuliah);
};