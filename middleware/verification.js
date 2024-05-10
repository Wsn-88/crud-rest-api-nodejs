const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verivikasi() {
  return function (req, rest, next) {
    let role = req.body.role;
    //cek header authorization
    let tokenWithBearer = req.headers.authorization;
    if (tokenWithBearer) {
      let token = tokenWithBearer.split(' ')[1];
      console.log({ role });
      //mulai verifikasi
      jwt.verify(token, config.secret, function (error, decoded) {
        if (error) {
          console.log(error);
          return rest.status(401).send({ auth: false, message: 'Token tidak terdaftar!' });
        } else {
          if (role == 1) {
            req.auth = decoded;
            next();
          } else {
            return rest.status(401).send({ auth: false, message: 'Gagal authorization role anda!' });
          }
        }
      });
    } else {
      return rest.status(401).send({ auth: false, message: 'Token tidak tersedia!' });
    }
  }
}


module.exports = verivikasi;