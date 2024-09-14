const db = require('../config/db');

exports.createUser = async (username, email, password) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(query, [username, email, password], (err, result) => {
            if (err) {
                reject(err); 
            } else {
                resolve(result); 
            }
        });
    });
};

exports.findUser = async (email) => {
    return new Promise((resolve, reject) => { 
        const query = 'SELECT id, username, email, password FROM users WHERE email = ?';
        db.query(query, [email], (err, result) => {
            if (err) {
                reject(err); 
            } else {
                resolve(result); 
            }
        });
    });
};

exports.findUserByEmail = async (email) => {
    return new Promise((resolve, reject) => { 
        const query = 'SELECT id, username, email FROM users WHERE email = ?';
        db.query(query, [email], (err, result) => {
            if (err) {
                reject(err); 
            } else {
                resolve(result); 
            }
        });
    });
};

exports.findUserById = async (id) => {
    return new Promise((resolve, reject) => { 
        const query = 'SELECT id, username, email FROM users WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                reject(err); 
            } else {
                resolve(result); 
            }
        });
    });
};
