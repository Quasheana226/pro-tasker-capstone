import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

// Define the shape of a project object
interface Project {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

// Placeholder for dashboard page
const DashboardPage = () => {
    const { user, logout } = useAuth(); // Get current user and logout function from auth context
    const navigate = useNavigate(); // Get navigate function for redirection
    const [projects, setProjects] = useState<Project[]>([]); // State to hold list of projects
    const [loading, setLoading] = useState(true); //  State to track loading status of projects
    const [error, setError] = useState(""); // State to hold any error messages
    const [showForm, setShowForm] = useState(false); //  State to control visibility of new project form
    const [name, setName] = useState(""); //    State to hold new project name input
    const [description, setDescription] = useState(""); // State to hold new project description input
    const [creating, setCreating] = useState(false); //  State to track loading status of project creation

    //Fetch projects on load
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await api.get("/projects"); // Call backend API to get projects
                setProjects(data); // Store projects in state
            } catch (err: any) {
                setError("Failed to load projects"); // Show error message if API call fails
            } finally {
                setLoading(false); // Set loading to false once API call is complete
            }
        };

        fetchProjects();
    }, []);

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form from submitting normally
        setError(""); // Clear any existing error messages
        setCreating(true); // Set creating state to true to show loading indicator
        try {
            const { data } = await api.post("/projects", { name, description }); // Call backend API to create new project
            setProjects([...projects, data]); // Add new project to existing list in state
            setShowForm(false); // Hide the form after successful creation
            setName(""); // Clear the name input field
            setDescription(""); // Clear the description input field
        } catch (err: any) {
            setError("Failed to create project"); // Show error message if API call fails
        } finally {
            setCreating(false); // Set creating to false once API call is complete
        }
    };
    const handleLogout = () => {
        logout(); // Call logout function from context to clear user data
        navigate("/login"); // Redirect to login page after logout
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white">
            {/* Navbar */}
            <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                        <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                        </svg>
                    </div>
                    <span className="font-bold text-lg">Forge</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-white/40">Hey, {user?.name} 👋</span>
                    <button
                        onClick={handleLogout}
                        className="text-sm text-white/40 hover:text-white transition"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main content */}
            <div className="max-w-5xl mx-auto px-6 py-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold">Your Projects</h1>
                        <p className="text-white/40 text-sm mt-1">
                            Manage and track all your work
                        </p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
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
                        <div
                            key={project._id}
                            onClick={() => navigate(`/projects/${project._id}`)}
                            className="bg-white/5 border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-violet-500/50 hover:bg-white/8 transition group"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-8 h-8 rounded-lg bg-violet-600/20 flex items-center justify-center">
                                    <svg
                                        className="w-4 h-4 text-violet-400"
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
                                <svg
                                    className="w-4 h-4 text-white/20 group-hover:text-violet-400 transition"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-white mb-1">{project.name}</h3>
                            <p className="text-white/40 text-xs line-clamp-2">
                                {project.description || "No description"}
                            </p>
                            <p className="text-white/20 text-xs mt-3">
                                {new Date(project.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
