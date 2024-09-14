const pool = require('../config/db');

exports.createUser = async (username, email, password) => {
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    try {
        const [result] = await pool.query(query, [username, email, password]);
        return result;
    } catch (err) {
        console.error('Error inserting user:', err);
        throw err;
    }
};

exports.findUser = async (email) => {
    const query = 'SELECT id, username, email, password FROM users WHERE email = ?';
    try {
        const [rows] = await pool.query(query, [email]);
        return rows;
    } catch (err) {
        console.error('Error finding user by email:', err);
        throw err;
    }
};

exports.findUserByEmail = async (email) => {
    const query = 'SELECT id, username, email FROM users WHERE email = ?';
    try {
        const [rows] = await pool.query(query, [email]);
        return rows;
    } catch (err) {
        console.error('Error finding user by email:', err);
        throw err;
    }
};

exports.findUserById = async (id) => {
    const query = 'SELECT id, username, email FROM users WHERE id = ?';
    try {
        const [rows] = await pool.query(query, [id]);
        return rows;
    } catch (err) {
        console.error('Error finding user by ID:', err);
        throw err;
    }
};

