DROP DATABASE IF EXISTS hrDB;
CREATE database hrDB;
USE hrDB;

CREATE TABLE depTable (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  departmentName VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roleTable (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  departmentId INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employeeTable (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY (id)
);


-- Inserted a set of records into the table
-- INSERT INTO employeeTable (first_name, last_name, role_id, manager_id )
-- VALUES ("Maria", "Dawes", 1, 1);


-- INSERT INTO employeeTable (first_name, last_name, role_id, manager_id )
-- VALUES ("Melina", "Ustinov", 2, 2);






-- Inserted a set of records into the table
INSERT INTO roleTable (title, salary, departmentId)
VALUES ("Sales Manager", 156000, 1);

INSERT INTO roleTable (title, salary, departmentId)
VALUES ("Software Engineer", 137000, 2);

INSERT INTO roleTable (title, salary, departmentId)
VALUES ("Accountant", 105000, 3);

INSERT INTO roleTable (title, salary, departmentId)
VALUES ("Lawyer", 205000, 4);

INSERT INTO roleTable (title, salary, departmentId)
VALUES ("Project Manager", 145000, 5);



INSERT INTO depTable (departmentname)
VALUES ("Sales");

INSERT INTO depTable (departmentname)
VALUES ("IT");

INSERT INTO depTable (departmentname)
VALUES ("Finance");

INSERT INTO depTable (departmentname)
VALUES ("Legal");

INSERT INTO depTable (departmentname)
VALUES ("PMO");

SELECT * FROM roleTable;
SELECT * FROM depTable;
SELECT * FROM employeeTable;
