import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';
import Link from 'next/link';

const TemplatesPage = () => {
    const categories = [
        { name: "All", active: true },
        { name: "Professional", active: false },
        { name: "Creative", active: false },
        { name: "Modern", active: false },
        { name: "Minimal", active: false },
        { name: "Executive", active: false }
    ];

    const templates = [
        { id: 1, name: "The Modernist", category: "Modern", color: "blue" },
        { id: 2, name: "Executive Suite", category: "Executive", color: "slate" },
        { id: 3, name: "Creative Flow", category: "Creative", color: "indigo" },
        { id: 4, name: "Minimalist Dream", category: "Minimal", color: "emerald" },
        { id: 5, name: "Corporate Gold", category: "Professional", color: "amber" },
        { id: 6, name: "The Minimalist", category: "Minimal", color: "rose" }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-600/30">
            <Head>
                <title>Resume Templates | ResumeCraft - ATS-Friendly Designs</title>
                <meta name="description" content="Browse our library of professional, ATS-friendly resume templates. Designed by experts for every career stage." />
            </Head>
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-40">
                <div className="text-center mb-24">
                    <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Premium Designs</span>
                    <h1 className="text-5xl md:text-8xl font-black mb-10 leading-none tracking-tighter uppercase">
                        Pick Your <span className="text-gradient">Winning Look</span>
                    </h1>
                    <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto">
                        Professionally designed, ATS-tested templates that help you stand out and land the interview.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap justify-center gap-4 mb-20 overflow-x-auto pb-4 no-scrollbar">
                    {categories.map((cat, i) => (
                        <button key={i} className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${cat.active ? 'bg-blue-600 shadow-lg shadow-blue-500/25' : 'bg-slate-900 border border-white/5 hover:border-white/10'}`}>
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {templates.map((template) => (
                        <div key={template.id} className="group flex flex-col">
                            <Link href="/examples" className="block perspective-1000">
                                <div className="bg-slate-900 rounded-[40px] border border-white/5 p-4 aspect-[3/4] overflow-hidden relative transition-all duration-500 group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.5)] group-hover:-rotate-1 group-hover:scale-[1.02]">
                                    <div className="w-full h-full bg-slate-800/50 rounded-[32px] p-8 flex flex-col gap-4">
                                        <div className="h-8 w-full bg-slate-700/50 rounded-lg animate-pulse" />
                                        <div className="h-4 w-2/3 bg-slate-700/30 rounded-lg animate-pulse" />
                                        <div className="mt-auto space-y-3">
                                            <div className="h-2 w-full bg-slate-700/20 rounded" />
                                            <div className="h-2 w-full bg-slate-700/20 rounded" />
                                            <div className="h-2 w-3/4 bg-slate-700/20 rounded" />
                                        </div>
                                    </div>
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <div className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs translate-y-4 group-hover:translate-y-0 transition-transform">
                                            Preview
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className="mt-8 flex justify-between items-start px-4">
                                <div>
                                    <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{template.name}</h3>
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{template.category}</span>
                                </div>
                                <Link href="/signup" className="text-blue-400 font-black uppercase tracking-widest text-[10px] hover:text-blue-300">Use Template</Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-40 text-center">
                    <p className="text-slate-500 text-sm mb-10">Need a custom design? <Link href="/contact" className="text-blue-500 hover:underline">Get in touch</Link> with our bespoke team.</p>
                    <Link href="/signup" className="inline-block bg-white text-slate-950 px-12 py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-sm hover:bg-blue-50 transition-all hover:scale-105 shadow-xl">
                        Build My Resume Now
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TemplatesPage;
