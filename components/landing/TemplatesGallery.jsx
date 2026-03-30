export default function TemplatesGallery() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Stunning Templates</h2>
                        <p className="text-gray-600">Designed to get you hired in 2025.</p>
                    </div>
                    <button className="text-blue-600 font-semibold hover:text-blue-700">View All Designs →</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { id: 1, name: 'Minimalist Modern', category: 'Tech & Startups', image: '/template-modern.png', popular: true },
                        { id: 2, name: 'Creative Portfolio', category: 'Design & Marketing', image: '/template-creative.png', popular: false },
                        { id: 3, name: 'Executive Pro', category: 'Corporate & Management', image: '/template-executive.png', popular: false },
                    ].map((t) => (
                        <div key={t.id} className="group relative rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500">
                            <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                                <img 
                                    src={t.image} 
                                    alt={t.name}
                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                />
                                
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                                    <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:scale-105">
                                        Use This Template
                                    </button>
                                </div>
                                
                                {t.popular && (
                                    <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                        ★ Popular
                                    </div>
                                )}
                            </div>
                            <div className="p-4 bg-white border-t border-gray-50">
                                <h3 className="font-bold text-gray-900">{t.name}</h3>
                                <p className="text-xs text-gray-500">{t.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
