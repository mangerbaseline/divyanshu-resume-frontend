'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { API } from '../config';
import { signOut } from 'next-auth/react';
import ProfileSection from '../components/ProfileSection';
import SkillsSection from '../components/Skills';
import ExperienceSection from '../components/Experience';
import EducationSection from '../components/Education';
import ProjectsSection from '../components/Projects';
import CertificationsSection from '../components/Certifications';
import GenerateResume from '../components/GenerateResume';
import UserResume from '../components/UserResume';
import Sidebar from '../components/Sidebar';
import SocialsSection from '../components/Socials';
import ProjectExperienceSection from '../components/ProjectExperience';
import GeneratedHistory from '../components/GeneratedHistory';
import ExtractResumeSection from '../components/ExtractResumeSection';
import JobStatusBoard from '../components/JobStatusBoard';
import SpecialTemplates from '../components/SpecialTemplates';
import { Toaster, toast } from 'react-hot-toast';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isTabLoaded, setIsTabLoaded] = useState(false);

  // Persistence logic for active tab - FIXED
  useEffect(() => {
    const savedTab = localStorage.getItem('lastActiveTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
    setIsTabLoaded(true);
  }, []);

  useEffect(() => {
    if (isTabLoaded && activeTab) {
      localStorage.setItem('lastActiveTab', activeTab);
    }
  }, [activeTab, isTabLoaded]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    signOut({ callbackUrl: '/signin' });
  };

  const [userData, setUserData] = useState({
    profile: {},
    skills: [],
    experience: [],
    education: [],
    projects: [],
    projectExperience: [],
    certifications: [],
    social: []
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    // Check if token exists and is not the string "undefined"
    if (token && token !== 'undefined' && token !== 'null') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API}/api/user/data`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToDatabase = async (section, data) => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API}/api/user/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ section, data })
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      setUserData(prev => ({
        ...prev,
        [section]: data
      }));

      const payload = await response.json();
      toast.success(`${section.charAt(0).toUpperCase() + section.slice(1)} updated successfully!`, {
        style: {
          background: '#1e293b',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
          fontSize: '13px'
        }
      });

      return payload;
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error(`Failed to save ${section}. Please try again.`, {
        style: {
          background: '#1e293b',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
          fontSize: '13px'
        }
      });
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  // Show sign-in prompt if not authenticated
  if (!isAuthenticated && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl border border-white/10 p-8 text-center">
          <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Authentication Required</h2>
          <p className="text-slate-400 mb-6">Please sign in to access your dashboard and manage your resume.</p>
          <button
            onClick={() => router.push('/signin')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Sign In to Continue
          </button>
          <p className="text-slate-500 text-sm mt-4">
            Don't have an account?{' '}
            <button onClick={() => router.push('/signup')} className="text-blue-400 hover:text-blue-300 font-medium">
              Sign up here
            </button>
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 font-medium animate-pulse">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05060f] font-sans text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      <Toaster position="top-right" reverseOrder={false} />
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-blue-600/15 rounded-full blur-[100px] mix-blend-screen animate-pulse animation-delay-2000"></div>
        <div className="absolute top-[20%] right-[10%] w-[25%] h-[25%] bg-violet-600/10 rounded-full blur-[80px] mix-blend-screen animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* Modern Sidebar Container */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userData={userData} handleLogout={handleLogout} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className={`${(activeTab === 'generate' || activeTab === 'userresume' || activeTab === 'jobs' || activeTab === 'special-templates') ? 'max-w-[1440px]' : 'max-w-4xl'} mx-auto px-4 py-4 transition-all duration-500`}>
            {/* Top Toolbar */}
            <header className="flex items-center justify-between mb-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl px-4 py-2.5">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <span className="text-white text-xs font-bold">R</span>
                </div>
                <div>
                  <h1 className="text-base font-bold text-white tracking-tight leading-none">Resume Workspace</h1>
                  <p className="text-[9px] text-slate-400 font-medium uppercase tracking-[0.1em] mt-0.5">Editing: {activeTab === 'profile' ? 'Primary Profile' : activeTab}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {isSaving && (
                  <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping" />
                    <span className="text-[10px] font-bold text-indigo-300 uppercase letter tracking-wider">Syncing</span>
                  </div>
                )}

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-[11px] font-bold text-white leading-none">{user?.name || "User"}</p>
                      <p className="text-[9px] mt-0.5 font-bold uppercase tracking-wider text-slate-500">
                        Free Account
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center overflow-hidden ring-2 ring-indigo-500/20 shadow-lg">
                      <span className="text-xs font-bold text-indigo-400 uppercase">{user?.name ? user.name[0] : "U"}</span>
                    </div>
                  </div>

                  <div className="h-8 w-px bg-white/10" />

                  {/* Portfolio Link Button */}
                  {user?.username && (
                    <button
                      onClick={() => window.open(`/u/${user.username}`, '_blank')}
                      className="text-[11px] font-bold uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-all active:scale-95 py-2 flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Portfolio
                    </button>
                  )}

                  <div className="h-8 w-px bg-white/10 hidden sm:block" />

                  <button
                    onClick={handleLogout}
                    className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-red-400 transition-all active:scale-95 py-2"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </header>

            {/* Smart AI Tools - NEW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div
                onClick={() => router.push('/ats-score')}
                className="group relative overflow-hidden bg-gradient-to-br from-indigo-600/10 to-violet-600/5 border border-white/10 p-5 rounded-2xl cursor-pointer hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/10"
              >
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                      ATS Score Checker
                      <span className="text-[8px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded uppercase tracking-widest">AI</span>
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Verify your resume score against job roles. Improve your chances of hiring.</p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => router.push('/interview-prep')}
                className="group relative overflow-hidden bg-gradient-to-br from-violet-600/10 to-indigo-600/5 border border-white/10 p-5 rounded-2xl cursor-pointer hover:border-violet-500/50 transition-all hover:shadow-2xl hover:shadow-violet-500/10"
              >
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl group-hover:bg-violet-500/20 transition-all"></div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-violet-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                      AI Interview Prep
                      <span className="text-[8px] bg-violet-500/20 text-violet-400 px-1.5 py-0.5 rounded uppercase tracking-widest">Personalized</span>
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Generate realistic interview questions based on your resume profile and experience.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Container */}
            <div className="relative">
              {/* Decorative Section Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">{activeTab} Details</span>
              </div>

              <div className="bg-white/3 border border-white/10 rounded-2xl p-6 backdrop-blur-sm min-h-[500px] shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Background Decoration for the card */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  {activeTab === 'profile' && <ProfileSection data={userData.profile || {}} onSave={saveToDatabase} isSaving={isSaving} />}
                  {activeTab === 'skills' && <SkillsSection data={userData.skills || []} onSave={saveToDatabase} isSaving={isSaving} />}
                  {activeTab === 'experience' && <ExperienceSection data={userData.experience || []} onSave={saveToDatabase} isSaving={isSaving} />}
                  {activeTab === 'education' && <EducationSection data={userData.education || []} onSave={saveToDatabase} isSaving={isSaving} />}
                  {activeTab === 'projects' && <ProjectsSection data={userData.projects || []} onSave={saveToDatabase} isSaving={isSaving} />}
                  {activeTab === 'projectExperience' && <ProjectExperienceSection data={userData.projectExperience || []} onSave={saveToDatabase} isSaving={isSaving} />}
                  {activeTab === 'social' && <SocialsSection data={userData.social || []} onSave={saveToDatabase} isSaving={isSaving} />}
                  {activeTab === 'certifications' && <CertificationsSection data={userData.certifications || []} onSave={saveToDatabase} isSaving={isSaving} />}
                  {activeTab === 'generate' && <GenerateResume data={userData} />}
                  {activeTab === 'userresume' && <UserResume data={userData} />}
                  {activeTab === 'extract' && <ExtractResumeSection />}
                  {activeTab === 'generated_history' && <GeneratedHistory />}
                  {activeTab === 'jobs' && <JobStatusBoard />}
                  {activeTab === 'special-templates' && <SpecialTemplates userData={userData} />}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
