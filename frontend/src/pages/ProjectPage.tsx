import { useState, useEffect, type SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import TaskCard, { type Task } from "../components/TaskCard";
import useTasks from "../hooks/useTasks";

interface Project {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

const COLUMNS: { label: Task["status"]; color: string; dot: string }[] = [
    { label: "To Do",       color: "border-white/10",        dot: "bg-white/30" },
    { label: "In Progress", color: "border-violet-500/40",   dot: "bg-violet-400" },
    { label: "Done",        color: "border-emerald-500/40",  dot: "bg-emerald-400" },
];

const ProjectPage = () => {
    const { projectId: id } = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [projectLoading, setProjectLoading] = useState(true);
    const [projectError, setProjectError] = useState("");

    const [addingTo, setAddingTo] = useState<Task["status"] | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [creating, setCreating] = useState(false);

    const { tasks, loading: tasksLoading, error: tasksError, createTask, updateTaskStatus, deleteTask } = useTasks(id);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const { data } = await api.get(`/projects/${id}`);
                setProject(data);
            } catch (err: any) {
                setProjectError(err.response?.data?.message || "Failed to load project");
            } finally {
                setProjectLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    const handleCreateTask = async (e: SyntheticEvent, status: Task["status"]) => {
        e.preventDefault();
        setCreating(true);
        await createTask(title, description, status);
        setTitle("");
        setDescription("");
        setAddingTo(null);
        setCreating(false);
    };

    const loading = projectLoading || tasksLoading;
    const error = projectError || tasksError;

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
            <Navbar showBack title={project?.name} subtitle={project?.description} />

            {/* Board */}
            <div className="flex-1 overflow-x-auto px-6 py-8">
                <div className="flex gap-4 h-full min-w-max mx-auto w-fit">
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
                                            setTitle("");
                                            setDescription("");
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
                                        <TaskCard
                                            key={task._id}
                                            task={task}
                                            onStatusChange={updateTaskStatus}
                                            onDelete={deleteTask}
                                        />
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
                                                    {creating ? "Adding..." : "Add"}
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
