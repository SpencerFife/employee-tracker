"use strict";

const mysql = require("mysql");
const inquirer = require("inquirer");

const promptMessages = {};
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employeetracker_db"
});

connection.connect(err => {
  if (err) throw err;
  prompt();
});

function prompt() {
  inquirer.prompt({});
}
