import React, { useState } from "react";
import { Download, Printer, LayoutTemplate } from "lucide-react";
import ResumePreview from "./ResumePreview";
export default function GenerateResume({ data }) {
    const [template, setTemplate] = useState('template1');
    const [font, setFont] = useState('font-sans'); // Inter default
    const [color, setColor] = useState('#000000'); // Black default
    const [pagePadding, setPagePadding] = useState(10); // in mm
    const [sectionSpacing, setSectionSpacing] = useState(24); // in px (margin top for sections)

    // New customization options
    const [h2Size, setH2Size] = useState(14);
    const [h3Size, setH3Size] = useState(12);
    const [h2Padding, setH2Padding] = useState(4);
    const [h3Padding, setH3Padding] = useState(0);
    const [h2Color, setH2Color] = useState('#000000');
    const [h3Color, setH3Color] = useState('#000000');
    const [pSize, setPSize] = useState(11);
    const [pPadding, setPPadding] = useState(0);
    const [pColor, setPColor] = useState('#000000');
    const [nameSize, setNameSize] = useState(36);
    const [titleSize, setTitleSize] = useState(18);
    const [headerSpacing, setHeaderSpacing] = useState(24);
    const [sectionOrder, setSectionOrder] = useState([
        { id: 'summary', label: 'Summary' },
        { id: 'skills', label: 'Technical Skills' },
        { id: 'experience', label: 'Experience' },
        { id: 'projects', label: 'Projects' },
        { id: 'education', label: 'Education' },
        { id: 'additional', label: 'Additional Info' }
    ]);
    const [isGenerating, setIsGenerating] = useState(false);

    const fonts = [
        { id: 'font-sans', label: 'Inter (Modern)', family: 'Inter, system-ui, sans-serif' },
        { id: 'font-serif', label: 'Georgia (Classic)', family: 'Georgia, serif' },
        { id: 'font-times', label: 'Times New Roman', family: '"Times New Roman", Times, serif' },
        { id: 'font-garamond', label: 'Garamond (Elegant)', family: '"EB Garamond", Garamond, serif' },
    ];

    const moveSection = (index, direction) => {
        const newOrder = [...sectionOrder];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= newOrder.length) return;
        
        [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
        setSectionOrder(newOrder);
    };

    const colors = [
        { id: 'black', value: '#000000' },
        { id: 'blue', value: '#2563eb' },
        { id: 'slate', value: '#334155' },
        { id: 'emerald', value: '#059669' },
        { id: 'indigo', value: '#4f46e5' },
        { id: 'rose', value: '#e11d48' },
        { id: 'amber', value: '#d97706' },
    ];

    const handleDownload = async () => {
        const element = document.getElementById('resume-pdf-target');
        if (!element || isGenerating) return;

        setIsGenerating(true);
        const { toast } = await import('react-hot-toast');
        const toastId = toast.loading("Preparing your resume PDF...");

        const opt = {
            margin: 0,
            filename: `Resume_${data.profile?.name || 'User'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true,
                allowTaint: true,
                logging: false,
                backgroundColor: '#ffffff',
                // Explicitly handle scroll to prevent white gap at top
                scrollY: 0,
                scrollX: 0,
                windowWidth: 794, // Fixed width for A4 at 96DPI
                // Ensure the full element is captured, not just the viewport
                // This is usually handled by html2pdf.js when passing an element
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            // Re-enable 'break-inside: avoid' for sections using a more reliable CSS approach.
            // html2pdf.js's pagebreak.avoid option is designed for this.
            pagebreak: { mode: ['css', 'legacy'], avoid: '.section-avoid-break' }
        };

        try {
            // Reset scroll position temporarily or use the container directly
            // The hidden container approach is good, but we must ensure it's at the top of the body
            const html2pdf = (await import('html2pdf.js')).default;

            // Use a chain of promises instead of mixing await/then to avoid R2/DOM sync issues
            const worker = html2pdf().set(opt).from(element);

            // Step 1: Trigger the local download
            await worker.save();

            // Step 2: Extract blob for cloud history
            const pdfBlob = await worker.output('blob');

            if (pdfBlob) {
                const reader = new FileReader();
                reader.readAsDataURL(pdfBlob);
                reader.onloadend = async () => {
                    try {
                        const base64data = reader.result;
                        const token = localStorage.getItem('token');
                        const { API } = await import('../config');

                        await fetch(`${API}/api/upload-resume`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                fileName: `Resume_${data.profile?.name || 'User'}.pdf`,
                                pdfBase64: base64data,
                                templateName: template
                            })
                        });
                        toast.success("Saved to cloud history!", { id: toastId });
                    } catch (e) {
                        console.error("Cloud save error:", e);
                        toast.error("Downloaded, but cloud sync failed.", { id: toastId });
                    }
                };
            } else {
                toast.success("Resume downloaded successfully!", { id: toastId });
            }
        } catch (error) {
            console.error("PDF Generation Error:", error);
            toast.error("PDF generation failed. Check console for details.", { id: toastId });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
            {/* Sidebar for Customization */}
            <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-4">
                <div className="bg-slate-900/50 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/10 flex flex-col gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full blur-2xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

                    <div>
                        <h2 className="text-lg font-bold text-white leading-tight">Customization</h2>
                        <p className="text-slate-400 text-[10px] mt-0.5">Refine your professional look.</p>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Header Branding</label>
                        <div className="bg-slate-800/20 p-4 rounded-2xl border border-white/5 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-slate-400 font-bold">NAME SIZE</span>
                                <input
                                    type="number" value={nameSize}
                                    onChange={(e) => setNameSize(parseInt(e.target.value))}
                                    className="w-16 bg-slate-700 text-white text-xs px-2 py-1 rounded"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-slate-400 font-bold">TITLE SIZE</span>
                                <input
                                    type="number" value={titleSize}
                                    onChange={(e) => setTitleSize(parseInt(e.target.value))}
                                    className="w-16 bg-slate-700 text-white text-xs px-2 py-1 rounded"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-slate-400 font-bold">BOT SPACING</span>
                                <input
                                    type="number" value={headerSpacing}
                                    onChange={(e) => setHeaderSpacing(parseInt(e.target.value))}
                                    className="w-16 bg-slate-700 text-white text-xs px-2 py-1 rounded"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Download Button moved here for visibility */}
                        <button
                            onClick={handleDownload}
                            disabled={isGenerating}
                            className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold transition-all shadow-lg shadow-indigo-500/25 ${isGenerating
                                ? 'bg-slate-700 cursor-not-allowed text-slate-400'
                                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                                }`}
                        >
                            {isGenerating ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    <span>Generating...</span>
                                </>
                            ) : (
                                <>
                                    <Download size={20} />
                                    <span>Download PDF</span>
                                </>
                            )}
                        </button>

                        <div className="h-px bg-white/5 w-full" />

                        {/* Template Selector */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                <LayoutTemplate size={12} /> Template Design
                            </label>
                            <select
                                value={template}
                                onChange={(e) => setTemplate(e.target.value)}
                                className="w-full bg-slate-800/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500/50 transition-all font-medium appearance-none cursor-pointer hover:bg-slate-800/60"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
                            >
                                <option value="template1" className="bg-slate-900 text-white">Modern Layout</option>
                                <option value="template2" className="bg-slate-900 text-white">Minimalist Style</option>
                                <option value="template3" className="bg-slate-900 text-white">Grid Based</option>
                                <option value="template4" className="bg-slate-900 text-white">Executive Corporate</option>
                                <option value="template5" className="bg-slate-900 text-white">Professional Classic</option>
                            </select>
                        </div>

                        {/* Font Selector */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Typography / Font Family</label>
                            <select
                                value={font}
                                onChange={(e) => setFont(e.target.value)}
                                className="w-full bg-slate-800/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500/50 transition-all font-medium appearance-none cursor-pointer hover:bg-slate-800/60"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
                            >
                                {fonts.map(f => (
                                    <option key={f.id} value={f.id} className="bg-slate-900 text-white" style={{ fontFamily: f.family }}>{f.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Layout Spacing */}
                        <div className="space-y-4 pt-2 border-t border-white/5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Layout Spacing</label>
                            <div className="bg-slate-800/20 p-4 rounded-2xl border border-white/5 space-y-5">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                        <span>Page Padding</span>
                                        <span className="text-white bg-slate-700 px-2 py-0.5 rounded-md">{pagePadding}mm</span>
                                    </div>
                                    <input
                                        type="range" min="5" max="40" value={pagePadding}
                                        onChange={(e) => setPagePadding(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                        <span>Section Gap</span>
                                        <span className="text-white bg-slate-700 px-2 py-0.5 rounded-md">{sectionSpacing}px</span>
                                    </div>
                                    <input
                                        type="range" min="8" max="48" value={sectionSpacing}
                                        onChange={(e) => setSectionSpacing(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Color Picker */}
                        <div className="space-y-4 pt-2 border-t border-white/5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Accent Color</label>
                            <div className="grid grid-cols-4 gap-3 bg-slate-800/20 p-4 rounded-2xl border border-white/5">
                                {colors.map(c => (
                                    <button
                                        key={c.id}
                                        onClick={() => setColor(c.value)}
                                        className={`group relative w-full aspect-square rounded-xl border-2 transition-all flex items-center justify-center ${color === c.value ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                        style={{ backgroundColor: c.value }}
                                    >
                                        {color === c.value && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-xl" />}
                                    </button>
                                ))}
                                <div className="relative group w-full aspect-square rounded-xl border-2 border-white/5 bg-slate-800/50 hover:border-white/20 transition-all flex items-center justify-center cursor-pointer">
                                    <input
                                        type="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                    />
                                    <div className="text-[10px] font-black text-white pointer-events-none">+</div>
                                </div>
                            </div>
                        </div>

                        {/* Heading Customization */}
                        <div className="space-y-4 pt-2 border-t border-white/5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Heading 2 (Sections)</label>
                            <div className="bg-slate-800/20 p-4 rounded-2xl border border-white/5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-slate-400 font-bold">FONT SIZE</span>
                                    <input
                                        type="number" value={h2Size}
                                        onChange={(e) => setH2Size(parseInt(e.target.value))}
                                        className="w-16 bg-slate-700 text-white text-xs px-2 py-1 rounded"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-slate-400 font-bold">PADDING</span>
                                    <input
                                        type="number" value={h2Padding}
                                        onChange={(e) => setH2Padding(parseInt(e.target.value))}
                                        className="w-16 bg-slate-700 text-white text-xs px-2 py-1 rounded"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-slate-400 font-bold">COLOR</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setH2Color(color)}
                                            className="text-[9px] text-indigo-400 hover:text-indigo-300 font-bold uppercase"
                                        >
                                            Reset
                                        </button>
                                        <input
                                            type="color" value={h2Color}
                                            onChange={(e) => setH2Color(e.target.value)}
                                            className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-2 border-t border-white/5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Heading 3 (Items)</label>
                            <div className="bg-slate-800/20 p-4 rounded-2xl border border-white/5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-slate-400 font-bold">FONT SIZE</span>
                                    <input
                                        type="number" value={h3Size}
                                        onChange={(e) => setH3Size(parseInt(e.target.value))}
                                        className="w-16 bg-slate-700 text-white text-xs px-2 py-1 rounded"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-slate-400 font-bold">PADDING</span>
                                    <input
                                        type="number" value={h3Padding}
                                        onChange={(e) => setH3Padding(parseInt(e.target.value))}
                                        className="w-16 bg-slate-700 text-white text-xs px-2 py-1 rounded"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-slate-400 font-bold">COLOR</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setH3Color(color)}
                                            className="text-[9px] text-indigo-400 hover:text-indigo-300 font-bold uppercase"
                                        >
                                            Reset
                                        </button>
                                        <input
                                            type="color" value={h3Color}
                                            onChange={(e) => setH3Color(e.target.value)}
                                            className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section Order */}
                        <div className="space-y-4 pt-2 border-t border-white/5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Section Order</label>
                            <div className="bg-slate-800/20 p-2 rounded-2xl border border-white/5 space-y-1">
                                {sectionOrder.map((section, index) => (
                                    <div key={section.id} className="flex items-center justify-between bg-slate-800/40 p-2 rounded-xl border border-white/5 group hover:border-indigo-500/30 transition-all">
                                        <span className="text-[10px] font-bold text-slate-300 pl-1">{section.label}</span>
                                        <div className="flex gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => moveSection(index, 'up')}
                                                disabled={index === 0}
                                                className="w-6 h-6 flex items-center justify-center bg-slate-700 hover:bg-indigo-600 rounded-md text-white disabled:opacity-20 disabled:hover:bg-slate-700 transition-colors"
                                            >
                                                <span className="text-xs leading-none mt-[-2px]">↑</span>
                                            </button>
                                            <button 
                                                onClick={() => moveSection(index, 'down')}
                                                disabled={index === sectionOrder.length - 1}
                                                className="w-6 h-6 flex items-center justify-center bg-slate-700 hover:bg-indigo-600 rounded-md text-white disabled:opacity-20 disabled:hover:bg-slate-700 transition-colors"
                                            >
                                                <span className="text-xs leading-none mt-[2px]">↓</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 pt-2 border-t border-white/5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Body Text (Paragraphs)</label>
                            <div className="bg-slate-800/20 p-4 rounded-2xl border border-white/5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-slate-400 font-bold">FONT SIZE</span>
                                    <input
                                        type="number" value={pSize}
                                        onChange={(e) => setPSize(parseInt(e.target.value))}
                                        className="w-16 bg-slate-700 text-white text-xs px-2 py-1 rounded"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-slate-400 font-bold">PADDING</span>
                                    <input
                                        type="number" value={pPadding}
                                        onChange={(e) => setPPadding(parseInt(e.target.value))}
                                        className="w-16 bg-slate-700 text-white text-xs px-2 py-1 rounded"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-slate-400 font-bold">COLOR</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setPColor('#000000')}
                                            className="text-[9px] text-indigo-400 hover:text-indigo-300 font-bold uppercase"
                                        >
                                            Black
                                        </button>
                                        <input
                                            type="color" value={pColor}
                                            onChange={(e) => setPColor(e.target.value)}
                                            className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 bg-slate-900/30 border border-white/5 rounded-[32px] p-6 lg:p-8 overflow-y-auto flex justify-center print:hidden relative custom-scrollbar shadow-inner">
                <div className="w-[210mm] scale-[0.4] sm:scale-[0.55] md:scale-[0.65] lg:scale-[0.7] xl:scale-[0.85] origin-top transition-all duration-500 shadow-2xl shadow-black/50">
                    <ResumePreview
                        data={data}
                        template={template}
                        font={font}
                        color={color}
                        pagePadding={pagePadding}
                        sectionSpacing={sectionSpacing}
                        h2Size={h2Size}
                        h3Size={h3Size}
                        h2Padding={h2Padding}
                        h3Padding={h3Padding}
                        h2Color={h2Color}
                        h3Color={h3Color}
                        pSize={pSize}
                        pPadding={pPadding}
                        pColor={pColor}
                        nameSize={nameSize}
                        titleSize={titleSize}
                        headerSpacing={headerSpacing}
                        sectionOrder={sectionOrder.map(s => s.id)}
                    />
                </div>
            </div>

            {/* Hidden Container for PDF Generation */}
            <div className="fixed left-[-9999px] top-0 overflow-hidden">
                <div id="pdf-wrapper" className="w-[210mm]">
                    <ResumePreview
                        data={data}
                        template={template}
                        font={font}
                        color={color}
                        pagePadding={pagePadding}
                        sectionSpacing={sectionSpacing}
                        id="resume-pdf-target"
                        h2Size={h2Size}
                        h3Size={h3Size}
                        h2Padding={h2Padding}
                        h3Padding={h3Padding}
                        h2Color={h2Color}
                        h3Color={h3Color}
                        pSize={pSize}
                        pPadding={pPadding}
                        pColor={pColor}
                        nameSize={nameSize}
                        titleSize={titleSize}
                        headerSpacing={headerSpacing}
                        sectionOrder={sectionOrder.map(s => s.id)}
                    />
                </div>
            </div>
        </div>
    );
}
