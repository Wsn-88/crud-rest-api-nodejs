'use strict';

const response = require('./res');
const connection = require('./connection');

exports.index = function(req, res){
    response.ok("Rest API Berjalan",res);
}

//menampilkan semua data mahasiswa
exports.GetAllMahasiswa = function (req, res) {
    connection.query('SELECT * FROM mahasiswa', function(error, rows, field ){
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res)
        }
    }); 
};

//menampilkan semua data mahasiswa berdasarkan id
exports.GetAllMahasiswaById = function (req, res){
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id = ?', [id],
        function(error, rows, field){
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
}