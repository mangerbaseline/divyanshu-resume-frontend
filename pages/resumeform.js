// pages/profile.js
"use client"; // if using app router; safe to keep in pages too
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProfileSection from "../components/ProfileSection";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Certifications from "../components/Certifications";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  const render = () => {
    switch (activeTab) {
      case "projects": return <Projects />;
      case "experience": return <Experience />;
      case "education": return <Education />;
      case "skills": return <Skills />;
      case "certifications": return <Certifications />;
      default: return <ProfileSection />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">{render()}</div>
      </main>
    </div>
  );
}
