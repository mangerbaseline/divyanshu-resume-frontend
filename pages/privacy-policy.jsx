import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';

const PrivacyPolicyPage = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-600/30">
            <Head>
                <title>Privacy Policy | ResumeCraft - Your Data is Secure</title>
                <meta name="description" content="Learn how ResumeCraft handles and protects your personal information and resume data." />
            </Head>
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-40">
                <div className="mb-20">
                    <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Last Updated: May 2024</span>
                    <h1 className="text-5xl md:text-7xl font-black mb-10 leading-none tracking-tighter uppercase">
                        Privacy <span className="text-gradient">Policy</span>
                    </h1>
                </div>

                <div className="prose prose-invert prose-slate max-w-none space-y-12">
                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-6">1. Information We Collect</h2>
                        <p className="text-slate-400 leading-relaxed">
                            We collect information that you provide directly to us when you create an account, build a resume, or communicate with us. This includes your name, email address, contact details, and all information you choose to include in your resumes (employment history, education, skills, etc.).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-6">2. How We Use Your Information</h2>
                        <p className="text-slate-400 leading-relaxed">
                            We use the information we collect to provide, maintain, and improve our services, including to generate resumes, process payments, and send you technical notices and support messages. We do NOT sell your personal resume data to third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-6">3. Data Security</h2>
                        <p className="text-slate-400 leading-relaxed">
                            We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access. All data transmission is encrypted using industry-standard protocols.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-6">4. Your Rights</h2>
                        <p className="text-slate-400 leading-relaxed">
                            You have the right to access, update, or delete your personal information at any time through your account settings. If you close your account, we will delete your resume data from our active databases within 30 days.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicyPage;
