const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');  
const { checkToken } = require("../middleware/middleware");


router.post('/', checkToken, TaskController.createTask); 
router.get('/', checkToken, TaskController.getTasks); 
router.put('/:id', checkToken, TaskController.updateTask); 
router.delete('/:id', checkToken, TaskController.deleteTask); 

module.exports = router;
