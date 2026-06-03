import { useState, SyntheticEvent } from 'react'; // SyntheticEvent is React's wrapper around native browser events
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => { // SyntheticEvent<HTMLFormElement> = submit event from a <form> element
        e.preventDefault(); // stops the browser from reloading the page on submit
        setError('');
        setLoading(true);
        try {
            const { data } = await api.post('/auth/register', { name, email, password }); // send name, email, password to backend
            login(data); // store the returned user + token in AuthContext and localStorage
            navigate('/dashboard'); // redirect to dashboard on success
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed'); // show backend error or fallback message
        } finally {
            setLoading(false); // always re-enable the button whether it succeeded or failed
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
            {/* Background glow effects — same as LoginPage */}
            <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600 opacity-10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-100px] right-1/4 w-[400px] h-[400px] bg-indigo-500 opacity-10 rounded-full blur-[100px] pointer-events-none" />

            {/* Glass card */}
            <div className="relative w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
                {/* Logo / Brand */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-violet-600 mb-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white">Create an account</h1>
                    <p className="text-sm text-white/40 mt-1">Start organizing with </p>
                </div>

                {/* Error message — only renders if error state is not empty */}
                {error && (
                    <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm text-white/60 mb-1.5">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // update name state as user types
                            placeholder="Your name"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm text-white/60 mb-1.5">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // update email state as user types
                            placeholder="you@example.com"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm text-white/60 mb-1.5">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // update password state as user types
                            placeholder="••••••••"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading} // prevent double-submitting while request is in flight
                        className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
                    >
                        {loading ? 'Creating account…' : 'Create account'}
                    </button>
                </form>

                <p className="text-center text-sm text-white/40 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium transition">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
