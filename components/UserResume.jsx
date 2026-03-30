
import React, { useState, useEffect } from 'react';
import { Loader2, Zap, FileText, CheckCircle, AlertCircle, ExternalLink, History, Download, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { API } from '../config';

export default function UserResume({ data }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        let finalDate = dateString;

        // If it's a Date object
        if (dateString instanceof Date) {
            finalDate = dateString.toISOString();
        }

        // Take strictly YYYY-MM-DD
        if (typeof finalDate === 'string' && finalDate.length >= 10) {
            return finalDate.substring(0, 10);
        }

        return "";
    };

    const fetchHistory = async () => {
        setLoadingHistory(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API}/api/resume/history`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setHistory(data);
            }
        } catch (err) {
            console.error("Failed to fetch history:", err);
        } finally {
            setLoadingHistory(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // Construct the payload based on documented schema (v3)
            // https://useresume.ai/resume-generation-api/docs
            const payload = {
                content: {
                    name: data.profile?.name || "",
                    role: data.profile?.title || "",
                    email: data.profile?.email || "",
                    phone: data.profile?.phone || "",
                    address: data.profile?.location || "",
                    summary: data.profile?.summary || data.profile?.about || "",

                    // Social links mapping
                    links: [
                        ...(data.profile?.linkedin ? [{ name: "LinkedIn", url: data.profile.linkedin }] : []),
                        ...(data.profile?.website ? [{ name: "Portfolio", url: data.profile.website }] : []),
                        ...(data.social?.map(s => ({ name: s.network || "Social", url: s.url })) || [])
                    ],

                    employment: [
                        ...(data.experience || []),
                        ...(data.projectExperience || [])
                    ].filter(exp => exp.company || exp.role || exp.title || exp.client).map(exp => {
                        const obj = {
                            title: exp.role || exp.title || "Position",
                            company: exp.company || exp.client || "Company/Client",
                            location: exp.location || "",
                            present: !exp.end,
                            short_description: [
                                exp.details || exp.description || "",
                                exp.technologies ? `\nTechnologies: ${exp.technologies}` : ""
                            ].filter(Boolean).join("\n")
                        };
                        const start = formatDate(exp.start);
                        if (start) obj.start_date = start;

                        const end = formatDate(exp.end);
                        if (end && !obj.present) obj.end_date = end;

                        return obj;
                    }).sort((a, b) => {
                        if (!a.start_date) return 1;
                        if (!b.start_date) return -1;
                        return b.start_date.localeCompare(a.start_date);
                    }) || [],

                    education: data.education?.filter(edu => edu.school || edu.degree).map(edu => {
                        const obj = {
                            institution: edu.school || "Institution",
                            degree: edu.degree || "Degree",
                            present: !edu.end,
                            location: edu.location || "",
                            short_description: edu.details || ""
                        };
                        const start = formatDate(edu.start);
                        if (start) obj.start_date = start;

                        const end = formatDate(edu.end);
                        if (end && !obj.present) obj.end_date = end;

                        return obj;
                    }) || [],

                    skills: data.skills?.map(skill => {
                        const skillName = typeof skill === 'string' ? skill : (skill.name || "Skill");
                        const skillLevel = (typeof skill === 'object' && (skill.level || skill.rating || skill.proficiency)) ? (skill.level || skill.rating || skill.proficiency) : "Expert";

                        return {
                            name: skillName,
                            proficiency: skillLevel,
                            display_proficiency: true
                        };
                    }) || [],

                    projects: data.projects?.filter(proj => proj.title || proj.name).map(proj => ({
                        name: proj.title || proj.name,
                        short_description: proj.description || proj.desc || "",
                        url: proj.link || ""
                    })) || [],

                    certifications: data.certifications?.filter(cert => cert.name).map(cert => {
                        const obj = {
                            name: cert.name,
                            institution: cert.issuer || "",
                        };
                        const date = formatDate(cert.date);
                        if (date) obj.start_date = date;
                        return obj;
                    }) || []
                },
                style: {
                    template: "modern-pro", // Switched to a valid pro template
                    template_color: "navy", // Using a valid named color variant
                    font: "inter",
                    page_padding: 1.2,
                    page_format: "a4",
                    date_format: "LLL yyyy",
                    background_color: "white",
                    profile_picture_radius: "rounded-full",
                    section_spacing: 1.2,
                    font_size: 10
                }
            };

            const token = localStorage.getItem('token');
            const response = await fetch(`${API}/api/resume/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errText = await response.text();
                let errorMessage = `API Error: ${response.status}`;
                try {
                    const errData = JSON.parse(errText);
                    errorMessage = errData.error || errData.message || errText;
                } catch (e) {
                    errorMessage = errText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const jsonResponse = await response.json();

            // The backend proxy returns the direct data object from UseResume API
            if (jsonResponse.success && jsonResponse.data?.file_url) {
                setResult(jsonResponse.data);
                // Trigger upload to R2
                saveToR2(jsonResponse.data.file_url, "modern-pro");
                fetchHistory(); // Refresh history
            } else if (jsonResponse.file_url) {
                // If backend unwrapped it or structure differs
                setResult(jsonResponse);
                saveToR2(jsonResponse.file_url, "modern-pro");
                fetchHistory(); // Refresh history
            } else if (jsonResponse.success === false) {
                throw new Error(jsonResponse.error || "Generation failed at external API");
            } else {
                setResult(jsonResponse.data || jsonResponse);
                if ((jsonResponse.data || jsonResponse).file_url) {
                    saveToR2((jsonResponse.data || jsonResponse).file_url, "modern-pro");
                }
                fetchHistory(); // Refresh history
            }

        } catch (err) {
            console.error(err);
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    const saveToR2 = async (pdfUrl, templateName) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API}/api/upload-resume`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    pdfUrl,
                    templateName,
                    fileName: `resume-${templateName}.pdf`
                })
            });

            if (response.ok) {
                toast.success("Resume saved to your history!");
            }
        } catch (error) {
            console.error("Save to R2 error:", error);
        }
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-500">
            {/* Header Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <Zap size={200} />
                </div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                        <Zap className="text-yellow-300" />
                        UseResume Generation
                    </h2>
                    <p className="text-indigo-100 max-w-xl text-lg">
                        Generate an ATS-optimized resume using our powerful API integration.
                        Your existing profile data will be used to create a professional CV in seconds.
                    </p>
                </div>
            </div>

            {/* Actions Area */}
            <div className="bg-slate-900/50 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                    <div>
                        <h3 className="text-xl font-bold text-white">Ready to Generate?</h3>
                        <p className="text-slate-400 mt-1">
                            We will send your detailed profile information to the UseResume engine.
                        </p>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className={`
                            px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all transform hover:-translate-y-1 shadow-lg
                            ${loading
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none translate-y-0'
                                : 'bg-white text-blue-900 hover:bg-blue-50 hover:shadow-blue-500/20 active:scale-95'
                            }
                        `}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <FileText />
                                Generate Now
                            </>
                        )}
                    </button>
                </div>

                {/* Status Feedback */}
                {error && (
                    <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-red-200 animate-in slide-in-from-top-2 relative z-10">
                        <AlertCircle className="shrink-0 mt-0.5 text-red-400" />
                        <div>
                            <p className="font-bold text-red-100">Generation Failed</p>
                            <p className="text-sm opacity-90 text-red-200/80">{error}</p>
                            <p className="text-xs mt-2 opacity-75 text-red-300">Tip: Ensure all required fields (Name, Email, Job Title) are filled in your profile.</p>
                        </div>
                    </div>
                )}

                {result && (
                    <div className="mt-8 p-6 bg-green-500/10 border border-green-500/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 animate-in slide-in-from-top-2 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-500/20 p-3 rounded-full text-green-400">
                                <CheckCircle size={32} />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white">Resume Generated Successfully!</h4>
                                <p className="text-green-200/80">Your professional resume is ready.</p>
                            </div>
                        </div>

                        {(result.file_url || result.pdfUrl) && (
                            <a
                                href={result.file_url || result.pdfUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
                            >
                                <ExternalLink size={18} />
                                View / Download Resume
                            </a>
                        )}

                        {/* Fallback Display */}
                        {!(result.file_url || result.pdfUrl) && (
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-white/10 text-xs font-mono overflow-auto max-w-full text-slate-300">
                                {JSON.stringify(result, null, 2)}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* History Section */}
            <div className="bg-slate-900/50 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                    <History className="text-indigo-400" />
                    <h3 className="text-xl font-bold text-white">Generation History</h3>
                </div>

                {loadingHistory ? (
                    <div className="flex items-center justify-center p-12">
                        <Loader2 className="animate-spin text-indigo-500" size={32} />
                    </div>
                ) : history.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {history.map((item) => (
                            <div key={item._id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all group overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <FileText size={64} />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
                                        <Calendar size={14} />
                                        {new Date(item.createdAt).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </div>
                                    <h4 className="text-white font-bold mb-1 truncate capitalize">
                                        {item.template} Template
                                    </h4>
                                    <p className="text-slate-400 text-[10px] mb-4">
                                        Generated at {new Date(item.createdAt).toLocaleTimeString()}
                                    </p>
                                    <a
                                        href={item.file_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                                    >
                                        <Download size={16} />
                                        Download PDF
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white/3 rounded-2xl border border-dashed border-white/10">
                        <FileText className="mx-auto text-slate-600 mb-4" size={48} />
                        <p className="text-slate-400">No resumes generated yet.</p>
                        <p className="text-slate-600 text-sm mt-1">Click "Generate Now" to create your first resume.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
