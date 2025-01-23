const db = require('../models/db');

// Fetch students who are present
exports.getStudentDetails = (req, res) => {
    db.query('SELECT * FROM students WHERE status = "Present"', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching student details' });
        res.json({ students: results });
    });
};
