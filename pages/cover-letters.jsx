import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';

const CoverLettersPage = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-600/30">
            <Head>
                <title>Cover Letters | ResumeCraft - Landing Your Dream Job</title>
                <meta name="description" content="Create professional cover letters that get you noticed. 10+ professional templates." />
            </Head>
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
                    <div className="flex-1 text-left">
                        <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Coming Soon</span>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                            Master the Art of the <span className="text-gradient">Cover Letter</span>
                        </h1>
                        <p className="text-slate-400 text-xl font-medium mb-10 leading-relaxed">
                            Your resume gets you the interview, but your cover letter tells your story. We're building a state-of-the-art cover letter generator to match your resume perfectly.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-blue-500/25">
                                Notify Me
                            </button>
                            <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all">
                                View Tips
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 relative group">
                        <div className="absolute inset-0 bg-blue-600/20 blur-[120px] rounded-full group-hover:bg-blue-600/30 transition-all duration-700" />
                        <div className="relative bg-slate-900/50 border border-white/10 rounded-[40px] p-8 backdrop-blur-3xl overflow-hidden aspect-[4/5] flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-blue-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="text-2xl font-bold block mb-2 italic">Writing...</span>
                                <p className="text-slate-500 text-sm">Our AI is learning to write perfect cover letters for you.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="bg-slate-900/40 p-10 rounded-[32px] border border-white/5">
                        <h3 className="text-xl font-bold mb-4">Why use a cover letter?</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">83% of hiring managers say that a cover letter is indispensable when it comes to hiring. Don't leave it to chance.</p>
                    </div>
                    <div className="bg-slate-900/40 p-10 rounded-[32px] border border-white/5">
                        <h3 className="text-xl font-bold mb-4">Perfect Matching</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">Our generator will automatically match the design, font, and tone of your ResumeCraft resume.</p>
                    </div>
                    <div className="bg-slate-900/40 p-10 rounded-[32px] border border-white/5">
                        <h3 className="text-xl font-bold mb-4">AI Optimization</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">Use AI to analyze job descriptions and highlight your most relevant achievements automatically.</p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CoverLettersPage;
