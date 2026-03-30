import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Star, X, Terminal } from "lucide-react";

export default function Skills({ data, onSave, isSaving }) {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);

  useEffect(() => {
    if (Array.isArray(data)) {
      setItems(data.map((skill, index) => ({ id: Date.now() + index + Math.random(), skill })));
    }
  }, [data]);

  const openModal = (skill = null) => {
    setCurrentSkill(skill || { id: Date.now() + Math.random(), skill: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentSkill(null);
  };

  const handleSkillSave = (e) => {
    e.preventDefault();
    if (!currentSkill.skill.trim()) return;

    const updatedItems = currentSkill.isNew === false
      ? items.map(it => it.id === currentSkill.id ? currentSkill : it)
      : [...items, { ...currentSkill, isNew: false }];

    setItems(updatedItems);
    closeModal();

    // Auto-save to DB
    const skillsArray = updatedItems.map(i => i.skill).filter(Boolean);
    onSave('skills', skillsArray);
  };

  const remove = (id) => {
    const updatedItems = items.filter((x) => x.id !== id);
    setItems(updatedItems);
    const skillsArray = updatedItems.map(i => i.skill).filter(Boolean);
    onSave('skills', skillsArray);
  };

  const saveToDatabase = () => {
    const skillsArray = items.map(i => i.skill).filter(Boolean);
    onSave('skills', skillsArray);
  };

  return (
    <section className="relative z-10 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Core Expertise</h2>
          <p className="text-xs text-slate-500 mt-1">List your technical skills and proficiencies.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 rounded-xl bg-indigo-500 text-white text-xs font-bold hover:bg-indigo-400 transition-all active:scale-95 flex items-center gap-2"
        >
          <Plus size={14} /> Add Skill
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((it) => (
          <div
            key={it.id}
            className="group relative p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                <Terminal size={14} />
              </div>
              <span className="text-sm font-bold text-white tracking-tight">{it.skill}</span>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => openModal({ ...it, isNew: false })}
                className="p-1 text-slate-500 hover:text-white transition-colors"
              >
                <Edit2 size={12} />
              </button>
              <button
                onClick={() => remove(it.id)}
                className="p-1 text-slate-500 hover:text-red-400 transition-colors"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[2rem]">
          <p className="text-slate-600 text-sm">No expertise listed yet. Click add to highlight your skills.</p>
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-8 border-t border-white/5 flex justify-end">
        <button
          onClick={saveToDatabase}
          disabled={isSaving}
          className="group relative px-8 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 transition-all active:scale-[0.98] overflow-hidden"
        >
          <span className="relative z-10">{isSaving ? "Syncing..." : "Save Expertise"}</span>
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
        </button>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-white/10 w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-white mb-6">
              {currentSkill?.isNew === false ? "Edit Skill" : "Add Skill"}
            </h3>

            <form onSubmit={handleSkillSave} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Skill Name</label>
                <input
                  required
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:bg-white/[0.06] focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-700 font-medium"
                  placeholder="e.g. React.js"
                  value={currentSkill?.skill || ""}
                  onChange={(e) => setCurrentSkill({ ...currentSkill, skill: e.target.value })}
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
                  {currentSkill?.isNew === false ? "Update" : "Add to List"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
