import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            q: "Is standard ResumeCraft free to use?",
            a: "Yes! You can create and export basic resumes for free. Our Premium plan offers advanced templates, AI-powered writing assistance, and unlimited cover letters."
        },
        {
            q: "Are the resumes ATS-friendly?",
            a: "Absolutely. All our templates are rigorously tested against popular Applicant Tracking Systems (ATS) like Workday and Greenhouse to ensure maximum compatibility."
        },
        {
            q: "Can I download my resume as a PDF?",
            a: "Yes, you can download all resumes in standard PDF format, which is the industry preference for job applications."
        },
        {
            q: "Do you offer cover letter writing?",
            a: "We are currently launching our AI Cover Letter generator. Premium members get full access to this feature as part of their subscription."
        },
        {
            q: "How can I contact support?",
            a: "You can reach our support team 24/7 via the 'Contact' page or by emailing support@resumecraft.com. We typically respond within 1 hour."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-600/30">
            <Head>
                <title>FAQ | ResumeCraft - Help & Support</title>
                <meta name="description" content="Frequently asked questions about the ResumeCraft resume builder and templates." />
            </Head>
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-40">
                <div className="text-center mb-24">
                    <h1 className="text-5xl md:text-7xl font-black mb-8 leading-none tracking-tighter uppercase">
                        Frequently <br /><span className="text-gradient">Asked Questions</span>
                    </h1>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="group">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                                className={`w-full text-left p-8 rounded-[32px] border transition-all duration-300 flex justify-between items-center ${openIndex === i ? 'bg-slate-900 border-blue-500/50' : 'bg-slate-900/40 border-white/5 hover:border-white/10'}`}
                            >
                                <span className={`text-lg font-bold transition-all ${openIndex === i ? 'text-blue-400' : 'text-white'}`}>{faq.q}</span>
                                <span className={`text-2xl transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-blue-500' : 'text-slate-600'}`}>↓</span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-500 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-10 text-slate-400 leading-relaxed text-sm">
                                    {faq.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-40 bg-blue-600/10 border border-blue-500/20 rounded-[40px] p-12 text-center">
                    <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">Still have questions?</h2>
                    <p className="text-slate-400 mb-8 max-w-lg mx-auto">Our support team is always ready to help you land your dream job.</p>
                    <button className="bg-blue-600 hover:bg-blue-700 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-500/25">
                        Contact Support
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default FAQPage;
