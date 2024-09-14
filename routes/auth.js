const express = require('express');
const { createUser, loginUser, isAuth, authenticate } = require('../controllers/userController');

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/authenticate', isAuth, authenticate);

module.exports = router;