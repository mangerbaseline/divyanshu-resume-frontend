import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';

const TermsOfServicePage = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-600/30">
            <Head>
                <title>Terms of Service | ResumeCraft - User Agreement</title>
                <meta name="description" content="Please read our terms of service carefully before using the ResumeCraft platform." />
            </Head>
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-40">
                <div className="mb-20">
                    <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Effective Date: May 2024</span>
                    <h1 className="text-5xl md:text-7xl font-black mb-10 leading-none tracking-tighter uppercase">
                        Terms of <span className="text-gradient">Service</span>
                    </h1>
                </div>

                <div className="prose prose-invert prose-slate max-w-none space-y-12">
                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-6">1. Acceptance of Terms</h2>
                        <p className="text-slate-400 leading-relaxed">
                            By accessing or using ResumeCraft, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-6">2. Use of Services</h2>
                        <p className="text-slate-400 leading-relaxed">
                            You are responsible for all activities that occur under your account. You agree to use the services only for lawful purposes and in accordance with these Terms. You may not use our templates to generate fraudulent or misleading documents.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-6">3. Subscriptions & Payments</h2>
                        <p className="text-slate-400 leading-relaxed">
                            Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis. You can cancel your subscription at any time through your account dashboard.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-6">4. Intellectual Property</h2>
                        <p className="text-slate-400 leading-relaxed">
                            The designs, layout, and software of ResumeCraft are the exclusive property of ResumeCraft. We grant you a limited license to use our templates for the purpose of creating your own personal resume.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-6">5. Limitation of Liability</h2>
                        <p className="text-slate-400 leading-relaxed">
                            ResumeCraft is provided "as is" without warranty of any kind. We do not guarantee that our services will result in job offers or employment.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TermsOfServicePage;
