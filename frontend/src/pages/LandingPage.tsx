import { useNavigate } from "react-router-dom";

const KanbanPreview = () => (
    <div className="flex gap-3 w-full max-w-md select-none">
        {/* To Do */}
        <div className="flex-1 bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                <span className="text-[11px] font-semibold text-white/60">To Do</span>
                <span className="ml-auto text-[10px] text-white/20 bg-white/5 rounded-full px-1.5 py-0.5">3</span>
            </div>
            <div className="p-2 space-y-2">
                {["Research competitors", "Write project brief", "Set up repo"].map(t => (
                    <div key={t} className="bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2.5">
                        <p className="text-[11px] text-white/70 font-medium">{t}</p>
                        <div className="mt-1.5 w-8 h-1 rounded-full bg-white/10" />
                    </div>
                ))}
            </div>
        </div>

        {/* In Progress */}
        <div className="flex-1 bg-white/[0.04] border border-violet-500/30 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-violet-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                <span className="text-[11px] font-semibold text-violet-300">In Progress</span>
                <span className="ml-auto text-[10px] text-white/20 bg-white/5 rounded-full px-1.5 py-0.5">2</span>
            </div>
            <div className="p-2 space-y-2">
                {["Build landing page", "API integration"].map(t => (
                    <div key={t} className="bg-violet-600/10 border border-violet-500/20 rounded-xl px-3 py-2.5">
                        <p className="text-[11px] text-white/80 font-medium">{t}</p>
                        <div className="mt-1.5 w-12 h-1 rounded-full bg-violet-500/30" />
                    </div>
                ))}
            </div>
        </div>

        {/* Done */}
        <div className="flex-1 bg-white/[0.04] border border-emerald-500/30 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[11px] font-semibold text-emerald-300">Done</span>
                <span className="ml-auto text-[10px] text-white/20 bg-white/5 rounded-full px-1.5 py-0.5">4</span>
            </div>
            <div className="p-2 space-y-2">
                {["Design mockups", "User research", "DB schema", "Auth flow"].map(t => (
                    <div key={t} className="bg-emerald-500/[0.07] border border-emerald-500/20 rounded-xl px-3 py-2.5">
                        <p className="text-[11px] text-white/50 font-medium line-through decoration-white/20">{t}</p>
                        <div className="mt-1.5 w-10 h-1 rounded-full bg-emerald-500/20" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col overflow-hidden">

            {/* Nav */}
            <nav className="sticky top-0 z-50 border-b border-white/10 px-6 py-4 flex items-center justify-between bg-[#0f0f13]/90 backdrop-blur-md">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <span className="font-bold text-lg">Forge</span>
                </div>

                <div className="flex items-center gap-6 text-sm text-white/50">
                    <span className="hidden sm:block hover:text-white transition cursor-default">Features</span>
                    <span className="hidden sm:block hover:text-white transition cursor-default">How it works</span>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate("/login")}
                        className="text-sm text-white/50 hover:text-white transition"
                    >
                        Sign in
                    </button>
                    <button
                        onClick={() => navigate("/register")}
                        className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
                    >
                        Sign up
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <main className="flex-1 flex items-center px-6 sm:px-12 lg:px-20 py-16 gap-12">

                {/* Left: copy */}
                <div className="flex-1 min-w-0">
                    {/* Headline */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-[1.05] font-light mb-6">
                        manage{" "}
                        <span className="font-black text-white">TASKS</span>
                        <br />
                        without{" "}
                        <span className="font-black text-violet-400">THE</span>
                        <br />
                        <span className="font-black text-white">CHAOS</span>
                        {" "}
                        <span className="text-violet-400 font-black">→</span>
                    </h1>

                    {/* Sub-copy */}
                    <p className="text-white/40 text-base max-w-sm leading-relaxed mb-10">
                        Forge turns your projects into visual kanban boards so your team always knows what's next, what's in progress, and what's done.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col items-start gap-3 mt-14">
                        <button
                            onClick={() => navigate("/register")}
                            className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-xl transition text-sm"
                        >
                            Get started free
                        </button>
                        <button
                            onClick={() => navigate("/login")}
                            className="text-sm text-white/40 hover:text-white transition"
                        >
                            Already have an account →
                        </button>
                    </div>
                </div>

                {/* Right: kanban preview */}
                <div className="hidden lg:flex flex-1 justify-center items-center">
                    <div className="relative">
                        {/* Glow */}
                        <div className="absolute inset-0 -m-8 bg-violet-600/10 rounded-3xl blur-2xl" />
                        <div className="relative border border-white/10 rounded-2xl p-4 bg-white/[0.02]">
                            <KanbanPreview />
                        </div>
                    </div>
                </div>
            </main>

            {/* Trust bar */}
            <div className="border-t border-white/10 px-6 py-4">
                <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-8 text-white/30 text-xs">
                    {[
                        { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "Free to use" },
                        { icon: "M13 10V3L4 14h7v7l9-11h-7z", label: "Instant setup" },
                        { icon: "M4 6h16M4 10h16M4 14h16M4 18h16", label: "Visual kanban boards" },
                        { icon: "M17 20h5v-2a4 4 0 00-5.916-3.5M9 20H4v-2a4 4 0 015.916-3.5M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", label: "Team-ready" },
                    ].map(({ icon, label }) => (
                        <div key={label} className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
                            </svg>
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
