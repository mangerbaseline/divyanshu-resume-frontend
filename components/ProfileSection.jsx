import { useState, useEffect } from "react";

export default function ProfileSection({ data, onSave, isSaving }) {
  const [form, setForm] = useState({
    name: "",
    title: "",
    email: "",
    about: ""
  });

  useEffect(() => {
    if (data) {
      setForm(prev => ({ ...prev, ...data }));
    }
  }, [data]);

  const handleSave = () => {
    onSave('profile', form);
  };

  return (
    <section className="relative z-10 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Profile Details</h2>
          <p className="text-xs text-slate-500 mt-1">Provide your basic information and clinical title.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
          <input
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-600"
            placeholder="e.g. Alexander Pierce"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onBlur={handleSave}
          />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Professional Title</label>
          <input
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-600"
            placeholder="e.g. Senior Software Engineer"
            value={form.title || ""}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            onBlur={handleSave}
          />
        </div>

        {/* Email */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Contact Email</label>
          <input
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-600"
            placeholder="hello@alexander.com"
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onBlur={handleSave}
          />
        </div>

        {/* About */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Professional Summary</label>
          <textarea
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-600 resize-none min-h-[120px]"
            placeholder="Briefly describe your background and key strengths..."
            value={form.about || ""}
            onChange={(e) => setForm({ ...form, about: e.target.value })}
            onBlur={handleSave}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-8 border-t border-white/5 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="group relative px-8 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 transition-all active:scale-[0.98] overflow-hidden"
        >
          <span className="relative z-10">{isSaving ? "Syncing..." : "Update Profile"}</span>
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
}
