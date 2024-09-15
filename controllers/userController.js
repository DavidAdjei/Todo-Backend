const User = require('../models/userModel');
const db = require("../config/db");
const { hashPassword, comparePassword } = require('../helpers/userHelpers');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(401).json({
            error: "All fields are required"
        });
    }
    if (password.length < 8) {
        return res.status(401).json({
            error: "Password must be more than 8 characters"
        });
    }

    try {
        const existingUser = await User.findUser(email);

        if (existingUser.length > 0) {
            return res.status(401).json({
                error: "User already exists"
            });
        }

        const hashedPassword = await hashPassword(password);
        const result = await User.createUser(username, email, hashedPassword);
        const userId = result.insertId;

        const newUser = await User.findUserById(userId);

        if (newUser.length === 0) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        req.session.user = newUser[0].id;
        return res.status(200).json({
            user: newUser[0]
        });

    } catch (err) {
        console.error("Error creating user:", err);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
};


exports.loginUser = async (req, res) => {
    const {email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json({
            error: "All fields are required"
        });
    }

    try {
        const existingUser = await User.findUser(email);

        console.log('Existing user ', existingUser);
        if (existingUser.length === 0) {
            return res.status(401).json({
                error: "User not found"
            });
        }

        const hashed = existingUser[0].password;
        const match = await comparePassword(password, hashed);
        if (!match) {
            return res.status(404).json({
                error: "Inncorrect credentials"
            })
        }
        
        req.session.user = existingUser[0].id;
        return res.status(200).json({
            user: existingUser[0]
        });
    } catch (err) {
        console.error("Error logging in user:", err);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

exports.isAuth = (req, res, next) => {
    console.log(req.session.user)
  if (req.session.user) {
    next();
  } else {
    return res.status(403).json({ error: "Not authenticated" });
  }
};

exports.authenticate = async (req, res) => {
    const id = req.session.user;
    console.log(id);
    try {
        const existingUser = await User.findUserById(id);
        if (existingUser.length === 0) {
            return res.status(401).json({
                error: "User not found"
            });
        }
        return res.status(200).json({
            user: existingUser[0]
        });
    } catch (err) {
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
};