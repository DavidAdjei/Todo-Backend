const db = require('../config/db');


exports.allTodos = (userId, callback) => {
    const query = "SELECT * FROM todos WHERE user_id = ?";
    db.query(query, [userId], callback);
}

exports.allCompletedTodos = (userId, callback) => {
    const query = "SELECT * FROM todos WHERE user_id = ? AND is_completed = ?";
    db.query(query, [userId, 1], callback)
}

exports.allInCompletedTodos = (userId, callback) => {
    const query = "SELECT * FROM todos WHERE user_id = ? AND is_completed = ?";
    db.query(query, [userId, 0], callback)
}

exports.createTodo = (userId, description, callback) => {
    const query = 'INSERT INTO todos (user_id, description) VALUES (?, ?)';
    db.query(query, [userId, description], callback);
}

exports.editTodo = (todoId, userId, description, callback) => {
    const query = "UPDATE todos SET description = ? WHERE user_id = ? AND id = ?";
    db.query(query, [description, userId, todoId], callback);
}

exports.handleCompleted = (todoId, userId, completed, callback) => {
    const query = "UPDATE todos SET is_completed = ? WHERE user_id = ? AND id = ?";
    db.query(query, [completed, userId, todoId], callback);
}

exports.delete = (todoId, userId, callback) => {
    const query = "DELETE FROM todos WHERE id = ? AND user_id = ?";
    db.query(query, [todoId, userId], callback);
}

exports.deleteAllCompleted = ( userId, callback) => {
    const query = "DELETE FROM todos WHERE user_id = ? AND is_completed = ?";
    db.query(query, [ userId, true], callback);
}


