import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';
import { Toaster, toast } from 'react-hot-toast';
import { API } from '../config';


const ATSScorePage = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [score, setScore] = useState(null);
    const [observations, setObservations] = useState([]);
    const [jd, setJd] = useState('');
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



    const handleAnalyze = async () => {
        if (!jd.trim()) {
            toast.error("Please paste a job description first!");
            return;
        }

        const token = localStorage.getItem('token');
        if (!token || token === 'undefined') {
            toast.error("Please sign in to use this feature");
            return;
        }


        setIsAnalyzing(true);
        try {
            const response = await fetch(`${API}/api/ats-score`, {
                method: 'POST',


                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ jd })
            });


            const data = await response.json();
            if (response.ok) {
                setScore(data.score);
                setObservations(data.observations || []);
                toast.success("Analysis complete!");
            } else {
                toast.error(data.error || "Analysis failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };


    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400 font-medium animate-pulse">Checking authentication...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#05060f] flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl text-center">
                    <div className="w-20 h-20 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">Sign In Required</h2>
                    <p className="text-slate-400 mb-6">Please sign in to use the AI ATS Score Checker.</p>
                    <button
                        onClick={() => router.push('/signin')}
                        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20"
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
                <title>ATS Score Checker | ResumeCraft</title>
                <meta name="description" content="Check your resume's ATS score and get optimization tips." />
            </Head>
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />

                <div className="text-center mb-16">
                    <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-xs mb-4 block">AI Powered Diagnostics</span>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
                        ATS <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Score Checker</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-slate-400 text-xl font-medium leading-relaxed">
                        Find out if your resume will pass the automated screening. Paste the job description below to get a detailed breakdown.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Input Section */}
                    <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-indigo-600/20 rounded-2xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold">Job Description</h2>
                        </div>
                        <textarea
                            value={jd}
                            onChange={(e) => setJd(e.target.value)}
                            placeholder="Paste the job requirements here..."
                            className="w-full h-80 bg-slate-900/50 border border-white/10 rounded-2xl p-6 text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none mb-6"
                        />
                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {isAnalyzing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Analyzing Profile...
                                </>
                            ) : (
                                "Run AI Analysis"
                            )}
                        </button>
                    </div>

                    {/* Results Section */}
                    <div className="space-y-8">
                        {score ? (
                            <div className="bg-white/5 border border-white/10 rounded-[32px] p-10 backdrop-blur-xl animate-in fade-in slide-in-from-right-8 duration-700">
                                <div className="text-center mb-8">
                                    <div className="relative inline-block">
                                        <svg className="w-48 h-48 transform -rotate-90">
                                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={552.92} strokeDashoffset={552.92 - (552.92 * score) / 100} className="text-indigo-500 transition-all duration-1000 ease-out" strokeLinecap="round" />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-5xl font-black">{score}%</span>
                                            <span className="text-indigo-400 font-bold text-xs uppercase tracking-widest">Match Score</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold mb-4">AI Observations</h3>
                                    {observations.map((obs, index) => (
                                        <div key={index} className={`flex gap-4 p-4 ${obs.type === 'positive' ? 'bg-green-500/10 border border-green-500/20' : 'bg-yellow-500/10 border border-yellow-500/20'} rounded-2xl`}>
                                            <div className={`w-6 h-6 ${obs.type === 'positive' ? 'bg-green-500/20' : 'bg-yellow-500/20'} rounded-full flex items-center justify-center flex-shrink-0`}>
                                                <svg className={`w-4 h-4 ${obs.type === 'positive' ? 'text-green-400' : 'text-yellow-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    {obs.type === 'positive' ? (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    ) : (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                    )}
                                                </svg>
                                            </div>
                                            <p className="text-sm text-slate-300">{obs.text}</p>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        ) : (
                            <div className="h-full min-h-[400px] border-2 border-dashed border-white/10 rounded-[32px] flex flex-col items-center justify-center p-10 text-center">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-400 mb-2">Ready for Diagnosis</h3>
                                <p className="text-slate-500 max-w-xs">Once you paste the job description and click analyze, your score will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ATSScorePage;
