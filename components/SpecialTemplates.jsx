'use client';
import React, { useState, useRef } from 'react';
import {
  Type, Palette, Sliders, Layers,
  GripVertical, ChevronUp, ChevronDown,
  Download, RotateCcw, LayoutTemplate,
  Linkedin, Code2, Mail, Phone, Globe, MapPin, Github, Twitter, Youtube,
  Plus, Trash2, Eye, EyeOff, Save, Check, Edit3, ClipboardList, UserCircle
} from 'lucide-react';

// ─── FONT OPTIONS ─────────────────────────────────────────────────────────────
const FONTS = [
  { id: 'times',       label: 'Times New Roman', css: '"Times New Roman", Times, serif' },
  { id: 'georgia',     label: 'Georgia',          css: 'Georgia, serif' },
  { id: 'garamond',    label: 'EB Garamond',      css: '"EB Garamond", Garamond, serif' },
  { id: 'inter',       label: 'Inter',             css: 'Inter, system-ui, sans-serif' },
  { id: 'roboto',      label: 'Roboto',            css: 'Roboto, Arial, sans-serif' },
  { id: 'lato',        label: 'Lato',              css: 'Lato, Helvetica, sans-serif' },
  { id: 'poppins',     label: 'Poppins',           css: 'Poppins, system-ui, sans-serif' },
];

const SECTION_LABELS = {
  summary:    'Summary',
  experience: 'Work Experience',
  skills:     'Skills',
  projects:   'Projects',
  education:  'Education',
};

// ─── SAMPLE DATA ──────────────────────────────────────────────────────────────
const SAMPLE_DATA = {
  profile: {
    name: 'Rohit Doshi',
    title: 'SDE 3 (Vice President - VP)',
    email: 'myemail@gmail.com',
    phone: '+919090909090',
    location: 'Bengaluru',
    linkedin: 'Rohit Doshi',
    leetcode: 'LeetCode Profile',
    summary: 'Results-driven back-end engineer with 6 years of hands-on experience designing and scaling cloud native microservices in Java. Proven track record in leading firms now aiming for a role at a top-tier product company. Expert in distributed systems, AWS-based deployments, Kubernetes orchestration, and real-time data pipelines. Adaptive to driving end-to-end delivery, mentoring teams, and optimizing performance under high SLAs.',
  },
  experience: [
    { 
      id: 1, 
      role: 'SDE 3 (Vice President - VP)', 
      company: 'Goldman Sachs', 
      location: 'Bengaluru',
      start: 'Jan 2022', 
      end: 'present', 
      details: 'Led cross-functional teams of engineers (including contingent workers), driving end-to-end delivery of high-impact backend services for regulatory and trading platforms.\nArchitected and executed a full rewrite of a legacy SOA application into Kubernetes-based microservices on AWS, improving system reliability from 95% to 99.5%.\nIntroduced Redis-based caching layers to critical data pipelines, reducing average request latency by 70% and cutting infrastructure costs by 40%.\nDesigned and implemented multi-region AWS deployments with auto-scaling policies, enabling zero downtime during peak trading hours.\nEstablished Prometheus metrics collection and Grafana dashboards across 20+ microservices; reduced Mean Time to Recover by 50% through real-time alerting and automated rollback scripts.\nMentored interns and junior engineers; conducted weekly/bi-weekly code reviews, knowledge-share sessions, and brown-bag tech talks.\nCollaborated with product managers and stakeholders to define SLAs, OKRs, and roadmaps; ensured seamless integration with frontend, risk, and data analytics teams.' 
    },
    { 
      id: 2, 
      role: 'Developer', 
      company: 'Barclays', 
      location: 'Pune',
      start: 'Jul 2019', 
      end: 'Jan 2022', 
      details: 'Built and managed CI/CD pipelines in Jenkins and GitLab; automated Docker image builds and Kubernetes deployments for 10+ microservices.\nDesigned and deployed AWS infrastructure to migrate on-premise workloads to cloud, reducing operational costs by 25%.\nDeveloped custom Bash scripts for automated backup, scaling, and fail-over of MySQL and Redis clusters, improving availability to 99.9%.\nImplemented IAM roles with least privilege, configured VPCs, subnets, and security groups to meet compliance.' 
    },
    {
      id: 3,
      role: 'Project Intern',
      company: 'BMC Softwares',
      location: 'Pune',
      start: 'Sept 2018',
      end: 'Apr 2019',
      details: 'Co-designed and implemented a predictive system to analyze code file severity using version control and defect tracking data. Utilized Flask Server and PostgreSQL Database for efficient system deployment.\nContributed to creating and maintaining project tracking tools, ensuring clear communication of expectations and progress.'
    }
  ],
  education: [
    { id: 1, degree: 'B.E. Computer Engineering', school: 'PICT, Pune', start: '2014', end: '2018', grade: '8.5 CGPA' }
  ],
  skills: [
    { id: 1, category: 'Programming Languages', items: 'Java(Proficient), C++(Beginner), Python(Beginner)' },
    { id: 2, category: 'Database and Languages', items: 'SQL, MySQL, Redis, MongoDB' },
    { id: 3, category: 'Frameworks and Tools', items: 'Spring Boot, Kubernetes, Docker, Terraform, Kafka, Prometheus, Grafana, JUnit, Mockito' },
    { id: 4, category: 'Cloud Platforms', items: 'AWS (Lambda, EC2, S3, RDS, ElastiCache, Load Balancer, API Gateway)' },
    { id: 5, category: 'Version Control Tools and IDE', items: 'Git, GitLab, IntelliJ' },
    { id: 6, category: 'Soft Skills', items: 'Leadership, Collaboration, Planning, Teamwork, Time Management, Problem-Solving' }
  ],
  visibleSections: {
    summary: true, experience: true, skills: true, education: false, projects: false
  }
};

// ─── EDITABLE PREVIEW TEXT ────────────────────────────────────────────────────
function EditablePreviewText({ value, onChange, tag: Tag = 'span', style = {}, multiline = false }) {
  const handleBlur = (e) => {
    const newVal = multiline ? e.target.value : e.currentTarget.innerText;
    if (newVal !== value) onChange(newVal);
  };
  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      style={{ ...style, outline: 'none', borderRadius: '2px', cursor: 'text', border: '1px solid transparent' }}
      className="hover:border-indigo-400/30 transition-all px-1 -mx-1"
    >
      {value || '...'}
    </Tag>
  );
}

// ─── RESUME PREVIEW (MATCHING IMAGE) ──────────────────────────────────────────
function ResumePreview({ data, setData, style: s, sectionOrder, setSectionOrder, isDragMode }) {
  const { profile, experience, education, skills, visibleSections } = data;

  const upProf = (f, v) => setData(p => ({ ...p, profile: { ...p.profile, [f]: v } }));
  const upList = (k, idx, f, v) => setData(p => {
    const arr = [...p[k]];
    arr[idx] = { ...arr[idx], [f]: v };
    return { ...p, [k]: arr };
  });

  const secHeaderStyle = { borderBottom: `1.5px solid ${s.headingColor}`, marginBottom: `${s.sectionSpacing * 0.3}px`, marginTop: `${s.sectionSpacing}px`, paddingBottom: '1px' };
  const h2Style = { fontSize: `${s.h2FontSize}px`, fontWeight: 800, color: s.headingColor, textTransform: 'uppercase', letterSpacing: `${s.letterSpacing}em` };
  const pStyle = { fontSize: `${s.bodyFontSize}px`, color: s.textColor, lineHeight: s.lineHeight };

  const renderSectionContent = (id, idx) => {
    if (!visibleSections[id]) return null;
    switch (id) {
      case 'summary':
        return <div style={{ ...pStyle, textAlign: 'justify' }}><EditablePreviewText value={profile.summary} onChange={v => upProf('summary', v)} multiline /></div>;
      case 'experience':
        return <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {experience.map((exp, i) => (
            <div key={exp.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: `${s.bodyFontSize + 0.5}px` }}>
                  {exp.role}{exp.company ? `, ${exp.company}` : ''}{exp.location ? `, ${exp.location}` : ''}
                </span>
                <span style={{ fontSize: `${s.bodyFontSize}px`, fontWeight: 500 }}>{exp.start} – {exp.end}</span>
              </div>
              <div style={{ ...pStyle, marginTop: '1px', textAlign: 'justify' }}>
                {(exp.details || '').split('\n').filter(Boolean).map((line, li) => (
                  <div key={li} style={{ display: 'flex', gap: '8px', marginBottom: '1px' }}>
                    <span style={{ minWidth: '10px' }}>–</span>
                    <span>{line.replace(/^[-–•*]\s*/, '')}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>;
      case 'skills':
        return <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '4px' }}>
          <tbody>
            {skills.map((row, i) => (
              <tr key={row.id}>
                <td style={{ ...pStyle, fontWeight: 700, width: '220px', verticalAlign: 'top', paddingBottom: '2px' }}>{row.category}</td>
                <td style={{ ...pStyle, verticalAlign: 'top', paddingBottom: '2px' }}>{row.items}</td>
              </tr>
            ))}
          </tbody>
        </table>;
      case 'education':
        return <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {education.map((edu, i) => (
            <div key={edu.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                <span>{edu.degree}</span>
                <span style={{ fontSize: `${s.bodyFontSize}px` }}>{edu.start} – {edu.end}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', ...pStyle, fontStyle: 'italic' }}>
                <span>{edu.school}</span><span>{edu.grade}</span>
              </div>
            </div>
          ))}
        </div>;
      default: return null;
    }
  };

  const contactRow = [
    { icon: <Mail size={11} />, val: profile.email },
    { icon: <Phone size={11} />, val: profile.phone },
    { icon: <Linkedin size={11} />, val: profile.linkedin },
    { icon: <Code2 size={11} />, val: profile.leetcode },
    { icon: <MapPin size={11} />, val: profile.location },
  ].filter(x => x.val);

  return (
    <div id="special-resume-preview" style={{ width: '210mm', minHeight: '297mm', background: '#fff', color: s.textColor, fontFamily: s.font, padding: `${s.pagePadding}mm`, boxSizing: 'border-box' }}>
      <header style={{ textAlign: 'center', marginBottom: '15px' }}>
        <h1 style={{ fontSize: `${s.nameFontSize}px`, fontWeight: 500, color: s.headingColor, marginBottom: '8px', letterSpacing: '1px' }}>{profile.name}</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', fontSize: `${s.bodyFontSize}px`, fontWeight: 400, flexWrap: 'wrap', alignItems: 'center' }}>
          {contactRow.map((item, i) => (
            <React.Fragment key={i}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ color: s.headingColor, display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                <span>{item.val}</span>
              </span>
              {i < contactRow.length - 1 && <span style={{ opacity: 0.5, fontWeight: 300 }}>|</span>}
            </React.Fragment>
          ))}
        </div>
      </header>
      {sectionOrder.map((sid, idx) => {
        if (!visibleSections[sid]) return null;
        return (
          <div key={sid} draggable={isDragMode} onDragStart={e => e.dataTransfer.setData('idx', idx)} onDragOver={e => e.preventDefault()} onDrop={e => {
            const f = parseInt(e.dataTransfer.getData('idx'));
            const n = [...sectionOrder]; [rm] = n.splice(f, 1); n.splice(idx, 0, rm); setSectionOrder(n);
          }} style={{ outline: isDragMode ? '1px dashed #6366f190' : 'none', position: 'relative' }}>
            <div style={secHeaderStyle}><h2 style={h2Style}>{SECTION_LABELS[sid]}</h2></div>
            {renderSectionContent(sid, idx)}
            {isDragMode && <div style={{ position: 'absolute', right: '-25px', top: '50%', transform: 'translateY(-50%)', background: '#6366f1', padding: '2px', borderRadius: '4px' }}><GripVertical size={14} color="#fff" /></div>}
          </div>
        );
      })}
    </div>
  );
}

// ─── CONTROL PANEL (TABBED: CONTENT & STYLE) ──────────────────────────────────
function ControlPanel({ data, setData, style, setStyle, isDragMode, setIsDragMode, sectionOrder, setSectionOrder, resetAll, loadDemoData }) {
  const [activeTab, setActiveTab] = useState('content');

  const upProf = (f, v) => setData(p => ({ ...p, profile: { ...p.profile, [f]: v } }));
  const upList = (k, idx, f, v) => setData(p => { const arr = [...p[k]]; arr[idx] = { ...arr[idx], [f]: v }; return { ...p, [k]: arr }; });
  const add = (k, t) => setData(p => ({ ...p, [k]: [...p[k], { ...t, id: Date.now() }] }));
  const rem = (k, id) => setData(p => ({ ...p, [k]: p[k].filter(x => x.id !== id) }));
  const upSty = (f, v) => setStyle(p => ({ ...p, [f]: v }));

  const Input = ({ label, value, onChange, multi = false }) => (
    <div style={{ marginBottom: '10px' }}>
      <label style={{ fontSize: '10px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>{label}</label>
      {multi ? <textarea value={value} onChange={e => onChange(e.target.value)} style={{ width: '100%', padding: '8px', background: '#0f172a', border: '1px solid #1e293b', color: '#f1f5f9', borderRadius: '6px', fontSize: '12px', minHeight: '80px', resize: 'vertical' }} />
             : <input type="text" value={value} onChange={e => onChange(e.target.value)} style={{ width: '100%', padding: '8px', background: '#0f172a', border: '1px solid #1e293b', color: '#f1f5f9', borderRadius: '6px', fontSize: '12px' }} />}
    </div>
  );

  return (
    <div style={{ width: '300px', background: 'rgba(5,6,15,0.99)', borderLeft: '1px solid #ffffff10', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', background: '#111827', padding: '10px 10px 0' }}>
        {['content', 'style', 'layout'].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{ flex: 1, padding: '8px', color: activeTab === t ? '#818cf8' : '#4b5563', border: 'none', borderBottom: activeTab === t ? '2px solid #6366f1' : '2px solid transparent', background: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>{t}</button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '18px' }}>
        {activeTab === 'content' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ borderBottom: '1px solid #ffffff08', pb: '10px' }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#818cf8', fontWeight: 800, fontSize: '12px', mb: '12px' }}><UserCircle size={14} /> Personal Info</p>
              <Input label="Full Name" value={data.profile.name} onChange={v => upProf('name', v)} />
              <Input label="Email" value={data.profile.email} onChange={v => upProf('email', v)} />
              <Input label="Phone" value={data.profile.phone} onChange={v => upProf('phone', v)} />
              <Input label="Location" value={data.profile.location} onChange={v => upProf('location', v)} />
              <Input label="LinkedIn" value={data.profile.linkedin} onChange={v => upProf('linkedin', v)} />
              <Input label="LeetCode/GitHub" value={data.profile.leetcode} onChange={v => upProf('leetcode', v)} />
              <Input label="Summary" value={data.profile.summary} onChange={v => upProf('summary', v)} multi />
            </div>

            <div>
              <p style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#818cf8', fontWeight: 800, fontSize: '12px', mb: '10px' }}><Edit3 size={14} /> Work Experience</p>
              {data.experience.map((exp, i) => (
                <div key={exp.id} style={{ padding: '10px', background: '#ffffff03', borderRadius: '8px', marginBottom: '10px', border: '1px solid #ffffff08' }}>
                  <Input label="Role" value={exp.role} onChange={v => upList('experience', i, 'role', v)} />
                  <Input label="Company" value={exp.company} onChange={v => upList('experience', i, 'company', v)} />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ flex: 1 }}><Input label="Start" value={exp.start} onChange={v => upList('experience', i, 'start', v)} /></div>
                    <div style={{ flex: 1 }}><Input label="End" value={exp.end} onChange={v => upList('experience', i, 'end', v)} /></div>
                  </div>
                  <Input label="Details (bullets)" value={exp.details} onChange={v => upList('experience', i, 'details', v)} multi />
                  <button onClick={() => rem('experience', exp.id)} style={{ width: '100%', padding: '6px', background: '#ef444415', border: '1px solid #ef444430', color: '#f87171', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}>Delete Item</button>
                </div>
              ))}
              <button onClick={() => add('experience', { role: 'Position', company: 'Org', start: '2024', end: 'Present', details: '' })} style={{ width: '100%', padding: '10px', background: '#6366f110', border: '1px dashed #6366f1', color: '#818cf8', borderRadius: '8px', cursor: 'pointer', fontSize: '11px' }}>+ Add Experience</button>
            </div>

            <div>
              <p style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#818cf8', fontWeight: 800, fontSize: '12px', mb: '10px' }}><ClipboardList size={14} /> Skills</p>
              {data.skills.map((s, i) => (
                <div key={s.id} style={{ marginBottom: '10px', background: '#0f172a', padding: '10px', borderRadius: '8px' }}>
                  <Input label="Category" value={s.category} onChange={v => upList('skills', i, 'category', v)} />
                  <Input label="Items" value={s.items} onChange={v => upList('skills', i, 'items', v)} />
                  <button onClick={() => rem('skills', s.id)} style={{ width: '100%', background: 'none', border: 'none', color: '#ef444490', fontSize: '9px', cursor: 'pointer' }}>Remove</button>
                </div>
              ))}
              <button onClick={() => add('skills', { category: 'Tools', items: '' })} style={{ width: '100%', border: '1px dashed #ffffff20', color: '#64748b', padding: '6px', cursor: 'pointer', borderRadius: '6px' }}>+ Add Skill Cat</button>
            </div>
          </div>
        )}

        {activeTab === 'style' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '10px', color: '#64748b' }}>FONT FAMILY</label>
              <select value={style.font} onChange={e => upSty('font', e.target.value)} style={{ width: '100%', padding: '8px', background: '#0f172a', border: '1px solid #1e293b', color: '#f1f5f9', borderRadius: '6px', marginTop: '4px' }}>
                {FONTS.map(f => <option key={f.id} value={f.css}>{f.label}</option>)}
              </select>
            </div>
            {[['Name Size', 'nameFontSize', 15, 50], ['Heading Size', 'h2FontSize', 8, 25], ['Body Size', 'bodyFontSize', 7, 18], ['Line Height', 'lineHeight', 1, 2.5, 0.1]].map(([l, f, min, max, s=1]) => (
              <div key={f}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}><span>{l}</span><span>{style[f]}</span></div>
                <input type="range" min={min} max={max} step={s} value={style[f]} onChange={e => upSty(f, Number(e.target.value))} style={{ width: '100%', accentColor: '#6366f1' }} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <div style={{ flex: 1 }}><label style={{ fontSize: '10px' }}>ACCENT</label><input type="color" value={style.headingColor} onChange={e => upSty('headingColor', e.target.value)} style={{ width: '100%', height: '35px', background: 'none', border: 'none' }} /></div>
              <div style={{ flex: 1 }}><label style={{ fontSize: '10px' }}>TEXT</label><input type="color" value={style.textColor} onChange={e => upSty('textColor', e.target.value)} style={{ width: '100%', height: '35px', background: 'none', border: 'none' }} /></div>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[['Page Margins', 'pagePadding', 5, 40], ['Section Gap', 'sectionSpacing', 2, 50]].map(([l, f, min, max]) => (
              <div key={f}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}><span>{l}</span><span>{style[f]}</span></div>
                <input type="range" min={min} max={max} value={style[f]} onChange={e => upSty(f, Number(e.target.value))} style={{ width: '100%', accentColor: '#6366f1' }} />
              </div>
            ))}
            <button onClick={() => setIsDragMode(!isDragMode)} style={{ width: '100%', padding: '12px', background: isDragMode ? '#6366f120' : '#ffffff05', border: `1px solid ${isDragMode ? '#6366f1' : '#ffffff10'}`, color: isDragMode ? '#818cf8' : '#e2e8f0', borderRadius: '8px', cursor: 'pointer', fontSize: '11px', fontWeight: 800 }}>{isDragMode ? '✓ DRAG ACTIVE' : 'REORDER SECTIONS'}</button>
            <div style={{ borderTop: '1px solid #ffffff10', mt: '10px', pt: '10px' }}>
              <p style={{ fontSize: '10px', fontWeight: 800, color: '#4b5563', mb: '10px' }}>SECTION VISIBILITY</p>
              {Object.keys(SECTION_LABELS).map(id => (
                <div key={id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '10px', opacity: data.visibleSections[id] ? 1 : 0.4 }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>{SECTION_LABELS[id]}</span>
                  <button onClick={() => setData(p => ({ ...p, visibleSections: { ...p.visibleSections, [id]: !p.visibleSections[id] } }))} style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer' }}>{data.visibleSections[id] ? <Eye size={16} /> : <EyeOff size={16} />}</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button onClick={loadDemoData} style={{ width: '100%', padding: '10px', background: '#6366f1', border: 'none', color: '#fff', borderRadius: '8px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}>LOAD DEMO DATA</button>
        <button onClick={resetAll} style={{ width: '100%', padding: '10px', background: '#ef444410', border: '1px solid #ef444430', color: '#f87171', borderRadius: '8px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}>CLEAR & RESET</button>
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function SpecialTemplates({ userData }) {
  // Always start with Sample Data if the user's name is not set, 
  // or provide a way to switch between them.
  const [data, setData] = useState(() => {
    const hasUserData = userData?.profile?.name && userData.profile.name.trim() !== '';
    if (hasUserData) {
      return { ...userData, visibleSections: { ...SAMPLE_DATA.visibleSections, ...userData.visibleSections } };
    }
    return SAMPLE_DATA;
  });

  const loadDemoData = () => {
    if (window.confirm("This will replace your current edits with the demo data. Continue?")) {
      setData(SAMPLE_DATA);
    }
  };

  const [style, setStyle] = useState({ font: '"Times New Roman", serif', headingColor: '#000000', textColor: '#0f172a', nameFontSize: 32, h2FontSize: 14, h3FontSize: 12, bodyFontSize: 11, pagePadding: 15, sectionSpacing: 16, lineHeight: 1.4, letterSpacing: 0.02 });
  const [sectionOrder, setSectionOrder] = useState(['summary', 'experience', 'skills', 'education']);
  const [isDragMode, setIsDragMode] = useState(false);
  const [zoom, setZoom] = useState(0.65);
  const [saved, setSaved] = useState(false);

  const handlePdf = () => {
    const el = document.getElementById('special-resume-preview');
    const win = window.open('', '_blank');
    win.document.write(`<html><head><title>Resume - ${data.profile.name}</title><style>@page{size:A4;margin:0}body{margin:0}*{box-sizing:border-box}a{color:inherit;text-decoration:none}</style></head><body>${el.outerHTML}</body></html>`);
    win.document.close();
    setTimeout(() => win.print(), 700);
  };

  const resetAll = () => setStyle({ font: '"Times New Roman", serif', headingColor: '#000000', textColor: '#0f172a', nameFontSize: 32, h2FontSize: 14, h3FontSize: 12, bodyFontSize: 11, pagePadding: 15, sectionSpacing: 16, lineHeight: 1.4, letterSpacing: 0.02 });

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 120px)', background: '#03040b', borderRadius: '16px', overflow: 'hidden', border: '1px solid #ffffff10' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 24px', background: '#0a0b14', borderBottom: '1px solid #ffffff08', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><LayoutTemplate size={18} color="#818cf8" /><div style={{ fontSize: '16px', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>RESUME <span style={{ color: '#6366f1' }}>MAKER</span></div></div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', background: '#111827', borderRadius: '8px', padding: '3px' }}>
              {[0.5, 0.65, 0.8, 1].map(z => <button key={z} onClick={() => setZoom(z)} style={{ padding: '5px 10px', fontSize: '10px', border: 'none', background: zoom === z ? '#1f2937' : 'none', color: zoom === z ? '#818cf8' : '#4b5563', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}>{z*100}%</button>)}
            </div>
            <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} style={{ padding: '10px 20px', background: saved ? '#22c55e' : '#6366f1', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '12px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s' }}>{saved ? <><Check size={16} /> SAVED</> : <><Save size={16} /> SAVE DATA</>}</button>
            <button onClick={handlePdf} style={{ padding: '10px 20px', background: '#f8fafc10', border: '1px solid #ffffff10', borderRadius: '10px', color: '#fff', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}><Download size={16} /></button>
          </div>
        </div>
        <div style={{ flex: 1, overflow: 'auto', background: '#0a0b14', display: 'flex', justifyContent: 'center', padding: '40px', backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(circle, #ffffff05 1px, transparent 1px)' }}>
          <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', boxShadow: '0 50px 100px -20px rgba(0,0,0,0.7), 0 30px 60px -30px rgba(0,0,0,0.8)', transition: 'transform 0.1s' }}>
            <ResumePreview data={data} setData={setData} style={style} sectionOrder={sectionOrder} setSectionOrder={setSectionOrder} isDragMode={isDragMode} />
          </div>
        </div>
      </div>
      <ControlPanel data={data} setData={setData} style={style} setStyle={setStyle} isDragMode={isDragMode} setIsDragMode={setIsDragMode} sectionOrder={sectionOrder} setSectionOrder={setSectionOrder} resetAll={resetAll} loadDemoData={loadDemoData} />
    </div>
  );
}
