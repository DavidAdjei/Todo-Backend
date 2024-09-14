exports.createDb = `CREATE DATABASE IF NOT EXISTS bscrxbonnkdukldwjvtl`;
exports.useDb = "USE bscrxbonnkdukldwjvtl";
exports.createUserTable = `CREATE TABLE IF NOT EXISTS users(
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            username VARCHAR(200) NOT NULL,
                            email VARCHAR(200) NOT NULL UNIQUE,
                            password VARCHAR(300) NOT NULL,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
exports.createTodoTable = `CREATE TABLE IF NOT EXISTS todos(
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            user_id INT,
                            description TEXT NOT NULL,
                            is_completed BOOLEAN DEFAULT FALSE,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)`;
