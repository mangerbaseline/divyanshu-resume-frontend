
export default function Testimonials() {
    const testimonials = [
        {
            name: "Sarah Jenkins",
            role: "Software Engineer",
            quote: "I landed my dream job at Google within two weeks of using ResumeCraft. The templates are simply beautiful.",
            avatar: "S"
        },
        {
            name: "Michael Chen",
            role: "Product Manager",
            quote: "The ATS optimization feature is a game changer. My callback rate went from 5% to 40% immediately.",
            avatar: "M"
        },
        {
            name: "Jessica Ford",
            role: "Marketing Director",
            quote: "Finally, a resume builder that understands design. It's so easy to use and the results are professional.",
            avatar: "J"
        }
    ];

    return (
        <section className="py-24 bg-transparent relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Loved by professionals</h2>
                    <p className="text-slate-400">Join thousands of success stories.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                                    {t.avatar}
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">{t.name}</h3>
                                    <p className="text-sm text-blue-400">{t.role}</p>
                                </div>
                            </div>
                            <p className="text-slate-300 italic">"{t.quote}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
