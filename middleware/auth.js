const connection = require("../src/connection");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const response = require("../src/res");
const jwt = require("jsonwebtoken");
const config = require("../config/secret");
const ip = require("ip");
const salt = 10; //untuk hash password random

//controller registrasi
exports.register = async function (req, res) {
  let post = {
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
    role: req.body.role,
    created_At: new Date(),
  };
 
    //cek email sudah terdaftar / belum
    let query = "SELECT email FROM ?? WHERE ??=?";
    let table = ["user", "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function (error, rows) {
      if (error) {
        console.log(error);
      } else {
        //jika email belum terdaftar
        if (rows.length == 0) {
          let query = "INSERT INTO ?? SET ?";
          let table = ["user"];
          query = mysql.format(query, table);
          connection.query(query, post, function (error, rows) {
            if (error) {
              console.log(error);
            } else {
              response.created("Berhasil mendaftarkan akun", res);
              // kirimkan email verifikasi
              // rand =  Math.floor((Math.random() * 100) + 50)
              // host = 'localhost:3001'
              // link = "http://" + host + "/auth/verify?id=" + rand
            }
          });
        } else {
          response.ok("Email sudah terdaftar", res);
        }
      }
    });
  
};
