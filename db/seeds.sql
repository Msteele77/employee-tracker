USE employee_tracker;

INSERT INTO department (name)
VALUES
    ('Sales'), 
    ('Finance'), 
    ('Legal'),
    ('Engineering');


INSERT INTO role (title, salary, department_id)
VALUES
    ('Software Engineer', 125000, 1),
    ('Lawyer', 180000, 2),
    ('Sales Person', 70000, 4),
    ('Lead Engineer', 120000, 4),
    ('Legal Team Leader', 100000, 3),
    ('Accountant', 95000, 1),
    ('Sales Lead', 97000, 3);


INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES
    ('Jessica', 'Smith', null, 1),
    ('Joe', 'Johnson', 1, 2),
    ('Jill', 'Jones', null, 3),
    ('John', 'Wilson', 2, 4),
    ('Miller', 'Brown', null, 3);


