use employeetracker_db;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES 
    ('Sales Lead', 100000, 1),
    ('Salesperson', 75000, 1),
    ('Lead Engineer', 170000, 2),
    ('Software Engineer', 115000, 2),
    ('Account Manager', 165000, 3),
    ('Accountant', 120000, 3),
    ('Legal Team Lead', 275000, 4),
    ('Lawyer', 180000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Georgia', 'Frederick', 1, NULL),
    ('Ian', 'Xiong', 2, 1),
    ('Samara', 'Andrews', 3, NULL),
    ('Lorenzo', 'Morrison', 4, 3),
    ('Digby', 'Livingston', 5, NULL),
    ('Sanya', 'Carr', 6, 5),
    ('Jenson', 'Montgomery', 7, NULL),
    ('Sannah', 'Lloyd', 8, 7);