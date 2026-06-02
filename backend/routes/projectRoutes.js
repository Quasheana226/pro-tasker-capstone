
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
    getProjects,
    createProject,
    getProjectById,
    updateProject,
    deleteProject,

} = require('../controllers/projectController');


//All peoject routes are protected must be logged in

router.route('/').get(protect, getProjects).post(protect, createProject);
router.route('/:id').get(protect, getProjectById).put(protect, updateProject).delete(protect, deleteProject);

module.exports = router;