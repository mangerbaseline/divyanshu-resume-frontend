
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
    const faqs = [
        {
            q: "Is ResumeCraft really free?",
            a: "Yes! You can create, edit, and download your resume for free. We also offer premium templates for power users."
        },
        {
            q: "Will my resume pass ATS systems?",
            a: "Absolutely. All our templates are designed with ATS best practices in mind to ensure your resume gets read by humans."
        },
        {
            q: "Can I import my LinkedIn profile?",
            a: "Currently we support manual entry to ensure the highest quality, but we are working on a LinkedIn import feature!"
        },
        {
            q: "How many resumes can I create?",
            a: "You can create unlimited versions of your resume to tailor them for different job applications."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="py-24 bg-transparent relative">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                    <p className="text-slate-400">Everything you need to know about ResumeCraft.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-slate-800/30 border border-white/10 rounded-xl overflow-hidden transition-all duration-300">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left text-white hover:bg-white/5 transition-colors"
                            >
                                <span className="font-medium">{faq.q}</span>
                                {openIndex === i ? <ChevronUp className="w-5 h-5 text-blue-400" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                            </button>
                            <div
                                className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${openIndex === i ? 'max-h-48 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
                            >
                                <p className="text-slate-400">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a href="/faq" className="text-blue-400 hover:text-blue-300 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 group">
                        View All FAQs
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
