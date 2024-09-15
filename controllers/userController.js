const User = require('../models/userModel');
const { hashPassword, comparePassword, generateToken } = require('../helpers/userHelpers');
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

        const token = generateToken(newUser[0].id , 'auth', '3d' );

        res.cookie('authToken', token, {
            httpOnly: true, 
            sameSite: 'none',
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 1000 * 60 * 60 * 24 * 3,
        });

    } catch (err) {
        console.error("Error creating user:", err);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

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
                error: "Incorrect credentials"
            });
        }
        
        const token = generateToken(existingUser[0].id , 'auth', '3d' );
        res.cookie('authToken', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 3,
        });
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
    const token = req.cookies.authToken;
    console.log(req.cookies);

    if (!token) {
        return res.status(403).json({ error: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.type !== "auth") {
            return res.status(400).json({ error: "Invalid token" });
        }
        req.userId = decoded.id; 
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(403).json({ error: "Not authenticated" });
    }
};

exports.authenticate = async (req, res) => {
    const id = req.userId;

    console.log(req.userId);
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
        console.error("Error fetching user:", err);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

exports.logout = (req, res) => {
    res.cookie('authToken', '', {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        expires: new Date(0) 
    });
    return res.status(200).json({
        message: "Successfully logged out"
    });
};

