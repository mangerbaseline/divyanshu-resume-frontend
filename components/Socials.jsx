import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Github, Linkedin, Youtube, Link as LinkIcon, Twitter, X } from "lucide-react";

export default function SocialsSection({ data, onSave, isSaving }) {
    const [socials, setSocials] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSocial, setCurrentSocial] = useState(null);

    useEffect(() => {
        if (data) {
            setSocials(Array.isArray(data) ? data : []);
        }
    }, [data]);

    const openModal = (social = null) => {
        setCurrentSocial(social || { network: "", url: "" });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentSocial(null);
    };

    const handleSocialSave = (e) => {
        e.preventDefault();
        const updatedSocials = currentSocial.index !== undefined
            ? socials.map((s, i) => i === currentSocial.index ? { network: currentSocial.network, url: currentSocial.url } : s)
            : [...socials, { network: currentSocial.network, url: currentSocial.url }];

        setSocials(updatedSocials);
        closeModal();

        // Auto-save to DB
        onSave('social', updatedSocials);
    };

    const removeSocial = (index) => {
        const updatedSocials = socials.filter((_, i) => i !== index);
        setSocials(updatedSocials);
        onSave('social', updatedSocials);
    };

    const handleSave = () => {
        onSave('social', socials);
    };

    const getIcon = (network = "") => {
        const lower = network.toLowerCase();
        if (lower.includes('github')) return <Github size={18} />;
        if (lower.includes('linkedin')) return <Linkedin size={18} />;
        if (lower.includes('youtube')) return <Youtube size={18} />;
        if (lower.includes('twitter') || lower.includes('x')) return <Twitter size={18} />;
        return <LinkIcon size={18} />;
    };

    return (
        <section className="relative z-10 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Social Presence</h2>
                    <p className="text-xs text-slate-500 mt-1">Connect your professional profiles and internal accounts.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="px-4 py-2 rounded-xl bg-indigo-500 text-white text-xs font-bold hover:bg-indigo-400 transition-all active:scale-95 flex items-center gap-2"
                >
                    <Plus size={14} /> Add Profile
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socials.map((item, index) => (
                    <div
                        key={index}
                        className="group relative p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all duration-300 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-colors">
                                {getIcon(item.network)}
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-bold text-white text-sm truncate uppercase tracking-tight">{item.network || "Link"}</h3>
                                <p className="text-[10px] text-slate-500 truncate mt-0.5 font-medium">{item.url}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => openModal({ ...item, index })}
                                className="p-1.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                            >
                                <Edit2 size={12} />
                            </button>
                            <button
                                onClick={() => removeSocial(index)}
                                className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all"
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {socials.length === 0 && (
                <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[2rem]">
                    <p className="text-slate-600 text-sm">No social profiles connected yet.</p>
                </div>
            )}

            {/* Action Footer */}
            <div className="pt-8 border-t border-white/5 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="group relative px-8 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 transition-all active:scale-[0.98] overflow-hidden"
                >
                    <span className="relative z-10">{isSaving ? "Syncing..." : "Update Socials"}</span>
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                </button>
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-slate-900 border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative animate-in zoom-in-95 duration-300">
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <h3 className="text-xl font-bold text-white mb-6">
                            {currentSocial?.index !== undefined ? "Edit Profile" : "Add Social Profile"}
                        </h3>

                        <form onSubmit={handleSocialSave} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Network Name</label>
                                <input
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-700 font-medium"
                                    placeholder="e.g. GitHub, LinkedIn, Portfolio"
                                    value={currentSocial?.network || ""}
                                    onChange={(e) => setCurrentSocial({ ...currentSocial, network: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Profile URL</label>
                                <input
                                    required
                                    type="url"
                                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-700 font-medium"
                                    placeholder="https://..."
                                    value={currentSocial?.url || ""}
                                    onChange={(e) => setCurrentSocial({ ...currentSocial, url: e.target.value })}
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-6 py-2.5 rounded-xl border border-white/10 text-white text-sm font-bold hover:bg-white/5 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20"
                                >
                                    {currentSocial?.index !== undefined ? "Update" : "Add Profile"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
