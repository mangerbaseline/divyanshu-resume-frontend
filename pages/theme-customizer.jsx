import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { API } from '../config';
import { signOut } from 'next-auth/react';
import GenerateResume from '../components/GenerateResume';
import { ArrowLeft, User as UserIcon } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export default function ThemeCustomizer() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const [user, setUser] = useState(null);

    const [userData, setUserData] = useState({
        profile: {},
        skills: [],
        experience: [],
        education: [],
        projects: [],
        projectExperience: [],
        certifications: [],
        social: []
    });

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        signOut({ callbackUrl: '/signin' });
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser && storedUser !== "undefined") {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing stored user data:", error);
                localStorage.removeItem("user");
            }
        }
    }, []);

    // Check authentication
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && token !== 'undefined' && token !== 'null') {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserData();
        }
    }, [isAuthenticated]);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API}/api/user/data`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Show sign-in prompt if not authenticated
    if (!isAuthenticated && !isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-white/10 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl">
                    <h2 className="text-white text-xl font-bold mb-4">Please log in</h2>
                    <p className="text-slate-400 mb-6">You must be logged in to access the theme customizer.</p>
                    <button
                        onClick={() => router.push('/signin')}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all"
                    >
                        Go to Sign In
                    </button>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#05060f] flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] bg-indigo-500/20 blur-[100px] rounded-full"></div>
                <div className="flex flex-col items-center gap-4 relative z-10">
                    <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                    <p className="text-indigo-200 font-bold tracking-widest uppercase text-sm animate-pulse">Loading Customizer...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#05060f] font-sans text-slate-100 selection:bg-fuchsia-500/30 selection:text-fuchsia-200">
            <Toaster position="top-right" />
            {/* Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[10%] w-[30%] h-[40%] bg-pink-600/15 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
                <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 h-screen flex flex-col pt-3 pb-6 px-4 max-w-[1400px] mx-auto overflow-hidden">
                {/* Customizer Header */}
                <header className="flex items-center justify-between bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl mb-6 shrink-0">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center text-slate-300 transition-all hover:-translate-x-1"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-fuchsia-500 text-transparent bg-clip-text">Live Theme Customizer</h1>
                            <p className="text-[11px] text-slate-400 font-medium tracking-wide uppercase mt-1">Design &amp; Download Your Perfect Resume</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-[12px] font-bold text-white leading-none">{user?.name || "User"}</p>
                                <p className="text-[9px] mt-1 font-bold uppercase tracking-wider text-fuchsia-400">Pro Creator</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden ring-2 ring-fuchsia-500/20 shadow-lg">
                                <span className="text-sm font-bold text-fuchsia-400 uppercase">{user?.name ? user.name[0] : <UserIcon size={16} />}</span>
                            </div>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <button
                            onClick={handleLogout}
                            className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-red-400 transition-colors"
                        >
                            Log out
                        </button>
                    </div>
                </header>

                {/* Customizer Main Content */}
                <main className="flex-1 min-h-0 bg-white/3 border border-white/10 rounded-[32px] p-6 backdrop-blur-sm shadow-2xl overflow-y-auto custom-scrollbar">
                    <GenerateResume data={userData} />
                </main>
            </div>

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
        </div>
    );
}
