import Link from 'next/link';

export default function CallToAction() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />

            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to build your free resume?</h2>
                <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
                    Join the platform that helps thousands of people get hired every day. No credit card required.
                </p>
                <Link
                    href="/dashboard"
                    className="inline-block px-10 py-5 bg-white text-blue-900 rounded-xl font-bold text-lg shadow-xl hover:bg-blue-50 hover:scale-105 transition-all duration-300"
                >
                    Create Resume Now
                </Link>
                <p className="mt-6 text-sm text-blue-200">Free to use • No hidden fees</p>
            </div>
        </section>
    );
}
