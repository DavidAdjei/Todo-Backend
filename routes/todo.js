const express = require('express');
const { createTodo, edit, checked, deleteTodo, getTodos, getAllCompletedTodos, getAllInCompletedTodos, deleteAllCompletedTodo } = require('../controllers/todoController');

const router = express.Router();

router.get('/todo/:userId', getTodos)
router.get('/todo/completed/:userId', getAllCompletedTodos)
router.get('/todo/incompleted/:userId', getAllInCompletedTodos)
router.post('/todo/:userId', createTodo);
router.put('/todo/:userId/:todoId', edit);
router.put('/todo/completed/:userId/:todoId', checked);
router.delete('/todo/allCompleted/:userId', deleteAllCompletedTodo);
router.delete('/todo/:userId/:todoId', deleteTodo);

module.exports = router;