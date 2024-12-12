CREATE DATABASE testdb;

USE testdb;

CREATE TABLE users(
 id INT PRIMARY KEY AUTO_INCREMENT, 
 first_name VARCHAR (20) NOT NULL, 
 last_name VARCHAR (20) NOT NULL, 
 email VARCHAR (20) NOT NULL 
);
