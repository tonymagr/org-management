// This is the connection.js that connects to the mySQL
const mysql = require("mysql2");

// const myPassword = require("../ignoredData/pw.js");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    // password: myPassword,
    password: "password",
    database: "employeeTable"
});

connection.connect(function(err){
    if(err){
        throw(err);
    }
});

module.exports = connection;