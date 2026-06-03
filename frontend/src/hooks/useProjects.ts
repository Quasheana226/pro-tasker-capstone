import { useState, useEffect } from 'react';
import api from '../utils/api';

export interface Project {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

// Custom hook to manage projects — fetch, create, and delete
const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]); // State to hold list of projects
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(''); // State to hold any error messages

    // Fetch all projects on mount
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await api.get('/projects');
                setProjects(data);
            } catch {
                setError('Failed to load projects');
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Create a new project and append it to the list
    const createProject = async (name: string, description: string) => {
        try {
            const { data } = await api.post('/projects', { name, description });
            setProjects(prev => [...prev, data]);
        } catch {
            setError('Failed to create project');
        }
    };

    // Delete a project by ID and remove it from the list
    const deleteProject = async (projectId: string) => {
        try {
            await api.delete(`/projects/${projectId}`);
            setProjects(prev => prev.filter(p => p._id !== projectId));
        } catch {
            setError('Failed to delete project');
        }
    };

    return { projects, loading, error, createProject, deleteProject };
};

export default useProjects;
