const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams lets us access :projectId from parent route
const { protect } = require('../middleware/authMiddleware');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

router.route('/').get(protect, getTasks).post(protect, createTask);
router.route('/:taskId').put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;