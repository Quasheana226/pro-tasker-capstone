import { useState, useEffect } from 'react';
import api from '../utils/api';
import { type Task } from '../components/TaskCard';

// Custom hook to manage tasks for a given project
const useTasks = (projectId: string | undefined) => {
    const [tasks, setTasks] = useState<Task[]>([]);//   State to hold list of tasks
    const [loading, setLoading] = useState(true);// State to track loading status of tasks
    const [error, setError] = useState(''); // State to hold any error messages related to task operations

    useEffect(() => {
        if (!projectId) return;
        const fetchTasks = async () => {
            try {
                const { data } = await api.get(`/projects/${projectId}/tasks`);
                setTasks(data);
            } catch {
                setError('Failed to load tasks');
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, [projectId]);

    const createTask = async (title: string, description: string, status: Task['status'] = 'To Do') => {
        try {
            const { data } = await api.post(`/projects/${projectId}/tasks`, {
                title,
                description,
                status,
            });
            setTasks(prev => [...prev, data]);
        } catch {
            setError('Failed to create task');
        }
    };

    const updateTaskStatus = async (taskId: string, status: Task['status']) => {
        try {
            const { data } = await api.put(`/projects/${projectId}/tasks/${taskId}`, { status });
            setTasks(prev => prev.map(t => t._id === taskId ? data : t));
        } catch {
            setError('Failed to update task');
        }
    };

    const deleteTask = async (taskId: string) => {
        try {
            await api.delete(`/projects/${projectId}/tasks/${taskId}`);
            setTasks(prev => prev.filter(t => t._id !== taskId));
        } catch {
            setError('Failed to delete task');
        }
    };

    return { tasks, loading, error, createTask, updateTaskStatus, deleteTask };
};

export default useTasks;
