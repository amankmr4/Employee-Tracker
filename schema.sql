DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;
CREATE TABLE department (
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) DEFAULT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE role (
    id int NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) DEFAULT NULL,
    salary DECIMAL,
    department_id INT DEFAULT null,
    PRIMARY KEY (id)
);
CREATE TABLE employee (
    id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) DEFAULT NULL,
    last_name VARCHAR(30) DEFAULT NULL,
    role_id INT NOT NULL,
    manager_id INT DEFAULT null,
    PRIMARY KEY (id)
);