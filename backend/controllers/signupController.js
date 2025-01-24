const bcrypt = require('bcryptjs');
const db = require('../models/db');

// Signup user
exports.signup = (req, res) => {
    const { fullname, email, password } = req.body;

    // Check if the email is already registered
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error', details: err.message });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Hash the password before storing it in the database
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ message: 'Error hashing password', details: err.message });
            }

            // Insert the new user into the database
            const query = 'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)';
            db.query(query, [fullname, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ message: 'Error saving user to database', details: err.message });
                }

                res.status(201).json({
                    message: 'User registered successfully',
                    user: { fullname, email },
                });
            });
        });
    });
};
