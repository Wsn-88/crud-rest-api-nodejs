const mysql = require('mysql');

//connection db
const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '123456',
    database : 'db_mhs'
});

conn.connect((err) =>{
    try {
        console.log('connection db success');
    } catch (error) {
        throw err;
    }
});

module.exports = conn;