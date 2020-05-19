"use strict";

const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./DB");
require("console.table");

init();

function init() {
  const logoText = logo({ name: "Employee Manager" }).render();
  console.log(logoText);
  loadInitialPrompts();
}

async function loadInitialPrompts() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View all employees",
          value: "VIEW_ALL_EMPLOYEES",
        },
        {
          name: "View all employees by department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
        },
        {
          name: "View all employees by manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER",
        },
        {
          name: "Add employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Remove employee",
          value: "REMOVE_EMPLOYEE",
        },
        {
          name: "Update employee role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "Update employee manager",
          value: "UPDATE_EMPLOYEE_MANAGER",
        },
        {
          name: "View all roles",
          value: "VIEW_ALL_ROLES",
        },
        {
          name: "Add role",
          value: "ADD_ROLE",
        },
        {
          name: "Remove role",
          value: "REMOVE_ROLE",
        },
        {
          name: "View all departments",
          value: "VIEW_ALL_DEPARTMENTS",
        },
        {
          name: "Add department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Remove department",
          value: "REMOVE_DEPARTMENT",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]);

  console.log(choice);

  switch (choice) {
    case "VIEW_ALL_EMPLOYEES":
      return viewEmployees();
    case "VIEW_EMPLOYEES_BY_DEPARTMENT":
      return viewEmployeesByDepartment();
    case "VIEW_EMPLOYEES_BY_MANAGER":
      return viewEmployeesByManager();
    case "ADD_EMPLOYEE":
      return addEmployee();
    case "REMOVE_EMPLOYEE":
      return removeEmployee();
    case "UPDATE_EMPLOYEE_ROLE":
      return updateEmployeeRole();
    case "UPDATE_EMPLOYEE_MANAGER":
      return updateEmployeeManager();
    case "VIEW_ALL_ROLES":
      return viewRoles();
    case "ADD_ROLE":
      return addRole();
    case "REMOVE_ROLE":
      return removeRole();
    case "VIEW_ALL_DEPARTMENTS":
      return viewDepartments();
    case "ADD_DEPARTMENT":
      return addDepartment();
    case "REMOVE_DEPARTMENT":
      return removeDepartment();
    default:
      return quit();
  }
}

async function viewEmployees() {
  const employee = await db.findAllEmployees();
  console.log("\n");
  console.table(employee);
  loadInitialPrompts();
}

async function viewEmployeesByDepartment() {
  const department = await db.findAllDepartments();

  const departmentChoices = department.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const { departmentId } = await prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Which department would you like to see the employees of?",
      choices: departmentChoices,
    },
  ]);

  const employee = await db.findAllEmployeesByDepartment(departmentId);
  console.log("\n");
  console.table(employee);
  loadInitialPrompts();
}

async function viewEmployeesByManager() {
  const manager = await db.findAllEmployees();

  const managerChoices = manager.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  const { managerId } = await prompt([
    {
      type: "list",
      name: "managerId",
      message: "Select a manager and see who reports to them.",
      choices: managerChoices,
    },
  ]);

  const employee = await db.findAllEmployeesByManager(managerId);
  console.log("\n");
  if (employee.lenth === 0) {
    console.log(
      "The manager you chose has no employees working under them at this time."
    );
  } else {
    console.table(employee);
  }
  loadInitialPrompts();
}

async function updateEmployeeRole() {
  const employee = await db.findAllEmployees();

  const employeeChoices = employee.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's role do you want to update?",
      choices: employeeChoices,
    },
  ]);

  const role = await db.findAllRoles();

  const roleChoices = role.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "Which role do you want to assign to the employee you selected?",
      choices: roleChoices,
    },
  ]);

  await db.updateEmployeeRole(employeeId, roleId);
  console.log("You've successfully updated this employee's role.");
  loadInitialPrompts();
}

async function updateEmployeeManager() {
  const employee = await db.findAllEmployees();

  const employeeChoices = employee.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message:
        "Which of these employees would you like to update the manager of?",
      choices: employeeChoices,
    },
  ]);

  const manager = await db.findAllManagers(employeeId);

  const managerChoices = manager.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  const { managerId } = await prompt([
    {
      type: "list",
      name: "managerId",
      message:
        "Which of these employees would you like to set as your selected employee's manager?",
      choices: managerChoices,
    },
  ]);

  await db.updateEmployeeManager(employeeId, managerId);
  loadInitialPrompts();
}

async function viewRoles() {
  const role = await db.findAllRoles();
  console.log("\n");
  console.table(role);
  loadInitialPrompts();
}

async function addRole() {
  const department = await db.findAllDepartments();

  const departmentChoices = department.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const role = await prompt([
    {
      name: "title",
      message: "What is the name of the new role?",
    },
    {
      name: "salary",
      message: "What is the salary of the new role?",
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department does the role belong to?",
      choices: departmentChoices,
    },
  ]);

  await db.createRole(role);
  console.log(
    `You've successfully added ${role.title} as a new role to the database.`
  );
  loadInitialPrompts();
}

async function removeRole() {
  const role = await db.findAllRoles();

  const roleChoices = role.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message:
        "Which role do you want to remove? THIS WILL REMOVE ANY EMPLOYEES LISTED UNDER THIS ROLE.",
      choices: roleChoices,
    },
  ]);

  await db.removeRole(roleId);
  console.log("You've successfully removed this role from the database.");
  loadInitialPrompts();
}

async function viewDepartments() {
  const department = await db.findAllDepartments();
  console.log("\n");
  console.table(department);
  loadInitialPrompts();
}

async function addDepartment() {
  const department = await prompt([
    {
      name: "name",
      message: "What is the name of the department that you want to add?",
    },
  ]);

  await db.createDepartment(department);
  console.log(
    `You've successfully added ${department.name} as a new department to the database.`
  );
  loadInitialPrompts();
}

async function removeDepartment() {
  const department = await db.findAllDepartments();

  const departmentChoices = department.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const { departmentId } = await prompt([
    {
      type: "list",
      message:
        "Which of the following departments would you like to remove? THIS WILL REMOVE ANY ROLES OR EMPLOYEES WITHIN THIS DEPARTMENT.",
      choices: departmentChoices,
    },
  ]);

  await db.removeDepartment(departmentId);
  console.log(`You've successfully removed this department from the database`);
  loadInitialPrompts();
}

async function addEmployee() {
  const role = await db.findAllRoles();

  const employee = await prompt([
    {
      name: "first_name",
      message: "What is the new employee's first name?",
    },
    {
      name: "last_name",
      message: "What is the employee's last name?",
    },
  ]);

  const employees = await db.findAllEmployees();

  const roleChoices = role.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await prompt({
    type: "list",
    name: "roleId",
    message: "What is the new employee's role?",
    choices: roleChoices,
  });
  employee.role_id = roleId;

  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));
  managerChoices.unshift({ name: "None", value: null });

  const { managerId } = await prompt({
    type: "list",
    name: "managerId",
    message: "Who is the new employee's manager?",
    choices: managerChoices,
  });
  employee.manager_id = managerId;

  await db.createEmployee(employee);
  console.log(
    `You've successfully added ${employee.first_name} ${employee.last_name} to the database.`
  );
  loadInitialPrompts();
}

async function removeEmployee() {
  const employee = await db.findAllEmployees();

  const employeeChoices = employee.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee do you want to remove?",
      choices: employeeChoices,
    },
  ]);

  await db.removeEmployee(employeeId);
  console.log("You've successfully removed this employee from the database.");
  loadInitialPrompts();
}

function quit() {
  console.log("Goodbye");
  process.exit();
}
