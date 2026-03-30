import React, { useState } from "react";
import { User, Building2, Mail, Lock, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        age: "",
        howDidYouHearAboutUs: "",
        companyName: "",
        companySize: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            console.log("Server response:", result);
            alert("Form submitted successfully!");
        } catch (error) {
            console.error(error);
            alert("Error submitting form");
        }
    };

    const steps = [
        { id: 1, title: "Personal", icon: <User size={20} /> },
        { id: 2, title: "Company", icon: <Building2 size={20} /> },
        { id: 3, title: "Account", icon: <Lock size={20} /> }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="max-w-md w-full glass rounded-3xl p-8 shadow-2xl relative z-10 animate-fade-in-up">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gradient mb-2">Registration</h1>
                    <p className="text-slate-400">Join us and start your journey today</p>
                </div>

                {/* Step Indicator */}
                <div className="flex justify-between mb-12 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 z-0"></div>
                    <div
                        className="absolute top-1/2 left-0 h-0.5 bg-blue-500 -translate-y-1/2 z-0 transition-all duration-500"
                        style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                    ></div>
                    {steps.map((s) => (
                        <div key={s.id} className="relative z-10 flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${step >= s.id ? "bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]" : "bg-slate-800"
                                }`}>
                                {step > s.id ? <CheckCircle2 size={20} className="text-white" /> :
                                    <span className={step === s.id ? "text-white" : "text-slate-500"}>{s.icon}</span>}
                            </div>
                            <span className={`text-xs mt-2 font-medium ${step >= s.id ? "text-blue-400" : "text-slate-500"}`}>
                                {s.title}
                            </span>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Step 1: Personal Info */}
                    {step === 1 && (
                        <div className="space-y-4 animate-fade-in-up">
                            <div className="group">
                                <label className="block text-sm font-medium text-slate-300 mb-1 ml-1">Username</label>
                                <div className="relative">
                                    <input
                                        name="username"
                                        placeholder="johndoe"
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 pl-11 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder:text-slate-600"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                </div>
                            </div>
                            <div className="group">
                                <label className="block text-sm font-medium text-slate-300 mb-1 ml-1">Full Name</label>
                                <input
                                    name="name"
                                    placeholder="John Doe"
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder:text-slate-600"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="group">
                                <label className="block text-sm font-medium text-slate-300 mb-1 ml-1">Age</label>
                                <input
                                    name="age"
                                    type="number"
                                    placeholder="25"
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder:text-slate-600"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                onClick={nextStep}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-900/40 mt-8"
                            >
                                Next Step <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    )}

                    {/* Step 2: Company Info */}
                    {step === 2 && (
                        <div className="space-y-4 animate-fade-in-up">
                            <div className="group">
                                <label className="block text-sm font-medium text-slate-300 mb-1 ml-1">Referral Source</label>
                                <input
                                    name="howDidYouHearAboutUs"
                                    placeholder="Google, LinkedIn, Friends..."
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder:text-slate-600"
                                    value={formData.howDidYouHearAboutUs}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="group">
                                <label className="block text-sm font-medium text-slate-300 mb-1 ml-1">Company Name</label>
                                <div className="relative">
                                    <input
                                        name="companyName"
                                        placeholder="Tech Corp"
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 pl-11 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder:text-slate-600"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                </div>
                            </div>
                            <div className="group">
                                <label className="block text-sm font-medium text-slate-300 mb-1 ml-1">Company Size</label>
                                <select
                                    name="companySize"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white appearance-none"
                                    value={formData.companySize}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled className="bg-slate-900">Select Size</option>
                                    <option value="1-10" className="bg-slate-900">1-10 Employees</option>
                                    <option value="11-50" className="bg-slate-900">11-50 Employees</option>
                                    <option value="51-200" className="bg-slate-900">51-200 Employees</option>
                                    <option value="200+" className="bg-slate-900">200+ Employees</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="border border-slate-700 text-slate-300 font-semibold py-3 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group"
                                >
                                    <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" /> Back
                                </button>
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-900/40"
                                >
                                    Next <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Account Info */}
                    {step === 3 && (
                        <div className="space-y-4 animate-fade-in-up">
                            <div className="group">
                                <label className="block text-sm font-medium text-slate-300 mb-1 ml-1">Email Address</label>
                                <div className="relative">
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 pl-11 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder:text-slate-600"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                </div>
                            </div>
                            <div className="group">
                                <label className="block text-sm font-medium text-slate-300 mb-1 ml-1">Password</label>
                                <div className="relative">
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 pl-11 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder:text-slate-600"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                </div>
                            </div>
                            <div className="group">
                                <label className="block text-sm font-medium text-slate-300 mb-1 ml-1">Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder:text-slate-600"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="border border-slate-700 text-slate-300 font-semibold py-3 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group"
                                >
                                    <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" /> Back
                                </button>
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-900/40"
                                >
                                    Create Account
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default MultiStepForm;
