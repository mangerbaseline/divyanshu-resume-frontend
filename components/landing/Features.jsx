import { Zap, Layout, CheckCircle, Download } from 'lucide-react';

export default function Features() {
    const features = [
        {
            icon: <Layout className="w-6 h-6 text-blue-600" />,
            title: "Smart Layouts",
            desc: "Our auto-formatting engine ensures your resume looks perfect, no matter how much content you add."
        },
        {
            icon: <CheckCircle className="w-6 h-6 text-green-600" />,
            title: "ATS Optimization",
            desc: "Built-in keywords and formatting rules help you get past automated screening bots."
        },
        {
            icon: <Zap className="w-6 h-6 text-yellow-500" />,
            title: "Instant Content",
            desc: "Stuck? Use our pre-written phrases and bullet points for thousands of job titles."
        },
        {
            icon: <Download className="w-6 h-6 text-purple-600" />,
            title: "PDF Export",
            desc: "Download high-quality, print-ready PDFs that look professional on any device."
        }
    ];

    return (
        <section className="py-24 bg-transparent relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Everything you need to get hired</h2>
                    <p className="text-lg text-slate-400">Powerful features to help you build a standout resume in minutes.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="group p-8 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 bg-slate-900 rounded-xl shadow-inner flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-white/10">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
