// Connect node application to MYSQL server
const mysql = require('mysql2');

// mysql -u root
const connection = mysql.createConnection({
    host: 'localhost', //127.0.0.1
    user: 'root',
    password: 'password',
    database: 'employee_db',

}).promise();

module.exports = connection;

