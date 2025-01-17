const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup',userController.signup);
// User login route
router.post('/login', userController.login);

// Protected route (get user profile)
router.get('/me', userController.protect, userController.getMyProfile);

module.exports = router;

