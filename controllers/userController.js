const User = require('../models/userModel');
const db = require("../config/db");
const { hashPassword, comparePassword } = require('../helpers/userHelpers');
const jwt = require('jsonwebtoken');

function generateToken(user, type, expiresIn) {
    return jwt.sign({ _id: user.id, type }, process.env.JWT_SECRET, { expiresIn });
}

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body)

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
        console.log(hashedPassword)

        const result = await User.createUser(username, email, hashedPassword);
        const userId = result.insertId;

        const newUser = await User.findUserById(userId);

        if (newUser.length === 0) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        const token = generateToken(newUser[0], 'auth', '7d');
        return res.status(200).json({
            token,
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
        
        const token = generateToken(existingUser[0], 'auth', '7d');
        return res.status(200).json({
            token,
            user: existingUser[0]
        });

    } catch (err) {
        console.error("Error logging in user:", err);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
};