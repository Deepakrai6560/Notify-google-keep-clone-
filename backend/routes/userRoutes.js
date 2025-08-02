const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register
router.post('/register', userController.register);
// Login
router.post('/login', userController.login);
// Get profile (protected)
router.get('/profile', userController.getProfile);
// Update profile (protected)
router.put('/profile', userController.updateProfile);

module.exports = router;
