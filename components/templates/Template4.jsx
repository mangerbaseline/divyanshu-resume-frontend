import React from "react";
import { Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin, Youtube, Twitter } from "lucide-react";

export default function Template4({ data, id, font = 'font-sans', color = '#000000', pagePadding = 10, sectionSpacing = 24, h2Size, h3Size, h2Padding, h3Padding, h2Color, h3Color, pSize, pPadding, pColor, sectionOrder }) {
    const { profile, experience, education, skills, projects, projectExperience, certifications, social } = data;

    const fontStyles = {
        'font-sans': 'Inter, system-ui, sans-serif',
        'font-serif': 'Georgia, "Times New Roman", serif',
        'font-times': '"Times New Roman", Times, serif',
        'font-garamond': '"EB Garamond", Garamond, serif',
    };

    const activeFontFamily = fontStyles[font] || fontStyles['font-sans'];

    const getSocialIcon = (network) => {
        if (!network) return <LinkIcon size={12} />;
        const lower = network.toLowerCase();
        if (lower.includes('github')) return <Github size={12} />;
        if (lower.includes('linkedin')) return <Linkedin size={12} />;
        if (lower.includes('youtube')) return <Youtube size={12} />;
        if (lower.includes('twitter')) return <Twitter size={12} />;
        return <LinkIcon size={12} />;
    };

    const h2Style1 = {
        fontSize: h2Size ? `${h2Size}px` : '14px',
        backgroundColor: h2Color || color,
        padding: `${h2Padding || 4}px 12px`,
        marginBottom: '12px',
        color: 'white'
    };

    const h2Style2 = {
        fontSize: h2Size ? `${h2Size}px` : '14px',
        color: h2Color || color,
        borderBottom: `2px solid ${h2Color || color}`,
        paddingBottom: `${h2Padding || 4}px`,
        marginBottom: '16px'
    };

    const h3Style = {
        fontSize: h3Size ? `${h3Size}px` : '13px',
        color: h3Color || '#000000',
        paddingBottom: h3Padding ? `${h3Padding}px` : '0px'
    };

    const pStyle = {
        fontSize: pSize ? `${pSize}px` : '11px',
        color: pColor || '#000000',
        paddingBottom: pPadding ? `${pPadding}px` : '0px'
    };

    const renderSection = (sectionId) => {
        switch (sectionId) {
            case 'summary':
                return (profile?.summary || profile?.about) && (
                    <section key="summary" className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <h2 className="font-black uppercase tracking-widest" style={h2Style1}>PROFESSIONAL SUMMARY</h2>
                        <p className="leading-relaxed text-justify px-1" style={pStyle}>
                            {profile.summary || profile.about}
                        </p>
                    </section>
                );
            case 'experience':
                return experience?.length > 0 && (
                    <section key="experience" className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <h2 className="font-black uppercase tracking-widest pb-1 mb-4" style={h2Style2}>EXPERIENCE</h2>
                        <div className="space-y-6">
                            {experience.map((exp) => (
                                <div key={exp.id || Math.random()}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold uppercase" style={h3Style}>{exp.role}</h3>
                                        <span style={pStyle} className="font-bold">
                                            {exp.start ? new Date(exp.start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''} —
                                            {exp.end ? new Date(exp.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ' Present'}
                                        </span>
                                    </div>
                                    <p className="font-bold text-gray-600 mb-2 uppercase italic" style={pStyle}>{exp.company}</p>
                                    <ul className="leading-relaxed space-y-1 ml-4 list-disc">
                                        {exp.details?.split('\n').map((line, i) => (
                                            <li key={i} style={pStyle}>{line.replace(/^[•*-]\s*/, '')}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'projects':
                return ((projects && projects.length > 0) || (projectExperience && projectExperience.length > 0)) && (
                    <section key="projects" className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <h2 className="font-black uppercase tracking-widest pb-1 mb-4" style={h2Style2}>KEY PROJECTS</h2>
                        <div className="grid grid-cols-2 gap-6">
                            {projectExperience?.map((proj) => (
                                <div key={proj.id || Math.random()} className="pl-3 py-1" style={{ borderLeft: `2px solid ${color}` }}>
                                    <h3 className="font-bold uppercase mb-1" style={h3Style}>{proj.title}</h3>
                                    <p className="leading-relaxed italic" style={pStyle}>{proj.details || proj.description}</p>
                                </div>
                            ))}
                            {projects?.filter(p => !projectExperience?.some(pe => pe.title === p.title)).map((proj) => (
                                <div key={proj.id || Math.random()} className="pl-3 py-1" style={{ borderLeft: `2px solid ${color}` }}>
                                    <h3 className="font-bold uppercase mb-1" style={h3Style}>{proj.title}</h3>
                                    <p className="leading-relaxed italic" style={pStyle}>{proj.description || proj.desc}</p>
                                    {proj.link && <a href={proj.link} className="text-[10px] text-gray-500 hover:underline mt-1 block font-mono">Project Link</a>}
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'education':
                return education?.length > 0 && (
                    <section key="education" className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <h2 className="font-black uppercase tracking-widest pb-1 mb-4" style={h2Style2}>EDUCATION</h2>
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id || Math.random()}>
                                    <h3 className="font-bold uppercase" style={h3Style}>{edu.degree}</h3>
                                    <div className="flex justify-between items-baseline" style={pStyle}>
                                        <div className="font-medium">{edu.school}</div>
                                        {edu.grade && <div className="font-bold">Grade: {edu.grade}</div>}
                                    </div>
                                    <div style={pStyle} className="font-bold italic">
                                        Graduated: {edu.end ? new Date(edu.end).getFullYear() : 'Present'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'skills':
                return skills?.length > 0 && (
                    <section key="skills" className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <h2 className="font-black uppercase tracking-widest pb-1 mb-4" style={h2Style2}>CORE SKILLS</h2>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-black font-bold italic px-1">
                            {skills.map((skill, index) => (
                                <div key={index} className="flex items-center gap-2" style={pStyle}>
                                    <span className="w-1.5 h-1.5 shrink-0" style={{ backgroundColor: color }}></span>
                                    <span>{typeof skill === 'string' ? skill : skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'additional':
                return (certifications?.length > 0 || social?.length > 0) && (
                    <section key="additional" className="pt-4 section-avoid-break" style={{ borderTop: `2px solid ${color}`, marginBottom: `${sectionSpacing}px` }}>
                        {certifications?.length > 0 && (
                            <div className="mb-4">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">CERTIFICATIONS</h3>
                                <div className="flex flex-wrap gap-x-6 gap-y-1">
                                    {certifications.map((cert, i) => (
                                        <div key={i} className="font-bold uppercase" style={pStyle}>{cert.name}</div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {social?.length > 0 && (
                            <div className="flex flex-wrap justify-between gap-4">
                                {social.map((s, i) => (
                                    <a key={i} href={s.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[11px] font-black uppercase tracking-tighter hover:underline" style={{ color }}>
                                        {getSocialIcon(s.network)}
                                        <span>{s.network}</span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </section>
                );
            default:
                return null;
        }
    };

    const defaultOrder = ['summary', 'experience', 'projects', 'education', 'skills', 'additional'];
    const activeOrder = sectionOrder || defaultOrder;

    return (
        <div
            id={id || "resume-preview"}
            className="w-full bg-white text-black leading-tight"
            style={{ fontFamily: activeFontFamily, padding: `${pagePadding}mm` }}
        >
            {/* Header */}
            <header className="mb-6 pb-4" style={{ borderBottom: `4px solid ${color}` }}>
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-5xl font-black uppercase tracking-tighter leading-none" style={{ color }}>
                            {profile?.name || "YOUR NAME"}
                        </h1>
                        <p className="text-xl font-bold text-black uppercase mt-2 tracking-widest">{profile?.title || ""}</p>
                    </div>
                    <div className="text-right text-[11px] font-bold text-black space-y-0.5">
                        {profile?.location && <p>{profile.location}</p>}
                        {profile?.phone && <p>{profile.phone}</p>}
                        {profile?.email && <p>{profile.email}</p>}
                        {profile?.website && <p className="hover:underline">{profile.website}</p>}
                    </div>
                </div>
            </header>

            <div className="resume-content">
                {activeOrder.map(sectionId => renderSection(sectionId))}
            </div>
        </div>
    );
}
