USE employee_tracker;


INSERT INTO department (id, name)
VALUES
    (1, 'Sales'), 
    (2, 'Finance'), 
    (3, 'Legal'),
    (4, 'Engineering');


INSERT INTO role (id, title, salary, department_id)
VALUES
    (1, 'Software Engineer', 125000, 1),
    (2, 'Lawyer', 180000, 2),
    (3, 'Sales Person', 70000, 4),
    (4, 'Lead Engineer', 120000, 4),
    (5, 'Legal Team Leader', 100000, 3),
    (6, 'Accountant', 95000, 1),
    (7, 'Sales Lead', 97000, 3);


INSERT INTO employee (id, first_name, last_name, manager_id, role_id)
VALUES
    (1, 'Jessica', 'Smith', null, 1),
    (2, 'Joe', 'Johnson', 1, 2),
    (3, 'Jill', 'Jones', null, 3),
    (4, 'John', 'Wilson', 2, 4),
    (5, 'Miller', 'Brown', null, 3);


