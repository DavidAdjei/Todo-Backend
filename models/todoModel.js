// models/todoModel.js
const pool = require('../config/db');

exports.allTodos = async (userId) => {
    const query = "SELECT * FROM todos WHERE user_id = ?";
    try {
        const [rows] = await pool.query(query, [userId]);
        return rows;
    } catch (err) {
        console.error('Error fetching all todos:', err);
        throw err;
    }
};

exports.allCompletedTodos = async (userId) => {
    const query = "SELECT * FROM todos WHERE user_id = ? AND is_completed = ?";
    try {
        const [rows] = await pool.query(query, [userId, 1]);
        return rows;
    } catch (err) {
        console.error('Error fetching completed todos:', err);
        throw err;
    }
};

exports.allInCompletedTodos = async (userId) => {
    const query = "SELECT * FROM todos WHERE user_id = ? AND is_completed = ?";
    try {
        const [rows] = await pool.query(query, [userId, 0]);
        return rows;
    } catch (err) {
        console.error('Error fetching incomplete todos:', err);
        throw err;
    }
};

exports.createTodo = async (userId, description) => {
    const query = 'INSERT INTO todos (user_id, description) VALUES (?, ?)';
    try {
        const [result] = await pool.query(query, [userId, description]);
        return result;
    } catch (err) {
        console.error('Error creating todo:', err);
        throw err;
    }
};

exports.editTodo = async (todoId, userId, description) => {
    const query = "UPDATE todos SET description = ? WHERE user_id = ? AND id = ?";
    try {
        const [result] = await pool.query(query, [description, userId, todoId]);
        return result;
    } catch (err) {
        console.error('Error updating todo:', err);
        throw err;
    }
};

exports.handleCompleted = async (todoId, userId, completed) => {
    const query = "UPDATE todos SET is_completed = ? WHERE user_id = ? AND id = ?";
    try {
        const [result] = await pool.query(query, [completed, userId, todoId]);
        return result;
    } catch (err) {
        console.error('Error updating todo completion status:', err);
        throw err;
    }
};

exports.delete = async (todoId, userId) => {
    const query = "DELETE FROM todos WHERE id = ? AND user_id = ?";
    try {
        const [result] = await pool.query(query, [todoId, userId]);
        return result;
    } catch (err) {
        console.error('Error deleting todo:', err);
        throw err;
    }
};

exports.deleteAllCompleted = async (userId) => {
    const query = "DELETE FROM todos WHERE user_id = ? AND is_completed = ?";
    try {
        const [result] = await pool.query(query, [userId, 1]);
        return result;
    } catch (err) {
        console.error('Error deleting all completed todos:', err);
        throw err;
    }
};
