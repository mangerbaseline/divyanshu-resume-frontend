import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, Save, Zap } from 'lucide-react';
import { API } from '../config';
import { toast } from 'react-hot-toast';

export default function ExtractResumeSection() {
  const [file, setFile] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf" || 
          selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setFile(selectedFile);
      } else {
        toast.error("Please upload a PDF or DOCX file.");
      }
    }
  };

  const handleExtract = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    setIsExtracting(true);
    setExtractedData(null);

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch(`${API}/api/extract-resume`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to extract data');
      }

      const data = await response.json();
      setExtractedData(data);
      toast.success("Resume extracted successfully!");
    } catch (error) {
      console.error('Extraction error:', error);
      toast.error("Failed to extract resume data. Please try again.");
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Upload className="w-5 h-5 text-indigo-400" />
          AI Resume Extractor
        </h2>
        <p className="text-slate-400 text-sm">
          Upload your existing resume to automatically populate your profile sections.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Column */}
        <div className="space-y-6">
          <div 
            className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer bg-white/5
              ${file ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/10 hover:border-white/20 hover:bg-white/10'}`}
            onClick={() => document.getElementById('resume-upload').click()}
          >
            <input 
              id="resume-upload"
              type="file" 
              className="hidden" 
              accept=".pdf,.docx"
              onChange={handleFileChange}
            />
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all
              ${file ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-500'}`}>
              <FileText className="w-8 h-8" />
            </div>
            <p className="text-sm font-bold text-white mb-1">
              {file ? file.name : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-slate-500">PDF or DOCX (Max 5MB)</p>
          </div>

          <button
            onClick={handleExtract}
            disabled={!file || isExtracting}
            className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold text-sm uppercase tracking-widest transition-all
              ${!file || isExtracting 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:scale-[1.02] active:scale-95 text-white shadow-lg shadow-indigo-600/20'}`}
          >
            {isExtracting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Extracting Data...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 fill-white/20" />
                Start Extraction
              </>
            )}
          </button>
        </div>

        {/* Results Preview Column */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[300px] flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3">
             <div className="w-20 h-20 bg-indigo-500/5 rounded-full blur-2xl"></div>
          </div>
          
          {!extractedData && !isExtracting && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-12 h-12 bg-slate-800/50 rounded-xl flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-slate-600" />
              </div>
              <p className="text-sm font-medium text-slate-500 italic">
                Extraction results will appear here after analysis.
              </p>
            </div>
          )}

          {isExtracting && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <Zap className="w-6 h-6 text-indigo-400 animate-pulse" />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Analyzing Resume</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Applying AI Models</p>
              </div>
            </div>
          )}

          {extractedData && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Extracted Data Preview</h3>
                 <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20 flex items-center gap-1">
                   <CheckCircle className="w-3 h-3" /> Ready
                 </span>
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {/* Experience */}
                {extractedData.experience?.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Experience</p>
                    {extractedData.experience.map((exp, i) => (
                      <div key={i} className="bg-white/5 border border-white/5 rounded-lg p-3">
                        <p className="text-sm font-bold text-white">{exp.role}</p>
                        <p className="text-xs text-indigo-400">{exp.company}</p>
                        <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{exp.details}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Education */}
                {extractedData.education?.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Education</p>
                    {extractedData.education.map((edu, i) => (
                      <div key={i} className="bg-white/5 border border-white/5 rounded-lg p-3">
                        <p className="text-sm font-bold text-white">{edu.degree}</p>
                        <p className="text-xs text-indigo-400">{edu.school}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Projects */}
                {extractedData.projects?.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Projects</p>
                    {extractedData.projects.map((proj, i) => (
                      <div key={i} className="bg-white/5 border border-white/5 rounded-lg p-3">
                        <p className="text-sm font-bold text-white">{proj.title}</p>
                        <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{proj.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                 <p className="text-[11px] text-indigo-300 font-medium leading-relaxed">
                   Note: This feature only shows extracted data for now. You can manually copy and paste details into your workspace sections.
                 </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
