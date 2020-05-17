"use strict";

const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./DB");
require("console.table");

init();

function init() {
  const logoText = logo({ name: "Employee Manager" }).render();
  loadInitialPrompts();
}

async function loadInitialPrompts() {}

async function viewEmployees() {}

async function viewEmployeesByDepartment() {}

async function viewEmployeesByManager() {}

async function removeEmployees() {}

async function updateEmployeeRole() {}

async function updateEmployeeManager() {}

async function viewRoles() {}

async function addRole() {}

async function removeRole() {}

async function addDepartment() {}

async function removeDepartment() {}

async function addEmployee() {}

async function removeEmployee() {}

function quit() {}
