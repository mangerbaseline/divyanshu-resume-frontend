'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Template1 from '../components/templates/Template1';
import Template2 from '../components/templates/Template2';
import Template3 from '../components/templates/Template3';
import Template4 from '../components/templates/Template4';

export default function Examples() {
    const [activeTemplate, setActiveTemplate] = useState(1);
    const router = useRouter();

    // Sample resume data for previewing templates
    const sampleData = {
        profile: {
            name: "Alex Johnson",
            title: "Senior Full Stack Developer",
            email: "alex.johnson@email.com",
            phone: "+1 (555) 123-4567",
            location: "San Francisco, CA",
            website: "https://alexjohnson.dev",
            linkedin: "https://linkedin.com/in/alexjohnson",
            summary: "Experienced Full Stack Developer with 6+ years of expertise in building scalable web applications. Specialized in React, Node.js, and cloud technologies. Proven track record of leading development teams and delivering high-impact projects that drive business growth.",
            about: "Passionate software engineer with a strong foundation in computer science and a commitment to writing clean, maintainable code. Experienced in agile methodologies and collaborative development environments."
        },
        experience: [
            {
                id: 1,
                role: "Senior Full Stack Developer",
                company: "TechCorp Inc.",
                location: "San Francisco, CA",
                start: "2021-03-01",
                end: null,
                details: "• Led development of microservices architecture serving 2M+ users\n• Improved application performance by 40% through code optimization\n• Mentored team of 5 junior developers and conducted code reviews\n• Implemented CI/CD pipelines reducing deployment time by 60%"
            },
            {
                id: 2,
                role: "Full Stack Developer",
                company: "StartupXYZ",
                location: "Remote",
                start: "2019-01-01",
                end: "2021-02-28",
                details: "• Built responsive web applications using React and Node.js\n• Integrated third-party APIs and payment gateways\n• Collaborated with designers to implement pixel-perfect UIs\n• Reduced bug count by 35% through comprehensive testing"
            },
            {
                id: 3,
                role: "Junior Developer",
                company: "Digital Solutions Ltd.",
                location: "New York, NY",
                start: "2017-06-01",
                end: "2018-12-31",
                details: "• Developed and maintained client websites using modern frameworks\n• Participated in agile sprints and daily standups\n• Assisted in database design and optimization\n• Contributed to open-source projects"
            }
        ],
        education: [
            {
                id: 1,
                school: "University of California, Berkeley",
                degree: "Bachelor of Science in Computer Science",
                start: "2013-09-01",
                end: "2017-05-31"
            },
            {
                id: 2,
                school: "Stanford Online",
                degree: "Machine Learning Specialization",
                start: "2020-01-01",
                end: "2020-06-30"
            }
        ],
        skills: [
            "JavaScript/TypeScript",
            "React.js & Next.js",
            "Node.js & Express",
            "Python & Django",
            "MongoDB & PostgreSQL",
            "AWS & Docker",
            "Git & CI/CD",
            "REST APIs & GraphQL",
            "Agile/Scrum",
            "System Design"
        ],
        projects: [
            {
                id: 1,
                title: "E-Commerce Platform",
                description: "Built a full-featured e-commerce platform with payment integration, inventory management, and real-time analytics. Handles 10K+ daily transactions.",
                link: "https://github.com/alexj/ecommerce"
            },
            {
                id: 2,
                title: "Task Management App",
                description: "Developed a collaborative task management application with real-time updates, team collaboration features, and mobile responsiveness.",
                link: "https://github.com/alexj/taskapp"
            },
            {
                id: 3,
                title: "AI Content Generator",
                description: "Created an AI-powered content generation tool using OpenAI API, helping marketers create engaging content 5x faster.",
                link: "https://github.com/alexj/ai-content"
            }
        ],
        certifications: [
            {
                id: 1,
                name: "AWS Certified Solutions Architect",
                issuer: "Amazon Web Services",
                date: "2022-08-01"
            }
        ],
        social: [
            {
                network: "GitHub",
                url: "https://github.com/alexjohnson"
            },
            {
                network: "LinkedIn",
                url: "https://linkedin.com/in/alexjohnson"
            },
            {
                network: "Twitter",
                url: "https://twitter.com/alexjdev"
            }
        ]
    };

    const templates = [
        {
            id: 1,
            name: "Professional",
            description: "Clean and modern design perfect for corporate roles",
            component: Template1
        },
        {
            id: 2,
            name: "Minimal",
            description: "Elegant serif typography for creative professionals",
            component: Template2
        },
        {
            id: 3,
            name: "Grid",
            description: "Bold layout ideal for senior positions",
            component: Template3
        },
        {
            id: 4,
            name: "Executive",
            description: "Clean, single-column minimalist executive design",
            component: Template4
        }
    ];

    const ActiveTemplateComponent = templates.find(t => t.id === activeTemplate)?.component;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950">
            <Navbar />

            <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Resume Template <span className="text-gradient">Examples</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            Choose from our professionally designed templates. Each one is ATS-friendly and optimized for success.
                        </p>
                    </div>

                    {/* Template Selector */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {templates.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => setActiveTemplate(template.id)}
                                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeTemplate === template.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-white/10'
                                    }`}
                            >
                                <div className="text-left">
                                    <div className="font-bold">{template.name}</div>
                                    <div className="text-xs opacity-80">{template.description}</div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Template Preview */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
                        <div className="mb-6 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1">
                                    {templates.find(t => t.id === activeTemplate)?.name} Template
                                </h2>
                                <p className="text-slate-400 text-sm">
                                    {templates.find(t => t.id === activeTemplate)?.description}
                                </p>
                            </div>
                            <Link
                                href="/signup"
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Use This Template
                            </Link>
                        </div>

                        {/* Template Display */}
                        <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                            <div className="overflow-auto max-h-[800px]" style={{ scrollbarWidth: 'thin' }}>
                                {ActiveTemplateComponent && (
                                    <div className="transform scale-75 origin-top">
                                        <ActiveTemplateComponent data={sampleData} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-16 text-center bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to Build Your Resume?
                        </h2>
                        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of professionals who have landed their dream jobs with our resume builder.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/signup"
                                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                            >
                                Create My Resume Free
                            </Link>
                            <Link
                                href="/"
                                className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-bold hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
