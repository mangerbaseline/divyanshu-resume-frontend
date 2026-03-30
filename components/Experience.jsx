import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Briefcase, X } from "lucide-react";

export default function Experience({ data, onSave, isSaving }) {
  const [rows, setRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExp, setCurrentExp] = useState(null);

  useEffect(() => {
    if (Array.isArray(data)) {
      setRows(data.map(item => ({
        ...item,
        id: item._id || item.id || Date.now() + Math.random()
      })));
    }
  }, [data]);

  const openModal = (exp = null) => {
    setCurrentExp(exp || { id: Date.now() + Math.random(), role: "", company: "", start: "", end: "", details: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentExp(null);
  };

  const handleExpSave = (e) => {
    e.preventDefault();
    const updatedRows = currentExp.isNew === false
      ? rows.map(r => r.id === currentExp.id ? currentExp : r)
      : [...rows, { ...currentExp, isNew: false }];

    setRows(updatedRows);
    closeModal();

    // Auto-save to DB
    const payload = updatedRows.map(({ id, _id, createdAt, updatedAt, userId, isNew, ...rest }) => rest);
    onSave('experience', payload);
  };

  const remove = (id) => {
    const updatedRows = rows.filter((x) => x.id !== id);
    setRows(updatedRows);
    const payload = updatedRows.map(({ id, _id, createdAt, updatedAt, userId, isNew, ...rest }) => rest);
    onSave('experience', payload);
  };

  const saveToDatabase = () => {
    const payload = rows.map(({ id, _id, createdAt, updatedAt, userId, isNew, ...rest }) => rest);
    onSave('experience', payload);
  };

  return (
    <section className="relative z-10 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Work Experience</h2>
          <p className="text-xs text-slate-500 mt-1">Timeline of your professional journey and career growth.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 rounded-xl bg-indigo-500 text-white text-xs font-bold hover:bg-indigo-400 transition-all active:scale-95 flex items-center gap-2"
        >
          <Plus size={14} /> Add Experience
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rows.map((r) => (
          <div
            key={r.id}
            className="group relative p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                <Briefcase size={18} />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-white text-sm tracking-tight truncate">{r.role || "Untitled Role"}</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-0.5 truncate">
                  {r.company}
                </p>
                {r.start && (
                  <p className="text-[10px] text-slate-600 font-medium lowercase">
                    {new Date(r.start).getFullYear()} — {r.end ? new Date(r.end).getFullYear() : "Present"}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openModal({ ...r, isNew: false })}
                className="p-1.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                <Edit2 size={12} />
              </button>
              <button
                onClick={() => remove(r.id)}
                className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {rows.length === 0 && (
        <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[2rem]">
          <p className="text-slate-600 text-sm">Your professional timeline is empty. Add your first role!</p>
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-8 border-t border-white/5 flex justify-end">
        <button
          onClick={saveToDatabase}
          disabled={isSaving}
          className="group relative px-8 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 transition-all active:scale-[0.98] overflow-hidden"
        >
          <span className="relative z-10">{isSaving ? "Syncing..." : "Save Experience"}</span>
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
        </button>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-white/10 w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-white mb-6">
              {currentExp?.isNew === false ? "Edit Experience" : "Add Work Experience"}
            </h3>

            <form onSubmit={handleExpSave} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Job Role</label>
                  <input
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-700 font-medium"
                    placeholder="e.g. Senior Software Engineer"
                    value={currentExp?.role || ""}
                    onChange={(e) => setCurrentExp({ ...currentExp, role: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Company</label>
                  <input
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-700 font-medium"
                    placeholder="e.g. Meta / Google"
                    value={currentExp?.company || ""}
                    onChange={(e) => setCurrentExp({ ...currentExp, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 outline-none transition-all [color-scheme:dark]"
                    value={currentExp?.start ? new Date(currentExp.start).toISOString().split('T')[0] : ""}
                    onChange={(e) => setCurrentExp({ ...currentExp, start: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">End Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 outline-none transition-all [color-scheme:dark]"
                    value={currentExp?.end ? new Date(currentExp.end).toISOString().split('T')[0] : ""}
                    onChange={(e) => setCurrentExp({ ...currentExp, end: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Responsibilities / Highlights</label>
                <textarea
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-700 resize-none min-h-[120px]"
                  placeholder="What was your impact? Technologies used?"
                  value={currentExp?.details || ""}
                  onChange={(e) => setCurrentExp({ ...currentExp, details: e.target.value })}
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
                  {currentExp?.isNew === false ? "Update" : "Save Experience"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
