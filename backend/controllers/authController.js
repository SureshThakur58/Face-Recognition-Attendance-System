const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const mysql = require('mysql2');

// Login user
exports.login = (req, res) => {
    const { user_id, password } = req.body;
    
    db.query('SELECT * FROM users WHERE user_id = ?', [user_id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (results.length === 0) return res.status(400).json({ message: 'User not found' });

        const user = results[0];

        // Directly compare plain text passwords
        if (password === user.password) {
            const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.json({
                message: "Login Successfully",
                token
            });
            
        } else {
            return res.status(400).json({ message: 'Invalid password' });
        }
    });
};
