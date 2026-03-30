import React from "react";
import { Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin, Youtube, Twitter } from "lucide-react";

export default function Template1({ data, id, font = 'font-sans', color = '#000000', pagePadding = 10, sectionSpacing = 24, h2Size, h3Size, h2Padding, h3Padding, h2Color, h3Color, pSize, pPadding, pColor, nameSize, titleSize, headerSpacing, sectionOrder }) {
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

    const headerBarStyle = {
        background: `linear-gradient(to right, ${h2Color || color} 0px, ${h2Color || color} 4px, #f3f4f6 4px, #f3f4f6 100%)`,
        borderRadius: '8px',
        marginBottom: '12px',
        marginTop: `${sectionSpacing}px`,
        overflow: 'hidden',
        minHeight: '28px',
        display: 'flex',
        alignItems: 'center'
    };

    const h2Style = {
        fontSize: h2Size ? `${h2Size}px` : '12px',
        color: h2Color || color,
        margin: 0,
        padding: `${h2Padding || 8}px 16px ${h2Padding || 8}px 20px`, // 20px = 4px bar + 16px padding
        lineHeight: 1,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        backgroundColor: 'transparent'
    };

    const contentIndent = "pl-[20px]"; 
    const socialIconBox = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '12px',
        height: '12px',
        flexShrink: 0,
        marginRight: '6px',
        position: 'relative',
        top: '1px'
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
                        <div style={headerBarStyle}>
                            <h2 style={h2Style}>SUMMARY</h2>
                        </div>
                        <p className={`leading-relaxed text-justify pr-4 ${contentIndent}`} style={pStyle}>
                            {profile.summary || profile.about}
                        </p>
                    </section>
                );
            case 'skills':
                return skills?.length > 0 && (
                    <section key="skills" className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <div style={headerBarStyle}>
                            <h2 style={h2Style}>TECHNICAL SKILLS</h2>
                        </div>
                        <div className={`flex flex-wrap gap-x-2 gap-y-1 ${contentIndent} pr-4`}>
                            {skills.map((skill, index) => (
                                <span key={index} className="text-black" style={pStyle}>
                                    {typeof skill === 'string' ? skill : skill.name}
                                    {index < skills.length - 1 && ","}
                                </span>
                            ))}
                        </div>
                    </section>
                );
            case 'experience':
                return experience?.length > 0 && (
                    <section key="experience" className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <div style={headerBarStyle}>
                            <h2 style={h2Style}>PROFESSIONAL EXPERIENCE</h2>
                        </div>
                        <div className={`space-y-6 ${contentIndent} pr-4`}>
                            {experience.map((exp) => (
                                <div key={exp.id || Math.random()}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold" style={h3Style}>{exp.role}, {exp.company}</h3>
                                        <span style={pStyle} className="font-bold">
                                            {exp.start ? new Date(exp.start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''} —
                                            {exp.end ? new Date(exp.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ' Present'}
                                        </span>
                                    </div>
                                    <div className="leading-relaxed whitespace-pre-line list-disc ml-4">
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
                        <div style={headerBarStyle}>
                            <h2 style={h2Style}>PROJECTS</h2>
                        </div>
                        <div className={`space-y-4 ${contentIndent} pr-4`}>
                            {projectExperience?.map((proj) => (
                                <div key={proj.id || Math.random()}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold" style={h3Style}>{proj.title} {proj.client ? `| ${proj.client}` : ''}</h3>
                                        <span style={pStyle} className="font-bold">
                                            {proj.start ? new Date(proj.start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''} —
                                            {proj.end ? new Date(proj.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ' Present'}
                                        </span>
                                    </div>
                                    <p className="leading-relaxed px-1" style={pStyle}>
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
                                    <p className="leading-relaxed px-1" style={pStyle}>
                                        {proj.description || proj.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'education':
                return education?.length > 0 && (
                    <section key="education" className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <div style={headerBarStyle}>
                            <h2 style={h2Style}>EDUCATION</h2>
                        </div>
                        <div className={`space-y-4 ${contentIndent} pr-4`}>
                            {education.map((edu) => (
                                <div key={edu.id || Math.random()}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold" style={h3Style}>{edu.degree}</h3>
                                        <span style={pStyle} className="font-bold">
                                            {edu.start ? new Date(edu.start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''} —
                                            {edu.end ? new Date(edu.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ' Present'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-baseline" style={pStyle}>
                                        <div className="italic">{edu.school}</div>
                                        {edu.grade && <div className="font-bold">Grade: {edu.grade}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'additional':
                return (certifications?.length > 0 || social?.length > 0) && (
                    <section key="additional" className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <div style={headerBarStyle}>
                            <h2 style={h2Style}>ADDITIONAL INFORMATION</h2>
                        </div>
                        <div className={`space-y-2 ${contentIndent} pr-4`}>
                            {certifications?.length > 0 && (
                                <div className="flex gap-2" style={pStyle}>
                                    <span className="font-bold shrink-0">Certifications:</span>
                                    <span>{certifications.map(c => c.name).join(', ')}</span>
                                </div>
                            )}
                            {social?.length > 0 && (
                                <div className="flex gap-2" style={pStyle}>
                                    <span className="font-bold shrink-0">Links:</span>
                                    <div className="flex flex-wrap gap-x-4">
                                        {social.map((s, i) => (
                                            <a key={i} href={s.url} target="_blank" rel="noreferrer" className="flex items-center hover:underline whitespace-nowrap mr-4 min-h-[16px]">
                                                <span style={socialIconBox}>
                                                    {getSocialIcon(s.network)}
                                                </span>
                                                <span className="text-[11px] leading-none pt-[1px]">{s.network}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                );
            default:
                return null;
        }
    };

    const defaultOrder = ['summary', 'skills', 'experience', 'projects', 'education', 'additional'];
    const activeOrder = sectionOrder || defaultOrder;

    return (
        <div
            id={id || "resume-preview"}
            className="w-full bg-white text-black leading-snug"
            style={{ fontFamily: activeFontFamily, padding: `${pagePadding}mm` }}
        >
            {/* Header */}
            <header style={{ marginBottom: `${headerSpacing || 24}px` }}>
                <h1 className="font-bold uppercase tracking-tight mb-1" style={{ color, fontSize: nameSize ? `${nameSize}px` : '36px', lineHeight: '1.1' }}>
                    {profile?.name || "YOUR NAME"}
                </h1>
                <p className="font-bold text-black uppercase mb-4" style={{ fontSize: titleSize ? `${titleSize}px` : '18px', lineHeight: '1.2' }}>{profile?.title || ""}</p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-black font-medium">
                    {[
                        profile?.location,
                        profile?.phone,
                        profile?.email,
                        profile?.website ? <a key="web" href={profile.website} target="_blank" rel="noreferrer" className="hover:underline">{profile.website.replace(/^https?:\/\//, '')}</a> : null
                    ].filter(Boolean).map((item, index, array) => (
                        <React.Fragment key={index}>
                            {item}
                            {index < array.length - 1 && <span className="text-gray-300">|</span>}
                        </React.Fragment>
                    ))}
                </div>
            </header>

            {/* Content with dynamic spacing and order */}
            <div className="resume-content">
                {activeOrder.map(sectionId => renderSection(sectionId))}
            </div>
        </div>
    );
}
