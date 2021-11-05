DROP DATABASE IF EXISTS `company_db`;
CREATE DATABASE `company_db`;
USE `company_db`;

CREATE TABLE department(
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR (30) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE roles(
    id INT UNSIGNED AUTO_INCREMENT,
    title VARCHAR (30) NOT NULL UNIQUE,
    salary DECIMAL UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL,
      INDEX dep_ind (department_id),
      PRIMARY KEY (id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) 
);

CREATE TABLE employee(
    id INT UNSIGNED AUTO_INCREMENT,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    manager_id INT UNSIGNED,
    PRIMARY KEY (id),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id)
);