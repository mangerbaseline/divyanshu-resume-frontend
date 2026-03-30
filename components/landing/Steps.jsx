export default function Steps() {
    const steps = [
        { num: "01", title: "Choose a Template", desc: "Select from our range of professional, field-tested designs." },
        { num: "02", title: "Enter Your Details", desc: "Fill in your formatted experience, skills, and education." },
        { num: "03", title: "Download PDF", desc: "Export your flawless resume and start applying instantly." }
    ];

    return (
        <section className="py-24 bg-transparent text-white relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How it works</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-700 z-0"></div>

                    {steps.map((s, i) => (
                        <div key={i} className="relative z-10 text-center">
                            <div className="w-24 h-24 mx-auto bg-slate-800 rounded-2xl flex items-center justify-center text-3xl font-bold mb-8 border border-white/10 shadow-lg group hover:border-blue-500 hover:bg-slate-700/50 transition-colors duration-300">
                                <span className="bg-gradient-to-br from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    {s.num}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                            <p className="text-slate-400">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
