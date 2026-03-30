import React from "react";
import { Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin, Youtube, Twitter } from "lucide-react";

export default function Template3({ data, id, font = 'font-sans', color = '#000000', pagePadding = 10, sectionSpacing = 24, h2Size, h3Size, h2Padding, h3Padding, h2Color, h3Color, pSize, pPadding, pColor, sectionOrder }) {
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

    const h2Style = {
        fontSize: h2Size ? `${h2Size}px` : '14px',
        color: h2Color || color,
        borderBottom: `1px solid ${h2Color || color}`,
        paddingBottom: `${h2Padding || 4}px`,
        marginBottom: '12px'
    };

    const h3Style = {
        fontSize: h3Size ? `${h3Size}px` : '12px',
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
                        <h2 className="font-bold uppercase tracking-widest border-b" style={h2Style}>PROFILE SUMMARY</h2>
                        <p className="leading-relaxed text-justify" style={pStyle}>
                            {profile.summary || profile.about}
                        </p>
                    </section>
                );
            case 'experience':
                return experience?.length > 0 && (
                    <section key="experience" className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <h2 className="font-bold uppercase tracking-widest border-b" style={h2Style}>EXPERIENCE</h2>
                        <div className="space-y-6">
                            {experience.map((exp) => (
                                <div key={exp.id || Math.random()}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold" style={h3Style}>{exp.role}</h3>
                                        <div style={pStyle} className="font-bold">
                                            {exp.company} <span className="font-medium">| {exp.start ? new Date(exp.start).getFullYear() : ''} — {exp.end ? new Date(exp.end).getFullYear() : 'Present'}</span>
                                        </div>
                                    </div>
                                    <div className="leading-relaxed ml-4">
                                        {exp.details?.split('\n').map((line, i) => (
                                            <div key={i} className="flex gap-2 mb-1" style={pStyle}>
                                                <span className="shrink-0">•</span>
                                                <span>{line.replace(/^[•*-]\s*/, '')}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'projects':
                return ((projects && projects.length > 0) || (projectExperience && projectExperience.length > 0)) && (
                    <section key="projects" className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <h2 className="font-bold uppercase tracking-widest border-b" style={h2Style}>PROJECTS</h2>
                        <div className="space-y-6">
                            {projectExperience?.map((proj) => (
                                <div key={proj.id || Math.random()}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold" style={h3Style}>{proj.title}</h3>
                                        <div style={pStyle} className="font-bold">
                                            {proj.client} <span className="font-medium">| {proj.start ? new Date(proj.start).getFullYear() : ''} — {proj.end ? new Date(proj.end).getFullYear() : 'Present'}</span>
                                        </div>
                                    </div>
                                    <p className="leading-relaxed ml-4" style={pStyle}>
                                        {proj.details || proj.description}
                                    </p>
                                </div>
                            ))}
                            {projects?.filter(p => !projectExperience?.some(pe => pe.title === p.title)).map((proj) => (
                                <div key={proj.id || Math.random()}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold" style={h3Style}>{proj.title}</h3>
                                        <span className="text-[11px] font-bold text-black uppercase">Project</span>
                                    </div>
                                    <p className="leading-relaxed ml-4" style={pStyle}>
                                        {proj.description || proj.desc}
                                    </p>
                                    {proj.link && <p className="text-[10px] text-gray-500 mt-1 ml-4">{proj.link}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'education':
                return education?.length > 0 && (
                    <section key="education" className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <h2 className="font-bold uppercase tracking-widest border-b" style={h2Style}>EDUCATION</h2>
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id || Math.random()}>
                                    <h3 className="font-bold" style={h3Style}>{edu.degree}</h3>
                                    <div className="flex justify-between items-baseline" style={pStyle}>
                                        <div>{edu.school}, {edu.end ? new Date(edu.end).getFullYear() : 'Present'}</div>
                                        {edu.grade && <div className="font-bold">GPA: {edu.grade}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'skills':
                return skills?.length > 0 && (
                    <section key="skills" className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <h2 className="font-bold uppercase tracking-widest border-b" style={h2Style}>SKILLS</h2>
                        <div className="space-y-3">
                            <div className="px-1 italic">
                                {skills.map((skill, index) => (
                                    <span key={index} style={pStyle}>
                                        {typeof skill === 'string' ? skill : skill.name}
                                        {index < skills.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            case 'additional':
                return (certifications?.length > 0 || social?.length > 0) && (
                    <section key="additional" className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <h2 className="font-bold uppercase tracking-widest border-b" style={h2Style}>ACHIEVEMENTS / LINKS</h2>
                        <div className="space-y-2 px-1">
                            {certifications?.map((cert, i) => (
                                <div key={i} className="flex gap-2" style={pStyle}>
                                    <span className="shrink-0">•</span>
                                    <span>{cert.name} {cert.issuer ? `- ${cert.issuer}` : ''} {cert.year ? `(${cert.year})` : ''}</span>
                                </div>
                            ))}
                            {social?.map((s, i) => (
                                <div key={i} className="flex gap-2 items-center" style={pStyle}>
                                    <span className="shrink-0">•</span>
                                    <span className="font-bold">{s.network}:</span>
                                    <a href={s.url} target="_blank" rel="noreferrer" className="hover:underline">{s.url.replace(/^https?:\/\//, '')}</a>
                                </div>
                            ))}
                        </div>
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
            className="w-full bg-white text-black leading-snug"
            style={{ fontFamily: activeFontFamily, padding: `${pagePadding}mm` }}
        >
            {/* Centered Header */}
            <header className="mb-6 text-center">
                <h1 className="text-4xl font-bold uppercase tracking-tight mb-1" style={{ color }}>
                    {profile?.name || "YOUR NAME"}
                </h1>
                <p className="text-xl font-bold text-black uppercase mb-4 tracking-widest">{profile?.title || ""}</p>

                <div className="flex flex-wrap justify-center gap-x-4 text-[11px] text-black font-medium mb-4">
                    {profile?.location && <span>{profile.location}</span>}
                    {profile?.phone && (
                        <>
                            <span className="text-black font-bold">|</span>
                            <span>{profile.phone}</span>
                        </>
                    )}
                    {profile?.email && (
                        <>
                            <span className="text-black font-bold">|</span>
                            <span>{profile.email}</span>
                        </>
                    )}
                </div>
                <div className="mt-2 mb-4 w-full" style={{ borderBottom: `6px solid ${color}` }}></div>
            </header>

            <div className="resume-content">
                {activeOrder.map(sectionId => renderSection(sectionId))}
            </div>
        </div>
    );
}
