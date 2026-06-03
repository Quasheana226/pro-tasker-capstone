import { useState, useRef, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useProjects from "../hooks/useProjects";

const TiltCard = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const card = ref.current;
        if (!card) return;
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
    };

    const handleMouseLeave = () => {
        const card = ref.current;
        if (!card) return;
        card.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)";
    };

    return (
        <div
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transition: "transform 0.15s ease, border-color 0.2s ease" }}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-violet-500/50 hover:bg-white/[0.08] min-h-[180px] flex flex-col justify-between group will-change-transform"
        >
            {children}
        </div>
    );
};

const DashboardPage = () => {
    const navigate = useNavigate(); // Get navigate function for redirection
    const [showForm, setShowForm] = useState(false); // State to control visibility of new project form
    const [name, setName] = useState(""); // State to hold new project name input
    const [description, setDescription] = useState(""); // State to hold new project description input
    const [creating, setCreating] = useState(false); // State to track loading status of project creation

    // Pull all project state and actions from the custom hook
    const { projects, loading, error, createProject, deleteProject } = useProjects();

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        await createProject(name, description); // Delegate to hook — errors handled internally
        setName("");
        setDescription("");
        setShowForm(false);
        setCreating(false);
    };

return (
        <div className="min-h-screen bg-[#0a0a0f] text-white">
            <Navbar />

            {/* Main content */}
            <div className="max-w-5xl mx-auto px-6 py-10">
                {/* Header */}
                <div className="relative flex items-center justify-center mb-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Your Projects</h1>
                        <p className="text-white/40 text-sm mt-1">
                            Manage and track all your work
                        </p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="absolute right-0 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
                    >
                        + New Project
                    </button>
                </div>

                {/* Create project form */}
                {showForm && (
                    <form
                        onSubmit={handleCreateProject}
                        className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4"
                    >
                        <h2 className="font-semibold text-white">New Project</h2>
                        <input
                            type="text"
                            placeholder="Project name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
                        />
                        <textarea
                            placeholder="Description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition resize-none"
                        />
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={creating}
                                className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
                            >
                                {creating ? "Creating..." : "Create Project"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="text-sm text-white/40 hover:text-white transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {/* Error state */}
                {error && (
                    <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                    </div>
                )}
                {/* Loading state */}
                {loading && (
                    <div className="text-white/40 text-sm">Loading projects...</div>
                )}

                {/* Empty state */}
                {!loading && projects.length === 0 && (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
                        <p className="text-white/40 text-sm">No projects yet.</p>
                        <p className="text-white/20 text-xs mt-1">
                            Click "New Project" to get started
                        </p>
                    </div>
                )}

                {/* Projects grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project) => (
                        <TiltCard
                            key={project._id}
                            onClick={() => navigate(`/projects/${project._id}`)}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-10 h-10 rounded-xl bg-violet-600/20 flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-violet-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                        />
                                    </svg>
                                </div>
                                <button
                                    onClick={e => { e.stopPropagation(); deleteProject(project._id); }}
                                    className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 transition"
                                    title="Delete project"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                            <h3 className="font-semibold text-white mb-1">{project.name}</h3>
                            <p className="text-white/40 text-xs line-clamp-2">
                                {project.description || "No description"}
                            </p>
                            <p className="text-white/20 text-xs mt-3">
                                {new Date(project.createdAt).toLocaleDateString()}
                            </p>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
