import React from "react";
import { Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin, Youtube, Twitter } from "lucide-react";

export default function Template5({ data, id, font = 'font-serif', color = '#000000', pagePadding = 10, sectionSpacing = 24, h2Size, h3Size, h2Padding, h3Padding, h2Color, h3Color, pSize, pPadding, pColor, sectionOrder }) {
    const { profile, experience, education, skills, projects, projectExperience, certifications, social } = data;

    const fontStyles = {
        'font-sans': 'Inter, system-ui, sans-serif',
        'font-serif': 'Georgia, "Times New Roman", serif',
        'font-times': '"Times New Roman", Times, serif',
        'font-garamond': '"EB Garamond", Garamond, serif',
    };

    const activeFontFamily = fontStyles[font] || fontStyles['font-serif'];

    const getSocialIcon = (network) => {
        if (!network) return null;
        const lower = network.toLowerCase();
        if (lower.includes('github')) return <Github size={10} />;
        if (lower.includes('linkedin')) return <Linkedin size={10} />;
        return <LinkIcon size={10} />;
    };

    const h2Style = {
        fontSize: h2Size ? `${h2Size}px` : '11px',
        color: h2Color || '#000000',
        paddingBottom: `${h2Padding || 0.5}px`,
        marginBottom: '8px',
        borderBottom: `1px solid ${h2Color || '#000000'}`,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    };

    const h3Style = {
        fontSize: h3Size ? `${h3Size}px` : '12px',
        color: h3Color || '#000000',
        paddingBottom: h3Padding ? `${h3Padding}px` : '0px',
        fontWeight: 'bold'
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
                        <h2 style={h2Style}>PROFILE</h2>
                        <p className="leading-relaxed text-black text-justify" style={pStyle}>
                            {profile.summary || profile.about}
                        </p>
                    </section>
                );
            case 'experience':
                return experience?.length > 0 && (
                    <section key="experience" className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <h2 style={h2Style}>WORK EXPERIENCE</h2>
                        <div className="space-y-4">
                            {experience.map((exp, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline font-bold italic">
                                        <div className="flex flex-col text-black">
                                            <span className="not-italic" style={h3Style}>{exp.company}</span>
                                            <span style={pStyle} className="font-medium">{exp.role}</span>
                                        </div>
                                        <div className="text-right flex flex-col text-black">
                                            <span style={pStyle}>
                                                {exp.start ? new Date(exp.start).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''} —
                                                {exp.end ? new Date(exp.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ' Present'}
                                            </span>
                                            {exp.location && <span style={pStyle} className="font-normal italic">{exp.location}</span>}
                                        </div>
                                    </div>
                                    <ul className="mt-1 ml-4 list-disc space-y-0.5" style={pStyle}>
                                        {exp.details?.split('\n').map((line, i) => (
                                            <li key={i}>{line.replace(/^[•*-]\s*/, '')}</li>
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
                        <h2 style={h2Style}>PROJECTS</h2>
                        <div className="space-y-3">
                            {projectExperience?.map((proj, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline font-bold italic">
                                        <div className="flex flex-col text-black">
                                            <span className="not-italic" style={h3Style}>{proj.title}</span>
                                        </div>
                                        <div className="text-right text-black">
                                            <span style={pStyle}>
                                                {proj.start ? new Date(proj.start).getFullYear() : ''}
                                                {proj.end ? ` — ${new Date(proj.end).getFullYear()}` : ''}
                                            </span>
                                        </div>
                                    </div>
                                    <ul className="mt-0.5 ml-4 list-disc space-y-0.5" style={pStyle}>
                                        {(proj.details || proj.description)?.split('\n').map((line, i) => (
                                            <li key={i}>{line.replace(/^[•*-]\s*/, '')}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            {projects?.filter(p => !projectExperience?.some(pe => pe.title === p.title)).map((proj, idx) => (
                                <div key={idx}>
                                    <div className="font-bold italic text-black">
                                        <span className="not-italic" style={h3Style}>{proj.title}</span>
                                    </div>
                                    <p className="mt-0.5 italic leading-tight" style={pStyle}>{proj.description || proj.desc}</p>
                                    {proj.link && <a href={proj.link} className="text-[10px] text-blue-700 hover:underline" style={pStyle}>Project Link</a>}
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'education':
                return education?.length > 0 && (
                    <section key="education" className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <h2 style={h2Style}>EDUCATION</h2>
                        <div className="space-y-3">
                            {education.map((edu, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline font-bold italic">
                                        <div className="flex flex-col text-black">
                                            <span className="not-italic" style={h3Style}>{edu.school}</span>
                                            <span style={pStyle} className="font-medium">{edu.degree}</span>
                                        </div>
                                        <div className="text-right flex flex-col text-black">
                                            <span style={pStyle}>
                                                {edu.end ? new Date(edu.end).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Present'}
                                            </span>
                                            {edu.location && <span className="text-[10px] font-normal italic">{edu.location}</span>}
                                        </div>
                                    </div>
                                    {edu.details && <p className="mt-1 ml-4 italic" style={pStyle}>{edu.details}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'additional':
                return (certifications?.length > 0 || skills?.length > 0 || profile?.interests || profile?.languages) && (
                    <section key="additional" className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <h2 style={h2Style}>CERTIFICATIONS, SKILLS & INTERESTS</h2>
                        <ul className="ml-4 list-disc space-y-1" style={pStyle}>
                            {certifications?.length > 0 && (
                                <li>
                                    <span className="font-bold">Certifications: </span>
                                    <span>{certifications.map(c => `${c.name}${c.issuer ? ` (${c.issuer})` : ''}${c.year ? `, ${c.year}` : ''}`).join('; ')}</span>
                                </li>
                            )}
                            {profile?.interests && (
                                <li>
                                    <span className="font-bold">Interests: </span>
                                    <span>{profile.interests}</span>
                                </li>
                            )}
                            {profile?.languages && (
                                <li>
                                    <span className="font-bold">Languages: </span>
                                    <span>{profile.languages}</span>
                                </li>
                            )}
                        </ul>
                    </section>
                );
            case 'skills':
                return skills?.length > 0 && (
                    <section key="skills" className="section-avoid-break" style={{ marginBottom: `${sectionSpacing}px` }}>
                        <h2 style={h2Style}>SKILLS</h2>
                        <p className="px-1" style={pStyle}>
                            <span className="font-bold">Technologies & Skills: </span>
                            <span>{skills.map(s => typeof s === 'string' ? s : s.name).join(', ')}</span>
                        </p>
                    </section>
                );
            default:
                return null;
        }
    };

    const defaultOrder = ['summary', 'experience', 'projects', 'education', 'additional'];
    const activeOrder = sectionOrder || defaultOrder;

    return (
        <div
            id={id || "resume-preview"}
            className="w-full bg-white text-black leading-tight text-[12px]"
            style={{ fontFamily: activeFontFamily, padding: `${pagePadding}mm` }}
        >
            {/* Header */}
            <header className="mb-4">
                <h1 className="text-3xl font-bold mb-1">
                    {profile?.name || "YOUR NAME"}
                </h1>
                <div className="flex flex-wrap items-center gap-x-2 text-[11px]">
                    {profile?.email && <span>{profile.email}</span>}
                    {profile?.phone && (
                        <>
                            <span className="text-gray-400">|</span>
                            <span>{profile.phone}</span>
                        </>
                    )}
                    {profile?.location && (
                        <>
                            <span className="text-gray-400">|</span>
                            <span>{profile.location}</span>
                        </>
                    )}
                    {social?.map((s, i) => (
                        <React.Fragment key={i}>
                            <span className="text-gray-400">|</span>
                            <a href={s.url} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline flex items-center gap-0.5">
                                {s.network}
                            </a>
                        </React.Fragment>
                    ))}
                    {profile?.website && (
                        <>
                            <span className="text-gray-400">|</span>
                            <a href={profile.website} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                                Portfolio
                            </a>
                        </>
                    )}
                </div>
                <div className="mt-2 border-b border-black w-full"></div>
            </header>

            <div className="resume-content">
                {activeOrder.map(sectionId => renderSection(sectionId))}
            </div>
        </div>
    );
}
