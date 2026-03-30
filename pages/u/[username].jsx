import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { API } from '../../config';
import { Download, Mail, Phone, MapPin, Globe, Briefcase, BookOpen, Layers, Star, Award, Zap, ChevronRight, Github, Linkedin, Twitter } from 'lucide-react';

export default function PublicPortfolio() {
    const router = useRouter();
    const { username } = router.query;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!username) return;

        const fetchPortfolio = async () => {
            try {
                const response = await fetch(`${API}/api/portfolio/${username}`);
                if (!response.ok) {
                    if (response.status === 404) throw new Error('User not found');
                    throw new Error('Failed to load portfolio');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolio();
    }, [username]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#05060f] flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-indigo-500/10 blur-[120px] rounded-full"></div>
                <div className="flex flex-col items-center gap-6 relative z-10">
                    <div className="relative w-20 h-20">
                        <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
                        <div className="absolute inset-2 rounded-full border-4 border-purple-500/20 border-b-purple-500 animate-spin animation-delay-500"></div>
                    </div>
                    <p className="text-indigo-300 font-bold tracking-widest uppercase text-sm animate-pulse">Loading Portfolio...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#05060f] flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-white/10 p-10 rounded-3xl max-w-md w-full text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl"></div>
                    <h2 className="text-white text-4xl font-black mb-4 tracking-tighter">404</h2>
                    <p className="text-slate-400 mb-8">{error === 'User not found' ? "We couldn't find a portfolio for this user." : "Something went wrong loading this portfolio."}</p>
                    <button
                        onClick={() => router.push('/')}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all border border-white/5 shadow-lg"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    if (!data) return null;

    const { profile, experience, education, projects, skills, certifications, latestResume, social, user } = data;
    const initials = profile?.name ? profile.name.charAt(0).toUpperCase() : user?.name?.charAt(0).toUpperCase() || 'U';

    const getSocialIcon = (url) => {
        if (!url) return <Globe size={18} />;
        const lowerUrl = url.toLowerCase();
        if (lowerUrl.includes('github')) return <Github size={18} />;
        if (lowerUrl.includes('linkedin')) return <Linkedin size={18} />;
        if (lowerUrl.includes('twitter') || lowerUrl.includes('x.com')) return <Twitter size={18} />;
        return <Globe size={18} />;
    };

    return (
        <div className="min-h-screen bg-[#05060f] font-sans text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
            <Head>
                <title>{profile?.name || user?.name} - Portfolio</title>
                <meta name="description" content={`Professional portfolio for ${profile?.name || user?.name}`} />
            </Head>

            {/* Hero Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden h-[60vh]">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[100%] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen opacity-70"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[80%] bg-fuchsia-600/20 rounded-full blur-[120px] mix-blend-screen opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-[#05060f] to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

                {/* Header Section */}
                <header className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center mb-24">
                    <div className="w-28 h-28 md:w-40 md:h-40 shrink-0 bg-gradient-to-br from-indigo-500 to-fuchsia-600 rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-500/20 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
                        <span className="text-4xl md:text-6xl font-black text-white relative z-10">{initials}</span>
                    </div>

                    <div className="flex-1">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-2">{profile?.name || user?.name}</h1>
                        <p className="text-xl md:text-2xl text-indigo-400 font-medium mb-6 tracking-tight">
                            {profile?.title || 'Professional'}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 text-sm text-slate-400 font-medium">
                            {profile?.email && (
                                <div className="flex items-center gap-2 hover:text-white transition-colors">
                                    <Mail size={16} className="text-indigo-400" />
                                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                                </div>
                            )}
                            {profile?.phone && (
                                <div className="flex items-center gap-2 hover:text-white transition-colors">
                                    <Phone size={16} className="text-indigo-400" />
                                    <a href={`tel:${profile.phone}`}>{profile.phone}</a>
                                </div>
                            )}
                            {profile?.address && profile.address !== 'NA' && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-indigo-400" />
                                    <span>{profile.address}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            {latestResume && (
                                <a
                                    href={latestResume.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-3 transition-all shadow-lg shadow-indigo-500/25 hover:-translate-y-1 hover:shadow-indigo-500/40"
                                >
                                    <Download size={18} />
                                    Download Resume
                                </a>
                            )}

                            <div className="flex items-center gap-2 ml-4">
                                {social?.map((s, idx) => s.url && s.url !== '#' && s.url !== '' && (
                                    <a
                                        key={idx}
                                        href={s.url.startsWith('http') ? s.url : `https://${s.url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center text-slate-300 hover:text-white transition-all hover:-translate-y-1"
                                        title={s.network}
                                    >
                                        {getSocialIcon(s.url)}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Profile Summary */}
                {profile?.about && profile.about !== 'NA' && (
                    <section className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-6 flex items-center gap-3">
                            <span className="w-8 h-px bg-indigo-500/50"></span> Profile Summary
                        </h2>
                        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/5 blur-3xl"></div>
                            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium relative z-10">
                                {profile.about}
                            </p>
                        </div>
                    </section>
                )}

                {/* Two Column Layout for Desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* Main Content Column */}
                    <div className="lg:col-span-8 space-y-20">

                        {/* Experience */}
                        {experience && experience.length > 0 && (
                            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-10 flex items-center gap-3">
                                    <span className="w-8 h-px bg-indigo-500/50"></span> Work Experience
                                </h2>
                                <div className="space-y-12">
                                    {experience.map((exp, idx) => (
                                        <div key={idx} className="relative pl-8 md:pl-0 border-l border-white/10 md:border-transparent group">
                                            {/* Mobile Timeline dot */}
                                            <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-indigo-500 md:hidden"></div>

                                            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                                                <div className="md:w-48 shrink-0 pb-2 md:pb-0 md:text-right md:border-r border-white/10 md:pr-8 md:relative md:group-hover:border-indigo-500/30 transition-colors">
                                                    {/* Desktop Timeline dot */}
                                                    <div className="hidden md:block absolute right-[-4px] top-1.5 w-2 h-2 rounded-full bg-indigo-500/50 group-hover:bg-indigo-400 transition-colors group-hover:shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                                                    <p className="text-sm font-bold text-slate-100 uppercase tracking-widest">{exp.start ? new Date(exp.start).getFullYear() : ''} — {exp.end ? new Date(exp.end).getFullYear() : 'Present'}</p>
                                                    <p className="text-xs text-slate-500 font-medium mt-1">{exp.location}</p>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{exp.role}</h3>
                                                    <p className="text-fuchsia-400 font-medium mb-4">{exp.company}</p>
                                                    <div className="text-slate-400 text-sm leading-relaxed space-y-2 whitespace-pre-wrap">
                                                        {exp.details}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Projects */}
                        {projects && projects.length > 0 && (
                            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-10 flex items-center gap-3">
                                    <span className="w-8 h-px bg-indigo-500/50"></span> Featured Projects
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {projects.map((proj, idx) => (
                                        <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all group relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-2xl group-hover:bg-indigo-500/10 transition-all"></div>
                                            <div className="flex items-start justify-between mb-4 relative z-10">
                                                <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                                                {proj.link && proj.link !== '#' && (
                                                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-white transition-colors bg-indigo-500/10 p-2 rounded-lg">
                                                        <ExternalLink size={14} />
                                                    </a>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium relative z-10">{proj.desc}</p>

                                            <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                                                {/* Assuming proj.technologies might exist, or just use generic tag for now */}
                                                <span className="text-[10px] uppercase tracking-widest font-bold text-fuchsia-300 bg-fuchsia-500/10 px-3 py-1.5 rounded-full">Project</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:col-span-4 space-y-16 lg:pl-8 lg:border-l border-white/10">

                        {/* Core Skills */}
                        {skills && skills.length > 0 && (
                            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
                                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-8 flex items-center gap-3">
                                    <Zap size={14} /> Core Skills
                                </h2>
                                <div className="flex flex-wrap gap-2.5">
                                    {skills.map((skill, idx) => (
                                        <span key={idx} className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-colors">
                                            {skill.title || skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {education && education.length > 0 && (
                            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-8 flex items-center gap-3">
                                    <BookOpen size={14} /> Education
                                </h2>
                                <div className="space-y-6">
                                    {education.map((edu, idx) => (
                                        <div key={idx} className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-colors">
                                            <h3 className="text-base font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{edu.degree}</h3>
                                            <p className="text-sm text-fuchsia-400 font-medium mb-3">{edu.school}</p>
                                            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                                                <span>{edu.start ? new Date(edu.start).getFullYear() : ''} — {edu.end ? new Date(edu.end).getFullYear() : 'Present'}</span>
                                                {edu.grade && <span className="text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">Grade: {edu.grade}</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Certifications */}
                        {certifications && certifications.length > 0 && (
                            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600">
                                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-8 flex items-center gap-3">
                                    <Award size={14} /> Certifications
                                </h2>
                                <div className="space-y-4">
                                    {certifications.map((cert, idx) => (
                                        <div key={idx} className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 flex items-center justify-center shrink-0 border border-fuchsia-500/20">
                                                <Award size={16} className="text-fuchsia-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-white mb-1 leading-tight">{cert.name}</h3>
                                                <p className="text-xs text-slate-400 font-medium">{cert.issuer}</p>
                                                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-bold">{cert.year}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                    </div>

                </div>

                {/* Footer */}
                <footer className="mt-32 pt-12 border-t border-white/10 text-center flex flex-col items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-6 relative hover:scale-110 transition-transform">
                        <span className="text-white text-xl font-bold font-serif italic">R</span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">Built with <a href="/" className="text-indigo-400 hover:text-indigo-300">Resume Builder</a></p>
                </footer>

            </div>
        </div>
    );
}

const ExternalLink = ({ size = 24, ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
);
