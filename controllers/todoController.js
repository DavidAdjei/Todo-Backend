const Todo = require('../models/todoModel');

exports.getTodos = async (req, res) => {
    const { userId } = req.params;

    Todo.allTodos(userId, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                error: 'Something happened'
            })
        }
        return res.status(200).json({
            message: 'Successfully',
            todos: results
        })
    })
}

exports.getAllCompletedTodos = async (req, res) => {
    const { userId } = req.params;

    Todo.allCompletedTodos(userId, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                error: 'Something happened'
            })
        }
        console.log(results);
        return res.status(200).json({
            message: 'Successfully',
            todos: results
        })
    })
    
}

exports.getAllInCompletedTodos = async (req, res) => {
    const { userId } = req.params;

    Todo.allInCompletedTodos(userId, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                error: 'Something happened'
            })
        }
        console.log(results);
        return res.status(200).json({
            message: 'Successfully',
            todos: results
        })
    })
    
}


exports.createTodo = async (req, res) => {
    const { description } = req.body;
    const { userId } = req.params;

    Todo.createTodo(userId, description, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: 'Error creating todos',
                err: err
            })
        }

        return res.status(201).json({
            todoId: result.insertId
        })
    })
}

exports.edit = async (req, res) => {
    const { description } = req.body;
    const { userId, todoId } = req.params;

    Todo.editTodo(todoId, userId, description, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                error: "Error editing todo"
            })
        }
        return res.status(200).json({
            todoId: results.insertId
        })
        
    })
}

exports.checked = async (req, res) => {

    const { completed } = req.body;
    console.log(req.body);
    const { userId, todoId } = req.params;
    const createMessage = () => {
        if (completed) {
            return 'Todo marked as done'
        } else {
            return 'Todo marked as incompleted'
        }
    }

    Todo.handleCompleted(todoId, userId, completed, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                error: 'Something happened'
            })
        }
        console.log(results.info);
        return res.status(200).json({
            message: createMessage()
        })
    })
}

exports.deleteTodo = async (req, res) => {
    const { userId, todoId } = req.params;
    console.log(userId, todoId)
    Todo.delete(todoId, userId, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                error: "Something happened"
            })
        }
        console.log(results.info);
        return res.status(200).json({
            message: 'Todo deleted succefully'
        })
    })
}

exports.deleteAllCompletedTodo = async (req, res) => {
    const { userId } = req.params;
    console.log(req.params);
    Todo.deleteAllCompleted( userId, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                error: "Something happened"
            })
        }
        console.log(results.info);
        return res.status(200).json({
            message: 'Todo deleted succefully'
        })
    })
}
