import { useState, SyntheticEvent } from 'react'; // SyntheticEvent is React's wrapper around native browser events
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const LoginPage = () => {
    const [email, setEmail] = useState(''); // New email state
    const [password, setPassword] = useState(''); // New password state
    const [error, setError] = useState(''); // New error state
    const [loading, setLoading] = useState(false); // New loading state
    const { login } = useAuth(); // Get login function from context
    const navigate = useNavigate(); // Get navigate function for redirection



    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => { // SyntheticEvent<HTMLFormElement> = a submit event coming from a <form> element
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { data } = await api.post('/auth/login', { email, password }); // Call backend API
            login(data); // Update auth context with user data
            navigate('/dashboard'); // Redirect to dashboard on success
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed'); // Show error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
            {/* Background glow effects */}
            <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600 opacity-10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-100px] right-1/4 w-[400px] h-[400px] bg-indigo-500 opacity-10 rounded-full blur-[100px] pointer-events-none" />

            {/* Glass card */}
            <div className="relative w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
                {/* Logo / Brand */}
                <div className="mb-5 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-600 mb-3">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <p className="text-sm text-white/40">Sign in to your Forge account</p>
                </div>
                <h1 className="text-2xl font-bold text-white mb-5">Welcome back 👋</h1>
                {/* Error message */}
                {error && (
                    <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                    </div>
                )}
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm text-white/60 mb-1.5">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm text-white/60 mb-1.5">Password</label>
                        <input
                            id="password" // added id for better accessibility
                            name="password"//backend expects a "password" field, so we need to name it that
                            type="password" // hide input for passwords
                            autoComplete="current-password" // helps browsers know this is a password field for autofill purposes
                            value={password} // bind input value to password state
                            onChange={(e) => setPassword(e.target.value)} // update password state as user types
                            placeholder="*******" // placeholder text for password field
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
                    >
                        {loading ? 'Signing in…' : 'Sign in'}
                    </button>
                </form>

                <p className="text-sm text-white/40 mt-4 text-center">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-violet-400 hover:text-violet-300 font-medium transition">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
