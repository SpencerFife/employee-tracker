"use strict";

const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employeetracker_db",
});

connection.connect((err) => {
  if (err) throw err;
});

connection.query = util.promisify(connecton.query);

module.exports = connection;
