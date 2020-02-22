DELETE DATABASE IF EXISTS employee-tracker_db;

CREATE database employee-tracker_db;

CREATE TABLE department (
    id INT NOT NULL,
    dep_name varchar(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE job (
    id INT NOT NULL,
    title varchar(30) NULL,
    salary DECIMAL (10,4) NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name varchar(30) NULL,
    last_name varchar(30) NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * FROM job;
SELECT * FROM employee;