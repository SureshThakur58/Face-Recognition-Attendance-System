const bcrypt = require('bcryptjs'); // For securely hashing passwords
const jwt = require('jsonwebtoken'); // For generating authentication tokens
const db = require('../models/db'); // Your database connection

// Login user
exports.login = (req, res) => {
    const { email, password } = req.body; // Accept email and password from the frontend

    // Check if the email exists in the database
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error', details: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' }); // Return if email doesn't exist
        }

        const user = results[0]; // Get the user record from the query result

        // Compare the provided password with the stored password (supports plain text or hashed passwords)
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Password comparison error:', err);
                return res.status(500).json({ message: 'Error verifying password', details: err.message });
            }

            if (isMatch) {
                // Generate a JWT token for authentication
                const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
                return res.json({
                    message: 'Login successful',
                    token,
                });
            } else {
                return res.status(401).json({ message: 'Invalid password' }); // Invalid password response
            }
        });
    });
};
