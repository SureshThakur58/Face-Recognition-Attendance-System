const { exec } = require('child_process');

// Call Python script to recognize face
exports.recognizeFace = (req, res) => {
    exec('python3 ./python_scripts/recognize_face.py', (err, stdout, stderr) => {
        if (err) {
            console.error('Error recognizing face:', err);
            return res.status(500).json({ message: 'Error recognizing face' });
        }
        res.json({ message: 'Face recognized', output: stdout });
    });
};
