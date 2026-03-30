import { useState, useEffect } from 'react';
import { API } from '../config';
import {
  Briefcase, Plus, Trash2, Edit3, Check, X, ChevronDown, ChevronUp,
  Building2, Calendar, DollarSign, MapPin, ExternalLink, Clock, Filter,
  Search, LayoutGrid, List, BarChart3, TrendingUp, AlertCircle, PartyPopper,
  Phone, Mail, Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';

const STATUS_CONFIG = {
  applied: { label: 'Applied', color: 'from-blue-500 to-cyan-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', dot: 'bg-blue-400' },
  interviewing: { label: 'Interviewing', color: 'from-amber-400 to-orange-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', dot: 'bg-amber-400' },
  interview_passed: { label: 'Interview Passed', color: 'from-cyan-400 to-blue-500', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', dot: 'bg-cyan-400' },
  offered: { label: 'Offered', color: 'from-emerald-400 to-green-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  accepted: { label: 'Accepted', color: 'from-green-400 to-emerald-600', bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', dot: 'bg-green-400' },
  rejected: { label: 'Rejected', color: 'from-red-400 to-rose-500', bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', dot: 'bg-red-400' },
  withdrawn: { label: 'Withdrawn', color: 'from-slate-400 to-slate-500', bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-400', dot: 'bg-slate-400' },
};

const EMPTY_JOB = {
  companyName: '',
  jobTitle: '',
  location: '',
  status: 'applied',
  appliedDate: '',
  interviewDate: '',
  joiningDate: '',
  salary: '',
  jobLink: '',
  contactPerson: '',
  contactEmail: '',
  contactPhone: '',
  notes: '',
};

export default function JobStatusBoard() {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ ...EMPTY_JOB });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('cards');
  const [expandedCard, setExpandedCard] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  };

  // Fetch all jobs from the database
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API}/api/jobs`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      } else {
        console.error('Failed to fetch jobs');
        toast.error('Failed to load job applications', {
          style: { background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontSize: '13px' }
        });
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Error connecting to server', {
        style: { background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontSize: '13px' }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.companyName.trim() || !formData.jobTitle.trim()) return;

    setIsSaving(true);
    try {
      if (editingId) {
        // Update existing job
        const res = await fetch(`${API}/api/jobs/${editingId}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const updated = await res.json();
          setJobs(prev => prev.map(j => j._id === editingId ? updated : j));
          toast.success('Application updated successfully!', {
            style: { background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontSize: '13px' }
          });
        } else {
          throw new Error('Failed to update');
        }
        setEditingId(null);
      } else {
        // Create new job
        const res = await fetch(`${API}/api/jobs`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const newJob = await res.json();
          setJobs(prev => [newJob, ...prev]);
          toast.success('Application saved successfully!', {
            style: { background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontSize: '13px' }
          });
        } else {
          throw new Error('Failed to create');
        }
      }
      setFormData({ ...EMPTY_JOB });
      setShowForm(false);
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error('Failed to save application. Please try again.', {
        style: { background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontSize: '13px' }
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (job) => {
    setFormData({
      companyName: job.companyName || '',
      jobTitle: job.jobTitle || '',
      location: job.location || '',
      status: job.status || 'applied',
      appliedDate: job.appliedDate || '',
      interviewDate: job.interviewDate || '',
      joiningDate: job.joiningDate || '',
      salary: job.salary || '',
      jobLink: job.jobLink || '',
      contactPerson: job.contactPerson || '',
      contactEmail: job.contactEmail || '',
      contactPhone: job.contactPhone || '',
      notes: job.notes || '',
    });
    setEditingId(job._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/api/jobs/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setJobs(prev => prev.filter(j => j._id !== id));
        toast.success('Application deleted', {
          style: { background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontSize: '13px' }
        });
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete application', {
        style: { background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontSize: '13px' }
      });
    }
    setShowDeleteConfirm(null);
  };

  const handleQuickStatusUpdate = async (id, newStatus) => {
    try {
      const res = await fetch(`${API}/api/jobs/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setJobs(prev => prev.map(j => j._id === id ? updated : j));
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status', {
        style: { background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontSize: '13px' }
      });
    }
  };

  const cancelForm = () => {
    setFormData({ ...EMPTY_JOB });
    setEditingId(null);
    setShowForm(false);
  };

  // Filter and sort
  const filteredJobs = jobs
    .filter(job => {
      const matchesSearch = job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'all' || job.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'company') return a.companyName.localeCompare(b.companyName);
      if (sortBy === 'status') {
        const order = ['accepted', 'offered', 'interviewing', 'applied', 'withdrawn', 'rejected'];
        return order.indexOf(a.status) - order.indexOf(b.status);
      }
      return 0;
    });

  // Stats
  const stats = {
    total: jobs.length,
    applied: jobs.filter(j => j.status === 'applied').length,
    interviewing: jobs.filter(j => j.status === 'interviewing').length,
    offered: jobs.filter(j => j.status === 'offered').length,
    accepted: jobs.filter(j => j.status === 'accepted').length,
    rejected: jobs.filter(j => j.status === 'rejected').length,
  };

  const successRate = stats.total > 0 ? Math.round(((stats.accepted + stats.offered) / stats.total) * 100) : 0;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
        <div className="p-4 bg-indigo-500/10 rounded-2xl mb-4">
          <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
        </div>
        <p className="text-sm font-bold text-slate-400">Loading your applications...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl shadow-lg shadow-indigo-500/20">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            Job Status Board
          </h2>
          <p className="text-sm text-slate-400 mt-1 font-medium">Track your job applications, interviews, and offers in one place</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setFormData({ ...EMPTY_JOB }); }}
          className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl font-bold text-sm hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-95"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          Add Application
        </button>
      </div>

      {/* Stats Summary - Consolidated */}
      {!isLoading && jobs.length > 0 && !showForm && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {/* Total Applications Card */}
            <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.08]">
              <div className="flex items-center justify-between mb-2">
                <div className="w-2 h-2 rounded-full bg-slate-400 shadow-lg shadow-slate-400/20" />
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 opacity-70">Total</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-black text-white">{jobs.length}</span>
                <div className="text-[10px] font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded-full">
                  100%
                </div>
              </div>
            </div>

            {/* Dynamic Status Cards */}
            {Object.entries(STATUS_CONFIG).map(([key, val]) => {
              const count = jobs.filter(j => j.status === key).length;
              return (
                <div
                  key={key}
                  className={`group relative bg-white/5 border ${val.border} rounded-2xl p-4 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.08]`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-2 h-2 rounded-full ${val.dot} shadow-lg ${val.text.replace('text', 'shadow')}/20`} />
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest ${val.text} opacity-70`}>{val.label}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-black text-white">{count}</span>
                    <div className={`text-[10px] font-bold ${val.text} bg-white/5 px-2 py-0.5 rounded-full`}>
                      {jobs.length > 0 ? Math.round((count / jobs.length) * 100) : 0}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Success Rate Bar Moved Inside Summary */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Success Rate</span>
              </div>
              <span className="text-sm font-extrabold text-white">{successRate}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${successRate}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-2 font-medium">Calculation: (Accepted + Offered) / Total Applications</p>
          </div>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              {editingId ? <Edit3 className="w-4 h-4 text-indigo-400" /> : <Plus className="w-4 h-4 text-indigo-400" />}
              {editingId ? 'Edit Application' : 'New Job Application'}
            </h3>
            <button onClick={cancelForm} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Group 1: Company & Role */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-violet-600 rounded-full" />
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Company & Role</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Company Name *</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData(p => ({ ...p, companyName: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                      placeholder="e.g. Google"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Job Title *</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={formData.jobTitle}
                      onChange={(e) => setFormData(p => ({ ...p, jobTitle: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                      placeholder="e.g. Software Engineer"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(p => ({ ...p, location: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                      placeholder="e.g. Bangalore, Remote"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Group 2: Status & Dates */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full" />
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Status & Timeline</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Application Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(p => ({ ...p, status: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2394a3b8' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                  >
                    {Object.entries(STATUS_CONFIG).filter(([key]) => {
                      // Logic: If interview date is in future, hide Offered/Accepted/Rejected
                      if (formData.interviewDate) {
                        const isFutureInterview = new Date(formData.interviewDate) > new Date();
                        if (isFutureInterview && ['offered', 'accepted', 'rejected'].includes(key)) {
                          return false;
                        }
                      }
                      return true;
                    }).map(([key, val]) => (
                      <option key={key} value={key} className="bg-slate-900">{val.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Applied Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="date"
                      value={formData.appliedDate}
                      onChange={(e) => setFormData(p => ({ ...p, appliedDate: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all [color-scheme:dark]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Interview Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="date"
                      value={formData.interviewDate}
                      onChange={(e) => setFormData(p => ({ ...p, interviewDate: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all [color-scheme:dark]"
                    />
                  </div>
                </div>
                {!(formData.interviewDate && new Date(formData.interviewDate) > new Date()) && (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Joining Date (By HR)</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="date"
                        value={formData.joiningDate}
                        onChange={(e) => setFormData(p => ({ ...p, joiningDate: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all [color-scheme:dark]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Group 3: Compensation & Link */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-gradient-to-b from-emerald-400 to-green-500 rounded-full" />
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Compensation & Link</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Salary / CTC</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={formData.salary}
                      onChange={(e) => setFormData(p => ({ ...p, salary: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                      placeholder="e.g. ₹12 LPA or $120,000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Job Posting Link</label>
                  <div className="relative">
                    <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="url"
                      value={formData.jobLink}
                      onChange={(e) => setFormData(p => ({ ...p, jobLink: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Group 4: Contact Info */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Contact Person (Optional)</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Name</label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData(p => ({ ...p, contactPerson: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                    placeholder="HR / Recruiter name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData(p => ({ ...p, contactEmail: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                      placeholder="hr@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData(p => ({ ...p, contactPhone: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Group 5: Notes */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-gradient-to-b from-pink-400 to-rose-500 rounded-full" />
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Notes</h4>
              </div>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(p => ({ ...p, notes: e.target.value }))}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none"
                placeholder="Any notes about this application, interview rounds, feedback, follow-ups..."
              />
            </div>

            {/* Submit / Cancel */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {isSaving ? 'Saving...' : (editingId ? 'Update Application' : 'Save Application')}
              </button>
              <button
                type="button"
                onClick={cancelForm}
                className="flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 text-slate-300 rounded-xl font-bold text-sm hover:bg-white/10 transition-all"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Space before filters */}
      {!showForm && jobs.length > 0 && <div className="mt-2" />}

      {/* Controls Bar */}
      {jobs.length > 0 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company, title, location..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/30 transition-all"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500 hidden sm:block" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/30 transition-all appearance-none cursor-pointer min-w-[130px]"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2394a3b8' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
            >
              <option value="all" className="bg-slate-900">All Status</option>
              {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                <option key={key} value={key} className="bg-slate-900">{val.label}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/30 transition-all appearance-none cursor-pointer min-w-[120px]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2394a3b8' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
          >
            <option value="newest" className="bg-slate-900">Newest First</option>
            <option value="oldest" className="bg-slate-900">Oldest First</option>
            <option value="company" className="bg-slate-900">By Company</option>
            <option value="status" className="bg-slate-900">By Status</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-white/5 rounded-lg border border-white/10 p-0.5">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded-md transition-all ${viewMode === 'cards' ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition-all ${viewMode === 'table' ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {jobs.length === 0 && !showForm && (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
            <Briefcase className="w-10 h-10 text-indigo-400/60" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No Applications Yet</h3>
          <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">Start tracking your job applications to keep everything organized and never miss an update.</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl font-bold text-sm hover:shadow-xl hover:shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add Your First Application
          </button>
        </div>
      )}

      {/* No Results */}
      {jobs.length > 0 && filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-400">No matching applications</h3>
          <p className="text-xs text-slate-600 mt-1">Try adjusting your search or filter</p>
        </div>
      )}

      {/* Card View */}
      {viewMode === 'cards' && filteredJobs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => {
            const statusCfg = STATUS_CONFIG[job.status] || STATUS_CONFIG.applied;
            const isExpanded = expandedCard === job._id;

            return (
              <div
                key={job._id}
                className={`group relative bg-gradient-to-br from-white/5 to-white/[0.02] border ${statusCfg.border} rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:border-white/20`}
              >
                {/* Status Strip */}
                <div className={`h-1 bg-gradient-to-r ${statusCfg.color}`} />

                <div className="p-5">
                  {/* Top row: Company & Status */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-xl ${statusCfg.bg} flex items-center justify-center shrink-0 border ${statusCfg.border}`}>
                        <Building2 className={`w-5 h-5 ${statusCfg.text}`} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-extrabold text-white truncate">{job.companyName}</h4>
                        <p className="text-xs text-slate-400 font-medium truncate">{job.jobTitle}</p>
                      </div>
                    </div>
                    <span className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusCfg.bg} ${statusCfg.text} border ${statusCfg.border}`}>
                      {statusCfg.label}
                    </span>
                  </div>

                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-3 mb-3 text-slate-500">
                    {job.location && (
                      <span className="flex items-center gap-1 text-[11px] font-medium">
                        <MapPin className="w-3 h-3" /> {job.location}
                      </span>
                    )}
                    {job.salary && (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400/80">
                        <DollarSign className="w-3 h-3" /> {job.salary}
                      </span>
                    )}
                    {job.appliedDate && (
                      <span className="flex items-center gap-1 text-[11px] font-medium">
                        <Calendar className="w-3 h-3" /> {new Date(job.appliedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-white/5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      {job.interviewDate && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-500 font-medium w-24">Interview:</span>
                          <span className="text-white font-semibold">{new Date(job.interviewDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                      )}
                      {job.joiningDate && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-500 font-medium w-24">HR Joining Date:</span>
                          <span className="text-green-400 font-semibold">{new Date(job.joiningDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                      )}
                      {job.contactPerson && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-500 font-medium w-24">Contact:</span>
                          <span className="text-white font-semibold">{job.contactPerson}</span>
                        </div>
                      )}
                      {job.contactEmail && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-500 font-medium w-24">Email:</span>
                          <a href={`mailto:${job.contactEmail}`} className="text-indigo-400 hover:underline font-semibold">{job.contactEmail}</a>
                        </div>
                      )}
                      {job.contactPhone && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-500 font-medium w-24">Phone:</span>
                          <a href={`tel:${job.contactPhone}`} className="text-indigo-400 hover:underline font-semibold">{job.contactPhone}</a>
                        </div>
                      )}
                      {job.jobLink && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-500 font-medium w-24">Link:</span>
                          <a href={job.jobLink} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline font-semibold flex items-center gap-1 truncate">
                            View Posting <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                      {job.notes && (
                        <div className="mt-2 p-3 bg-white/5 rounded-xl text-[11px] text-slate-400 leading-relaxed border border-white/5">
                          <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider block mb-1">Notes</span>
                          {job.notes}
                        </div>
                      )}

                      {/* Quick Status Update */}
                      <div className="mt-3 pt-3 border-t border-white/5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Quick Status Update</span>
                        <div className="flex flex-wrap gap-1.5">
                          {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                            <button
                              key={key}
                              onClick={() => handleQuickStatusUpdate(job._id, key)}
                              className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all ${job.status === key
                                ? `${val.bg} ${val.text} border ${val.border}`
                                : 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300 border border-transparent'
                                }`}
                            >
                              {val.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                    <button
                      onClick={() => setExpandedCard(isExpanded ? null : job._id)}
                      className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-indigo-400 transition-colors"
                    >
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      {isExpanded ? 'Less' : 'Details'}
                    </button>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(job)}
                        className="p-1.5 rounded-lg hover:bg-indigo-500/10 text-slate-500 hover:text-indigo-400 transition-all"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      {showDeleteConfirm === job._id ? (
                        <div className="flex items-center gap-1 animate-in fade-in duration-200">
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                            title="Confirm Delete"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(null)}
                            className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 transition-all"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowDeleteConfirm(job._id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && filteredJobs.length > 0 && (
        <div className="overflow-x-auto bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Company</th>
                <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Applied</th>
                <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Salary</th>
                <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job, idx) => {
                const statusCfg = STATUS_CONFIG[job.status] || STATUS_CONFIG.applied;
                return (
                  <tr key={job._id} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${idx % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg ${statusCfg.bg} flex items-center justify-center shrink-0`}>
                          <Building2 className={`w-3.5 h-3.5 ${statusCfg.text}`} />
                        </div>
                        <span className="text-sm font-bold text-white truncate max-w-[140px]">{job.companyName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-300 font-medium truncate max-w-[120px]">{job.jobTitle}</td>
                    <td className="px-4 py-3 text-xs text-slate-500 font-medium">{job.location || '—'}</td>
                    <td className="px-4 py-3">
                      <select
                        value={job.status}
                        onChange={(e) => handleQuickStatusUpdate(job._id, e.target.value)}
                        className={`${statusCfg.bg} ${statusCfg.text} border ${statusCfg.border} rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider focus:outline-none cursor-pointer appearance-none text-center`}
                        style={{ backgroundImage: 'none' }}
                      >
                        {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                          <option key={key} value={key} className="bg-slate-900 text-white">{val.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500 font-medium">
                      {job.appliedDate ? new Date(job.appliedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}
                    </td>
                    <td className="px-4 py-3 text-xs text-emerald-400/80 font-semibold">{job.salary || '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {job.jobLink && (
                          <a href={job.jobLink} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-indigo-400 transition-all">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button onClick={() => handleEdit(job)} className="p-1.5 rounded-lg hover:bg-indigo-500/10 text-slate-500 hover:text-indigo-400 transition-all">
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(job._id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
