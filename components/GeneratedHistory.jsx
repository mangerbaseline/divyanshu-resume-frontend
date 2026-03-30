import { useState, useEffect } from 'react';
import { API } from '../config';
import { FileText, Download, Calendar, ExternalLink, RefreshCw } from "lucide-react";
import { toast } from 'react-hot-toast';

export default function GeneratedHistory() {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchResumes = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API}/api/my-resumes`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setResumes(data);
            } else {
                toast.error("Failed to fetch resumes");
            }
        } catch (error) {
            console.error("Fetch history error:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResumes();
        window.refreshHistory = fetchResumes;
        return () => {
            delete window.refreshHistory;
        };
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
                <p className="text-slate-400">Loading your resume history...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white">Generated Resumes</h2>
                    <p className="text-sm text-slate-400">Manage and download your previously generated resumes</p>
                </div>
                <button
                    onClick={fetchResumes}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                    <RefreshCw className="w-4 h-4 text-slate-300" />
                </button>
            </div>

            {resumes.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                    <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No history found</h3>
                    <p className="text-slate-400 max-w-sm mx-auto">
                        You haven't generated any resumes yet. Go to the "Build" tab to create your first professional resume!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resumes.map((resume) => (
                        <div
                            key={resume._id}
                            className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-indigo-500/50 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white group-hover:text-indigo-400 transition-colors">
                                            {resume.template} Template
                                        </h4>
                                        <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(resume.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={resume.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                    <a
                                        href={resume.file_url}
                                        download={`resume-${resume.template}-${resume._id}.pdf`}
                                        className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                                        onClick={(e) => {
                                            // Note: Standard browser download might not trigger for external URLs without proper headers
                                            // We can just rely on the link opening for now if download attribute fails
                                        }}
                                    >
                                        <Download className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-3 border border-white/5">
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="text-slate-500">Status</span>
                                    <span className={`px-2 py-0.5 rounded-full ${resume.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'
                                        }`}>
                                        {resume.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
