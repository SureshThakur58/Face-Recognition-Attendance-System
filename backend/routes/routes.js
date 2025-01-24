const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const dataController = require('../controllers/dataController');
const trainController = require('../controllers/trainController');
const recognitionController = require('../controllers/recognitionController');
const studentController = require('../controllers/studentController');
const signupController = require('../controllers/signupController');

// Login route
router.post('/login', authController.login);

// Signup route
router.post('/signup', signupController.signup);

// Data collection route
router.post('/collect-data', dataController.collectData);

// Train model route
router.post('/train', trainController.trainModel);

// Face recognition route
router.post('/recognize', recognitionController.recognizeFace);

// Get student details (present students)
router.get('/students', studentController.getStudentDetails);

module.exports = router;
