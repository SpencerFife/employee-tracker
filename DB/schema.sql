DROP DATABASE IF EXISTS employeetracker_db;

CREATE database employeetracker_db;

USE employeetracker_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    dep_name varchar(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title varchar(30) NULL,
    salary DECIMAL (10,4) NULL,
    department_id INT (10) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name varchar(30) NULL,
    last_name varchar(30) NULL,
    role_id INT (30) NOT NULL,
    manager_id INT (30) NULL,
    PRIMARY KEY (id)
);
