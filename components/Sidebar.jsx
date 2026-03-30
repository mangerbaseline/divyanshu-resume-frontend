// components/Sidebar.js
import { User, Layers, Briefcase, BookOpen, Star, Award, ChevronRight, FileText, Zap, Globe, LogOut, CreditCard, Palette, LayoutTemplate } from "lucide-react";
import { useRouter } from "next/router";

export default function Sidebar({ activeTab, setActiveTab, userData, handleLogout }) {
  const router = useRouter();
  const items = [
    { id: "profile", label: "Profile", Icon: User, color: "from-blue-500 to-cyan-400" },
    { id: "skills", label: "Skills", Icon: Star, color: "from-yellow-400 to-orange-500" },
    { id: "experience", label: "Work", Icon: Briefcase, color: "from-purple-500 to-indigo-500" },
    { id: "projectExperience", label: "Projects Exp", Icon: Zap, color: "from-blue-400 to-indigo-600" },
    { id: "education", label: "Education", Icon: BookOpen, color: "from-emerald-400 to-teal-500" },
    { id: "projects", label: "Projects", Icon: Layers, color: "from-pink-500 to-rose-500" },
    { id: "social", label: "Social", Icon: Globe, color: "from-cyan-400 to-blue-500" },
    { id: "certifications", label: "Certifications", Icon: Award, color: "from-indigo-400 to-violet-500" },
    { id: "userresume", label: "Preview", Icon: Zap, color: "from-orange-400 to-red-500" },
    { id: "customizer", label: "Theme", Icon: Palette, color: "from-pink-400 to-fuchsia-500" },
    { id: "generate", label: "Build", Icon: FileText, color: "from-slate-400 to-slate-600" },
    { id: "extract", label: "Extract", Icon: Zap, color: "from-indigo-400 to-cyan-500" },
    { id: "generated_history", label: "History", Icon: CreditCard, color: "from-green-400 to-emerald-500" },
    { id: "jobs", label: "Jobs", Icon: Briefcase, color: "from-teal-400 to-cyan-500" },
    { id: "special-templates", label: "Templates", Icon: LayoutTemplate, color: "from-fuchsia-500 to-pink-500" },
  ];

  return (
    <aside className="w-20 lg:w-[80px] h-screen bg-white/5 border-r border-white/10 flex flex-col items-center py-6 gap-6 backdrop-blur-xl relative z-20 transition-all duration-300">
      {/* Brand Icon */}
      <div className="relative group shrink-0">
        <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.3)] group-hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all transform group-hover:rotate-12">
          <Zap className="text-white w-6 h-6 fill-white/20" />
        </div>
      </div>

      <div className="w-8 h-px bg-white/10 shrink-0" />

      {/* Navigation */}
      <nav className="flex flex-col gap-5 flex-grow overflow-y-auto custom-sidebar-scrollbar py-4 px-2 w-full">
        {items.map(({ id, label, Icon, color }) => {
          const isActive = activeTab === id;

          return (
            <button
              key={id}
              onClick={() => {
                if (id === "customizer") {
                  router.push("/theme-customizer");
                } else {
                  setActiveTab(id);
                }
              }}
              className={`group relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-500
                ${isActive
                  ? "bg-indigo-500/10 shadow-[inset_0_0_15px_rgba(99,102,241,0.2)]"
                  : "hover:bg-white/5"
                }`}
            >
              {/* Active Indicator Tooltip (Optional, can be seen as label below) */}
              <div className={`p-2 rounded-lg transition-all duration-300 
                ${isActive
                  ? `bg-gradient-to-br ${color} shadow-lg shadow-indigo-500/20`
                  : "bg-slate-800/50 group-hover:bg-slate-700/50 text-slate-500 group-hover:text-slate-300"}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />
              </div>

              <span className={`text-[8px] font-bold mt-1.5 uppercase tracking-tight transition-all
                ${isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"}`}>
                {label}
              </span>

              {/* Side Indicator */}
              {isActive && (
                <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-1.5 h-6 bg-indigo-500 rounded-l-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="w-10 h-px bg-white/10 shrink-0" />

      {/* Profile Info (Icon only, no logout) */}
      <div className="flex flex-col gap-6 pb-4 shrink-0">
        <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center overflow-hidden ring-2 ring-indigo-500/20 shadow-lg">
          <span className="text-xs font-bold text-indigo-400 uppercase">{userData?.name ? userData.name[0] : userData?.profile?.name ? userData.profile.name[0] : "U"}</span>
        </div>
      </div>

      <style jsx>{`
        .custom-sidebar-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-sidebar-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-sidebar-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-sidebar-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </aside>
  );
}
