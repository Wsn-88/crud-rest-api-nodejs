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
          }
        });
      } else {
        response.badRequest("Email sudah terdaftar", res);
      }
    }
  });
};

//controller untuk login
exports.login = function (req, res) {
  let post = {
    email: req.body.email,
    // password: req.body.password
  };

  //cek user sudah benar?
  let query = "SELECT * FROM ?? WHERE ??=?";
  let table = ["user", "email", post.email];

  query = mysql.format(query, table);

  connection.query(query, async function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 1) {
        //cek password dari input body compare dengan row table user
        const isPasswordValid = await bcrypt.compare(
          req.body.password,
          rows[0].password
        );
        if (!isPasswordValid) {
          return response.Unauthorized("Username atau password salah!", res);
        }

        let token = jwt.sign({ rows }, config.secret, {
          //expired dalam wktu 30 menit
          expiresIn: 1800,
        });

        //tambah row id_user dari table id user
        id_user = rows[0].id;

        //tampung data user
        let data = {
          id_user: id_user,
          akses_token: token,
          ip_address: ip.address(),
        };

        //simpan tampungan login data user
        let query = "INSERT INTO ?? set ?";
        let table = ["access_token"];

        query = mysql.format(query, table);

        connection.query(query, data, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            res.json({
              success: true,
              message: "Token Generate",
              token: token,
              currentUser: data.id_user,
            });
          }
        });
      } else {
        return response.Unauthorized("Username atau password salah!", res);
      }
    }
  });
};

exports.HalamanUtama = function (req, res) {
  response.ok("Halaman ini untuk admin dengan role 1", res);
}