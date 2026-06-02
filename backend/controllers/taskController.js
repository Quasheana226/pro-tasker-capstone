const Task = require('../models/Task'); 
const Project = require('../models/Project');

// Helper confirms project exists and user is owner

const verifyProjectOwnership = async (projectId, userId) => {
    const project = await Project.findById(projectId);
    if (!project) return null; // Project not found
    if (project.owner.toString() !== userId.toString()) return null; // Not owner
    return project; // Valid project and ownership
};

// GET /api/projects/:projectId/tasks

const getTasks = async (req, res) => {
    try {
        const project = await verifyProjectOwnership(req.params.projectId, req.user._id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found or unauthorized' });
        }
        const tasks = await Task.find({ project: req.params.projectId });
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });

    
    }
};

// POST /api/projects/:projectId/tasks
const createTask = async (req, res) => {
    const { title, description, status } = req.body;
    try{
        const project = await verifyProjectOwnership(req.params.projectId, req.user._id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found or unauthorized' });
        }
        const task = await Task.create({
            title,
            description,
            status,
            project: req.params.projectId
        });
        res.status(201).json(task); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @route  DELETE /api/projects/:projectId/tasks/:taskId
const deleteTask = async (req, res) => {
  try {
    const project = await verifyProjectOwnership(req.params.projectId, req.user._id);
    if (!project) return res.status(403).json({ message: 'Not authorized' });

    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/projects/:projectId/tasks/:taskId
const updateTask = async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const project = await verifyProjectOwnership(req.params.projectId, req.user._id);
        if (!project) return res.status(403).json({ message: 'Not authorized' });

        const task = await Task.findById(req.params.taskId);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (title) task.title = title;
        if (description) task.description = description;
        if (status) task.status = status;

        const updated = await task.save();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };