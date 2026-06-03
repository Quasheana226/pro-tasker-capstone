import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
    title?: string;       // centered project name (project page)
    subtitle?: string;    // centered subtitle under title (project page)
    showBack?: boolean;   // shows ← Dashboard instead of user info (project page)
}

const Navbar = ({ title, subtitle, showBack = false }: NavbarProps) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between shrink-0 relative">
            {/* Left: logo */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <span className="font-bold text-lg">Forge</span>
            </div>

            {/* Center: project title (optional) */}
            {title && (
                <div className="absolute left-1/2 -translate-x-1/2 text-center hidden sm:block">
                    <p className="font-semibold text-white">{title}</p>
                    {subtitle && <p className="text-white/30 text-xs">{subtitle}</p>}
                </div>
            )}

            {/* Right: back button or user info + logout */}
            {showBack ? (
                <button
                    onClick={() => navigate("/dashboard")}
                    className="text-sm text-white/40 hover:text-white transition"
                >
                    &larr; Dashboard
                </button>
            ) : (
                <div className="flex items-center gap-4">
                    <span className="text-sm text-white/40">Hey, {user?.name} 👋</span>
                    <button
                        onClick={handleLogout}
                        className="text-sm text-white/40 hover:text-white transition"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
