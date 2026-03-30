import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';

const ResumeTipsPage = () => {
    const tips = [
        {
            title: "Quantify Your Achievements",
            desc: "Use percentages and figures ($) to show exactly what impact you had. Instead of 'increased sales', use 'Increased sales by 25% in Q3'.",
            icon: "📈"
        },
        {
            title: "Use Active Verbs",
            desc: "Start bullet points with strong action verbs like 'Developed', 'Managed', 'Spearheaded', or 'Implemented' to convey leadership.",
            icon: "⚡"
        },
        {
            title: "Keywords for ATS",
            desc: "Naturally integrate keywords from the job description into your resume to ensure it passes through automated screening systems.",
            icon: "🤖"
        },
        {
            title: "Keep it Concise",
            desc: "Unless you have 10+ years of experience, stick to a one-page resume. Recruiters spend only 6 seconds on an initial scan.",
            icon: "⏱️"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-600/30 font-sans">
            <Head>
                <title>Resume Tips | ResumeCraft - Build a Winning Resume</title>
                <meta name="description" content="Discover professional resume tips and strategies to help you stand out from the crowd." />
            </Head>
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="relative mb-32 overflow-hidden rounded-[60px] bg-slate-900/50 border border-white/5 p-12 md:p-24 text-center">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 blur-[120px] translate-y-1/2 -translate-x-1/2" />

                    <h1 className="relative text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
                        Resume <span className="text-gradient">Optimization</span>
                    </h1>
                    <p className="relative text-slate-400 text-xl max-w-2xl mx-auto mb-10 font-medium">
                        Small changes can lead to big results. Follow these industry-standard tips to double your interview callbacks.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    {tips.map((tip, i) => (
                        <div key={i} className="flex gap-8 bg-slate-900/40 p-10 rounded-[40px] border border-white/5 hover:bg-slate-900/60 transition-colors">
                            <span className="text-5xl shrink-0">{tip.icon}</span>
                            <div>
                                <h3 className="text-xl font-bold mb-4">{tip.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{tip.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-black uppercase tracking-widest mb-12">Resume Formatting Checklist</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['PDF Format', 'Professional Font', 'Contact Info Included', 'Clear Section Headings', 'Reverse-Chronological'].map((check, i) => (
                            <div key={i} className="bg-slate-800/50 border border-blue-500/20 px-6 py-3 rounded-full flex items-center gap-3">
                                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-xs font-black uppercase tracking-wider">{check}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ResumeTipsPage;
