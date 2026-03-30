import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SubscriptionSection from '../components/Subscription';
import { API } from '../config';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-[#05060f] text-slate-100">
            <Head>
                <title>Pricing | ResumeCraft - Premium Resume Builder</title>
                <meta name="description" content="Choose the perfect plan to accelerate your career with our AI-powered premium resume builder." />
            </Head>

            <Navbar />

            <main className="relative pt-32 pb-20 px-6">
                {/* Dynamic Background Elements */}
                <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
                    <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen animate-pulse animation-delay-2000"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <SubscriptionSection />

                    {/* FAQ Section for Pricing */}
                    <div className="mt-32 max-w-3xl mx-auto text-center space-y-12">
                        <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>

                        <div className="grid gap-8 text-left">
                            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                <h3 className="text-lg font-bold text-indigo-400 mb-2">Can I cancel my subscription anytime?</h3>
                                <p className="text-sm text-slate-400">Yes, you can cancel your subscription at any time from your dashboard settings. You will continue to have access until your current billing period ends.</p>
                            </div>

                            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                <h3 className="text-lg font-bold text-indigo-400 mb-2">Do you offer a free trial?</h3>
                                <p className="text-sm text-slate-400">We offer a free tier that allows you to build a basic resume. To unlock premium templates and AI optimization, you can choose any of our paid plans.</p>
                            </div>

                            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                <h3 className="text-lg font-bold text-indigo-400 mb-2">Is the payment secure?</h3>
                                <p className="text-sm text-slate-400">Absolutely. We use industry-standard encryption and processed through Stripe and Razorpay. Your credit card information never touches our servers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
