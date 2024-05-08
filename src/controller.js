'use strict';

const response = require('./res');
const connection = require('./connection');

exports.index = function (req, res) {
    response.ok("Rest API Berjalan", res);
}

//menampilkan semua data mahasiswa
exports.getAllMahasiswa = function (req, res) {
    connection.query('SELECT * FROM mahasiswa', function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }
    });
};

//menampilkan semua data mahasiswa berdasarkan id
exports.getMahasiswaById = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id = ?', [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        });
}

//menambah data mahasiswa
exports.addData = function (req, res) {
    const nim = req.body.nim;
    const nama = req.body.nama;
    const jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim,nama,jurusan) VALUES(?,?,?)', [nim, nama, jurusan],
        function (error, rows, fields){
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil tambah data", res);
            }
        });
}

//mengubah data berdasarkan id
exports.editData =  function (req, res) {
    const id = req.params.id; 
    const nim = req.body.nim;
    const nama = req.body.nama;
    const jurusan = req.body.jurusan;

    connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id=?', [nim, nama, jurusan, id],
        function(error, rows, fields){
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil ubah data", res);
            }
        });
}