import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-600/30">
            <Head>
                <title>About Us | ResumeCraft - Empowering Careers</title>
                <meta name="description" content="Our mission is to empower professionals to land their dream jobs through cutting-edge design and technology." />
            </Head>
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
                    <div>
                        <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Our Story</span>
                        <h1 className="text-5xl md:text-8xl font-black mb-10 leading-none tracking-tighter uppercase">
                            Redefining the <br /><span className="text-gradient">Job Application</span>
                        </h1>
                        <p className="text-slate-400 text-xl font-medium leading-relaxed mb-8">
                            ResumeCraft was born out of a simple observation: talented professionals often lose opportunities not because of a lack of skill, but because their resumes fail to capture their true potential.
                        </p>
                        <p className="text-slate-500 leading-relaxed mb-12">
                            Founded in 2024, we've combined algorithmic ATS optimization with human-centered design to create a platform that doesn't just build resumes, but builds confidence. We're a team of recruiters, designers, and engineers dedicated to your success.
                        </p>
                        <div className="flex gap-12 border-t border-white/5 pt-12">
                            <div>
                                <div className="text-4xl font-black text-white mb-2">50k+</div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Resumes Built</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black text-white mb-2">94%</div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Interview Rate</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-600/20 blur-[120px] rounded-full" />
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="The Team" className="relative rounded-[60px] border border-white/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl" />
                    </div>
                </div>

                <div className="text-center mb-40">
                    <h2 className="text-3xl font-black uppercase mb-20 tracking-tight">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="bg-slate-900 shadow-xl p-12 rounded-[48px] border border-white/5">
                            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-3xl mb-8 mx-auto">🎨</div>
                            <h3 className="text-xl font-bold mb-4">Design First</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">We believe a resume should be as visually compelling as it is informative.</p>
                        </div>
                        <div className="bg-slate-900 shadow-xl p-12 rounded-[48px] border border-white/5">
                            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-3xl mb-8 mx-auto">🔬</div>
                            <h3 className="text-xl font-bold mb-4">Data Driven</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">Every feature is backed by extensive research into hiring trends and ATS algorithms.</p>
                        </div>
                        <div className="bg-slate-900 shadow-xl p-12 rounded-[48px] border border-white/5">
                            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-3xl mb-8 mx-auto">🤝</div>
                            <h3 className="text-xl font-bold mb-4">User Obsessed</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">Your success is our primary metric. We're here for you at every step.</p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;
