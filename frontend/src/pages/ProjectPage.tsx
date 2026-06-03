import { useState, useEffect, type SyntheticEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

interface Project {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

interface Task {
    _id: string;
    title: string;
    description: string;
    status: "To Do" | "In Progress" | "Done"; // Task status with limited string values
    projectId: string;
    createdAt: string;
    updatedAt: string;
}

const COLUMNS: { label: Task["status"]; color: string; dot: string }[] = [
    { label: "To Do",      color: "border-white/10",       dot: "bg-white/30" },
    { label: "In Progress", color: "border-violet-500/40", dot: "bg-violet-400" },
    { label: "Done",        color: "border-emerald-500/40", dot: "bg-emerald-400" },
];

const ProjectPage = () => {
    // Get projectId from URL params
    const { projectId: id } = useParams();// New state to hold project details
    const navigate = useNavigate();//   New state to hold tasks for this project
    const [project, setProject] = useState<Project | null>(null);// New state to hold project details
    const [tasks, setTasks] = useState<Task[]>([]);// New state to hold tasks for this project
    const [loading, setLoading] = useState(true);// New loading state
    const [error, setError] = useState("");// New state for error handling
    // Which column's inline form is open (null = none)
    const [addingTo, setAddingTo] = useState<Task["status"] | null>(null);
    const [title, setTitle] = useState("");// New state for new task title
    const [description, setDescription] = useState("");
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectRes, tasksRes] = await Promise.all([
                    api.get(`/projects/${id}`), // Fetch project details
                    api.get(`/projects/${id}/tasks`) // Fetch tasks for this project
                ]);
                setProject(projectRes.data);
                setTasks(tasksRes.data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to load project');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // Handler for creating a new task
    const handleCreateTask = async (e: SyntheticEvent, status: Task["status"]) => {
        e.preventDefault();
        setCreating(true);
        try {
            const { data } = await api.post(`/projects/${id}/tasks`, {
                title,
                description,
                status, // New tasks start in the column they were added to
            });
            setTasks([...tasks, data]);
            setTitle(''); // Clear form
            setDescription('');
            setAddingTo(null); // Hide form after creation
        } catch (err: any) {
            setError('Failed to create task');
        } finally {
            setCreating(false);
        }
    };

    const handleStatusChange = async (taskId: string, newStatus: Task["status"]) => {
        try {
            await api.put(`/projects/${id}/tasks/${taskId}`, { status: newStatus });
            setTasks(tasks.map(task => task._id === taskId ? { ...task, status: newStatus } : task));
        } catch (err: any) {
            setError('Failed to update task status');
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white/40 text-sm">
            Loading...
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
            <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
            {/* Navbar */}
            <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <span className="font-bold text-lg">Forge</span>
                </div>

                {/* Project title in the center of the navbar */}
                <div className="absolute left-1/2 -translate-x-1/2 text-center hidden sm:block">
                    <p className="font-semibold text-white">{project?.name}</p>
                    {project?.description && (
                        <p className="text-white/30 text-xs">{project.description}</p>
                    )}
                </div>

                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-sm text-white/40 hover:text-white transition"
                >
                
                    &larr; Dashboard 
                </button>
            </nav>

            {/* Board */}
            <div className="flex-1 overflow-x-auto px-6 py-8">
                <div className="flex gap-4 h-full min-w-max">
                    {COLUMNS.map(col => {
                        const colTasks = tasks.filter(t => t.status === col.label);
                        return (
                            <div
                                key={col.label}
                                className={`flex flex-col w-72 bg-white/[0.03] border ${col.color} rounded-2xl overflow-hidden`}
                            >
                                {/* Column header */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                                        <span className="text-sm font-semibold text-white/80">{col.label}</span>
                                        <span className="text-xs text-white/30 bg-white/5 rounded-full px-2 py-0.5">
                                            {colTasks.length}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setAddingTo(col.label);
                                            setTitle('');
                                            setDescription('');
                                        }}
                                        className="text-white/30 hover:text-white transition text-lg leading-none"
                                        title="Add task"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Cards */}
                                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                                    {colTasks.map(task => (
                                        <div
                                            key={task._id}
                                            className="bg-white/5 hover:bg-white/[0.08] border border-white/10 rounded-xl p-4 group transition cursor-default"
                                        >
                                            <p className="text-sm font-medium text-white leading-snug">{task.title}</p>
                                            {task.description && (
                                                <p className="text-xs text-white/40 mt-1 leading-relaxed">{task.description}</p>
                                            )}
                                            {/* Move-to buttons — shown on hover */}
                                            <div className="mt-3 flex gap-1 flex-wrap opacity-0 group-hover:opacity-100 transition">
                                                {COLUMNS.filter(c => c.label !== task.status).map(c => (
                                                    <button
                                                        key={c.label}
                                                        onClick={() => handleStatusChange(task._id, c.label)}
                                                        className="text-[10px] text-white/40 hover:text-white border border-white/10 hover:border-white/30 rounded-md px-2 py-0.5 transition"
                                                    >
                                                        → {c.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Inline add-task form */}
                                    {addingTo === col.label && (
                                        <form
                                            onSubmit={e => handleCreateTask(e, col.label)}
                                            className="bg-white/5 border border-violet-500/40 rounded-xl p-3 space-y-2"
                                        >
                                            <input
                                                autoFocus
                                                type="text"
                                                placeholder="Task title"
                                                value={title}
                                                onChange={e => setTitle(e.target.value)}
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500 transition"
                                            />
                                            <textarea
                                                placeholder="Description (optional)"
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                                rows={2}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500 transition resize-none"
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    type="submit"
                                                    disabled={creating}
                                                    className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                                                >
                                                    {creating ? 'Adding...' : 'Add'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setAddingTo(null)}
                                                    className="text-xs text-white/30 hover:text-white transition"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {/* Empty column state */}
                                    {colTasks.length === 0 && addingTo !== col.label && (
                                        <div className="text-center py-8">
                                            <p className="text-white/20 text-xs">No tasks</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProjectPage;
