const Todo = require('../models/todoModel');

exports.getTodos = async (req, res) => {
    const { userId } = req.params;

    try {
        const todos = await Todo.allTodos(userId);
        return res.status(200).json({
            message: 'Successfully retrieved all todos',
            todos
        });
    } catch (err) {
        console.error('Error fetching todos:', err);
        return res.status(500).json({
            error: 'Something went wrong'
        });
    }
};

exports.getAllCompletedTodos = async (req, res) => {
    const { userId } = req.params;

    try {
        const completedTodos = await Todo.allCompletedTodos(userId);
        return res.status(200).json({
            message: 'Successfully retrieved completed todos',
            todos: completedTodos
        });
    } catch (err) {
        console.error('Error fetching completed todos:', err);
        return res.status(500).json({
            error: 'Something went wrong'
        });
    }
};

exports.getAllInCompletedTodos = async (req, res) => {
    const { userId } = req.params;

    try {
        const incompleteTodos = await Todo.allInCompletedTodos(userId);
        return res.status(200).json({
            message: 'Successfully retrieved incomplete todos',
            todos: incompleteTodos
        });
    } catch (err) {
        console.error('Error fetching incomplete todos:', err);
        return res.status(500).json({
            error: 'Something went wrong'
        });
    }
};


exports.createTodo = async (req, res) => {
    const { description } = req.body;
    const { userId } = req.params;

    try {
        const result = await Todo.createTodo(userId, description);
        return res.status(201).json({
            todoId: result.insertId
        });
    } catch (err) {
        console.error('Error creating todo:', err);
        return res.status(500).json({
            error: 'Error creating todo',
            details: err.message
        });
    }
};

exports.edit = async (req, res) => {
    const { description } = req.body;
    const { userId, todoId } = req.params;

    try {
        const result = await Todo.editTodo(todoId, userId, description);
        return res.status(200).json({
            todoId: result.insertId
        });
    } catch (err) {
        console.error('Error editing todo:', err);
        return res.status(500).json({
            error: 'Error editing todo',
            details: err.message
        });
    }
};

exports.checked = async (req, res) => {
    const { completed } = req.body;
    const { userId, todoId } = req.params;

    const createMessage = () => {
        return completed ? 'Todo marked as done' : 'Todo marked as incomplete';
    };

    try {
        await Todo.handleCompleted(todoId, userId, completed);
        return res.status(200).json({
            message: createMessage()
        });
    } catch (err) {
        console.error('Error updating todo completion status:', err);
        return res.status(500).json({
            error: 'Error updating todo completion status',
            details: err.message
        });
    }
};

exports.deleteTodo = async (req, res) => {
    const { userId, todoId } = req.params;

    try {
        await Todo.delete(todoId, userId);
        return res.status(200).json({
            message: 'Todo deleted successfully'
        });
    } catch (err) {
        console.error('Error deleting todo:', err);
        return res.status(500).json({
            error: 'Error deleting todo',
            details: err.message
        });
    }
};

exports.deleteAllCompletedTodo = async (req, res) => {
    const { userId } = req.params;

    try {
        await Todo.deleteAllCompleted(userId);
        return res.status(200).json({
            message: 'All completed todos deleted successfully'
        });
    } catch (err) {
        console.error('Error deleting all completed todos:', err);
        return res.status(500).json({
            error: 'Error deleting all completed todos',
            details: err.message
        });
    }
};