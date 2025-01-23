const db = require('../models/db');
const axios = require('axios');

exports.collectData = async (req, res) => {
    const { name, roll_number } = req.body;

    try {
        console.log('Received from User:', { name, roll_number });

        // Check if the name and roll number already exist in the database
        const checkQuery = 'SELECT * FROM students WHERE name = ? AND roll_number = ?';
        db.query(checkQuery, [name, roll_number], async (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Error checking database for existing data', details: err.message });
            }

            // If a record with the same name and roll number exists, do not proceed with saving the data
            if (result.length > 0) {
                return res.status(400).json({ message: 'Data already exists in the database', details: 'Name and roll number already present' });
            }

            try {
                // Forward data to FastAPI
                const response = await axios.post('http://localhost:8000/collect-data', { name, roll_number });
                console.log('FastAPI Response:', response.data);

                // Validate FastAPI response
                if (!response.data || typeof response.data !== 'object') {
                    throw new Error('Invalid response from FastAPI');
                }

                // Save to database
                const query = 'INSERT INTO students (name, roll_number) VALUES (?, ?)';
                db.query(query, [name, roll_number], (err, result) => {
                    if (err) {
                        console.error('Database error:', err);
                        return res.status(500).json({ message: 'Error saving data to database', details: err.message });
                    }

                    res.status(200).json({ message: 'Data saved and forwarded successfully', fastapiResponse: response.data });
                });
            } catch (error) {
                console.error('Error in forwarding data to FastAPI:', error);
                res.status(500).json({ message: 'Error forwarding data to FastAPI', details: error.message });
            }
        });
    } catch (error) {
        console.error('Error in collectData:', error);
        res.status(500).json({ message: 'Error saving data or forwarding to FastAPI', details: error.message });
    }
};
