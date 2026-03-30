import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';

const CareerAdvicePage = () => {
    const categories = [
        { title: "Interview Prep", icon: "🤝", count: 12 },
        { title: "Networking", icon: "🌐", count: 8 },
        { title: "Salary Negotiation", icon: "💰", count: 5 },
        { title: "Workplace Skills", icon: "🚀", count: 15 },
        { title: "Job Search Strategies", icon: "🔍", count: 10 },
        { title: "Career Change", icon: "🔄", count: 7 }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-600/30">
            <Head>
                <title>Career Advice | ResumeCraft - Level Up Your Professional Life</title>
                <meta name="description" content="Expert advice on interviews, salary negotiation, and networking to help you advance your career." />
            </Head>
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-24">
                    <span className="inline-block px-4 py-1.5 bg-blue-600/10 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-600/20">Expert Resources</span>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
                        Grow Your <br /><span className="text-gradient">Career Path</span>
                    </h1>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        Comprehensive guides and resources to help you transition, negotiate, and thrive in the modern workplace.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-32">
                    {categories.map((cat, i) => (
                        <button key={i} className="bg-slate-900/50 border border-white/5 p-8 rounded-[40px] hover:border-blue-500/30 transition-all duration-300 group text-center">
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{cat.icon}</div>
                            <h3 className="text-xs font-black uppercase tracking-wider mb-2">{cat.title}</h3>
                            <span className="text-[10px] text-slate-500 font-bold uppercase">{cat.count} Articles</span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-1 md:p-1.5 rounded-[48px] shadow-2xl shadow-blue-500/10">
                        <div className="bg-slate-950 rounded-[44px] p-10 md:p-16 h-full">
                            <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">Interview Mastery</h2>
                            <p className="text-slate-400 mb-10 leading-relaxed">Learn how to answer the toughest interview questions and leave a lasting impression on recruiters with our behavioral interview frameworks.</p>
                            <button className="bg-blue-600 hover:bg-blue-700 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all w-fit">
                                Start Prepping
                            </button>
                        </div>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 p-10 md:p-16 rounded-[48px]">
                        <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">Salary Guides</h2>
                        <p className="text-slate-400 mb-10 leading-relaxed">Don't leave money on the table. Our comprehensive salary negotiation guide has helped thousands increase their compensation packages by 20% on average.</p>
                        <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all w-fit uppercase">
                            Learn Negotiation
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CareerAdvicePage;
