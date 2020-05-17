"use strict";

const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }
}

findAllEmployees() {}

findAllManagers() {}

createEmployee() {}

removeEmployee() {}

updateEmployeeRole() {}

updateEmployeeManager() {}

findAllRoles() {}

createRole() {}

removeRole() {}

findAllDepartments() {}

createDepartment() {}

removeDepartment() {}

findAllEmployeesByDepartment() {}

findAllEmployeesByManager() {}

module.exports = new DB(connection);