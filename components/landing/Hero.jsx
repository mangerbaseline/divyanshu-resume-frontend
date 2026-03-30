import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-transparent">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl mix-blend-multiply animate-blob" />
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 text-blue-300 text-sm font-medium mb-8 animate-fade-in-up">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                        Voted #1 Resume Builder 2025
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 animate-fade-in-up animation-delay-100">
                        Build a resume that <br />
                        <span className="text-gradient">
                            opens doors
                        </span>
                    </h1>

                    <p className="text-xl text-gray-300 mb-10 leading-relaxed animate-fade-in-up animation-delay-200">
                        Create professional, ATS-optimized resumes in minutes.
                        Join 50,000+ professionals landing jobs at top companies.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-300">
                        <Link
                            href="/signup"
                            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                        >
                            Build My Resume Free
                        </Link>
                        <Link
                            href="/examples"
                            className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-bold hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                        >
                            View Examples
                        </Link>
                    </div>
                </div>

                {/* 3D-ish Preview */}
                <div className="relative mx-auto max-w-5xl animate-fade-in-up animation-delay-400 perspective-1000">
                    <div className="relative bg-slate-800 rounded-2xl shadow-2xl border border-white/10 p-2 transform rotate-x-12 translate-y-12 opacity-0 animate-tilt-in">
                        <img
                            src="/hero-resume.png"
                            alt="Resume Preview"
                            className="w-full rounded-xl shadow-inner bg-gray-100 min-h-[400px] object-cover"
                        />

                        {/* Floating Badge 1 */}
                        <div className="absolute -right-6 top-20 bg-slate-800/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/10 flex items-center gap-3 animate-float">
                            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                                ✓
                            </div>
                            <div>
                                <p className="font-bold text-white">ATS Friendly</p>
                                <p className="text-xs text-slate-400">100% Parsable</p>
                            </div>
                        </div>

                        {/* Floating Badge 2 */}
                        <div className="absolute -left-6 bottom-20 bg-slate-800/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/10 flex items-center gap-3 animate-float animation-delay-2000">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                                ★
                            </div>
                            <div>
                                <p className="font-bold text-white">Premium Design</p>
                                <p className="text-xs text-slate-400">Stand out instantly</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
