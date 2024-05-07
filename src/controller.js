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
            console.error(error);
        } else {
            response.ok(rows, res)
        }
    }); 
};