import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-600/30">
            <Head>
                <title>Contact Us | ResumeCraft - We're Here to Help</title>
                <meta name="description" content="Have a question or need assistance with your resume? Our support team is here for you." />
            </Head>
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <h1 className="text-5xl md:text-8xl font-black mb-10 leading-none tracking-tighter uppercase">
                            Let's <span className="text-gradient">Connect</span>
                        </h1>
                        <p className="text-slate-400 text-xl font-medium leading-relaxed mb-12">
                            Have a technical issue, a business inquiry, or just want to tell us how we helped you land your job? We'd love to hear from you.
                        </p>

                        <div className="space-y-10">
                            <div className="flex gap-6 items-center">
                                <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Email Support</div>
                                    <div className="text-lg font-bold">support@resumecraft.com</div>
                                </div>
                            </div>
                            <div className="flex gap-6 items-center">
                                <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Headquarters</div>
                                    <div className="text-lg font-bold">San Francisco, CA</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 border border-white/10 rounded-[48px] p-10 md:p-16 backdrop-blur-3xl shadow-2xl">
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Full Name</label>
                                    <input type="text" className="w-full bg-slate-800/80 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-medium" placeholder="John Doe" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Email Address</label>
                                    <input type="email" className="w-full bg-slate-800/80 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-medium" placeholder="john@example.com" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Message</label>
                                <textarea className="w-full bg-slate-800/80 border border-white/5 rounded-3xl px-6 py-6 outline-none focus:border-blue-500 transition-all font-medium min-h-[200px]" placeholder="How can we help you?"></textarea>
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 py-6 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-blue-500/25">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;
