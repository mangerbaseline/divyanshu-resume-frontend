import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';
import { Toaster, toast } from 'react-hot-toast';
import { API } from '../config';


const InterviewPrepPage = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [role, setRole] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && token !== 'undefined' && token !== 'null') {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setIsLoading(false);
    }, []);


    const handleGenerate = async () => {
        if (!role.trim()) {
            toast.error("Please enter the job role you're preparing for!");
            return;
        }

        const token = localStorage.getItem('token');
        if (!token || token === 'undefined') {
            toast.error("Please sign in to use this feature");
            return;
        }


        setIsGenerating(true);
        try {
            const response = await fetch(`${API}/api/interview-prep`, {
                method: 'POST',


                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ role })
            });


            const data = await response.json();
            if (response.ok) {
                setQuestions(data);
                toast.success("Questions generated based on your profile!");
            } else {
                toast.error(data.error || "Generation failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };


    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400 font-medium animate-pulse">Checking authentication...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#05060f] flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl text-center">
                    <div className="w-20 h-20 bg-violet-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">Sign In Required</h2>
                    <p className="text-slate-400 mb-6">Please sign in to use the AI Interview Prep tool.</p>
                    <button
                        onClick={() => router.push('/signin')}
                        className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-violet-500/20"
                    >
                        Sign In Now
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="mt-4 text-slate-500 hover:text-white text-sm font-medium transition-colors"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#05060f] text-white selection:bg-indigo-500/30">

            <Toaster position="top-right" />
            <Head>
                <title>AI Interview Prep | ResumeCraft</title>
                <meta name="description" content="Generate AI-powered interview questions based on your resume." />
            </Head>
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />

                <div className="text-center mb-16">
                    <span className="text-violet-400 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Personalized Preparation</span>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
                        AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Interview Prep</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-slate-400 text-xl font-medium leading-relaxed">
                        Don't let the interview catch you off-guard. Get tailor-made questions based on your profile and target role.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center text-violet-400 text-sm">1</span>
                                Configure Your Strategy
                            </h2>
                            <div className="flex flex-col md:flex-row gap-4">
                                <input
                                    type="text"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    placeholder="Enter job role (e.g. Senior Software Engineer)"
                                    className="flex-1 bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-medium"
                                />
                                <button
                                    onClick={handleGenerate}
                                    disabled={role.length < 3 || isGenerating}
                                    className="bg-violet-600 hover:bg-violet-700 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-violet-500/25 disabled:opacity-50"
                                >
                                    {isGenerating ? "Processing..." : "Generate AI Prep"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {questions.length > 0 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <h3 className="text-xl font-bold flex items-center gap-3 ml-2">
                                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Your Personalized Questions
                            </h3>
                            {questions.map((q) => (
                                <div key={q.id} className="bg-white/5 border border-white/5 hover:border-violet-500/30 p-8 rounded-3xl transition-all hover:bg-white/[0.07] group">
                                    <div className="flex items-start gap-6">
                                        <div className="w-10 h-10 bg-violet-600/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <span className="text-violet-400 font-bold text-sm">Q{q.id}</span>
                                        </div>
                                        <div className="flex-1">
                                            <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase font-black tracking-widest text-slate-500 mb-3 border border-white/5 group-hover:bg-violet-500/10 group-hover:text-violet-400 group-hover:border-violet-500/20 transition-all">
                                                {q.type}
                                            </span>
                                            <p className="text-lg md:text-xl font-medium text-slate-200 group-hover:text-white transition-colors">{q.question}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default InterviewPrepPage;
