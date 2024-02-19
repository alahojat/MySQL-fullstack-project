const mysql2 = require('mysql2');

connection = mysql2.createConnection({
    host: "localhost",
    port: "3306",
    user: "notes",
    password: "notes",
    database: "notes"
})

module.exports = connection;