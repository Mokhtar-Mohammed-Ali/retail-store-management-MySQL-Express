//Part2: Design a schema (Mapping) for the following ERD. (Use any design tool you want)


// CREATE TABLE IF NOT EXISTS Users (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     firstName VARCHAR(50),
//     lastName VARCHAR(50),
//     username VARCHAR(50),
//     phone VARCHAR(20),
//     email VARCHAR(100),
//     role VARCHAR(20),
//     password VARCHAR(255)
// );


// CREATE TABLE IF NOT EXISTS UserPhones (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     phone VARCHAR(20),
//     user_id INT,
//     FOREIGN KEY (user_id) REFERENCES Users(id)
// );


// CREATE TABLE IF NOT EXISTS Products (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     name VARCHAR(100),
//     price DECIMAL(10,2),
//     stock INT,
//     isDeleted BOOLEAN DEFAULT FALSE,
//     user_id INT,
//     FOREIGN KEY (user_id) REFERENCES Users(id)
// );
