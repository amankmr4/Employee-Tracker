INSERT INTO department (name)
VALUES ('sales');
INSERT INTO department (name)
VALUES ('engineering');
INSERT INTO department (name)
VALUES ('Customer Service');
INSERT INTO roles (title, salary, department_id)
VALUES ('Intern', 30000, 3);
INSERT INTO roles (title, salary, department_id)
VALUES ('Manager', 100000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ('Senior Network Engineer', 90000, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ravina', 'Prakash', 1, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Aman', 'Kumar', 2, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Sheenal', 'Kumar', 3, 2);