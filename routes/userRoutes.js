// api.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController'); 

// Register route
router.post('/', UserController.createUser); 
router.post('/login', UserController.loginUser); 
router.post('/test', UserController.testPassword); 

// Other routes...

module.exports = router;
