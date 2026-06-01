const Project = require('../models/Project');

//Get /api/projects
//Get all projects owned by the user

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.user._id });
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

//Post /api/projects
//Create a new project

const createProject = async (req, res) => {
    const { name, description } = req.body;
    try {
        const project = await Project.create({
            name,
            description,
            owner: req.user._id
        });
        res.status(201).json(project); // automatically set to logged in user as owner
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

//Get /api/projects/:id
//Get a specific project by ID

const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        //Authorization check - only owner can access
        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        res.json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

//Delete /api/projects/:id
//Delete a project by ID

const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        //Authorization check - only owner can delete
        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await project.deleteOne();
        res.json({ message: 'Project deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

//Put /api/projects/:id
//Update a project by ID

const updateProject = async (req, res) => {
    const { name, description } = req.body;
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        if (name) project.name = name;
        if (description) project.description = description;
        const updated = await project.save();
        res.json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getProjects,
    createProject,
    getProjectById,
    deleteProject,
    updateProject
};