
import React from 'react';
import { SideStoryVolume, Language } from '../../types';
import { ArrowLeft, Cpu, Lock, FileText, ChevronRight, AlertTriangle, Star, XCircle, Loader2 } from 'lucide-react';
import Reveal from '../Reveal';

interface SideStoryChapterListProps {
  volume: SideStoryVolume;
  onBack: () => void;
  onSelectChapter: (index: number) => void;
  language: Language;
  isLightTheme: boolean;
}

const SideStoryChapterList: React.FC<SideStoryChapterListProps> = ({ volume, onBack, onSelectChapter, language, isLightTheme }) => {
  return (
        <div className="h-full bg-halftone overflow-y-auto p-4 md:p-12 relative flex flex-col items-center">
             <div className="w-full max-w-3xl relative z-10 animate-fade-in mt-8 md:mt-0">
                {/* Header / Breadcrumb */}
                <div className="flex items-center gap-4 mb-8 border-b-2 border-ash-gray pb-4">
                     <button 
                        onClick={onBack}
                        className="p-2 border border-ash-gray text-ash-gray hover:text-ash-light hover:border-ash-light hover:bg-ash-dark transition-all"
                     >
                         <ArrowLeft size={20} />
                     </button>
                     <div>
                         <div className="text-[10px] font-mono text-ash-gray">ROOT / {volume.id}</div>
                         <h2 className="text-2xl font-black text-ash-light uppercase tracking-tight">{language === 'en' ? volume.titleEn : volume.title}</h2>
                     </div>
                     <div className="ml-auto hidden md:block">
                         <Cpu size={24} className="text-ash-dark animate-pulse" />
                     </div>
                </div>

                {/* File List */}
                <div className="space-y-3">
                    {volume.chapters.map((chapter, index) => {
                        const isLocked = chapter.status === 'locked';
                        const t = chapter.translations[language] || chapter.translations['zh-CN'];
                        const isLegacy = chapter.id === 'special-legacy-dusk'; // Check for special legacy chapter
                        const isGarbled = t.title.includes('▞'); // Check for collapse/corrupted placeholder
                        const isConstructing = chapter.id === 'F_ERR'; // Special handling for Byaki's constructing chapter
                        
                        // Dynamic Styles based on theme and state
                        let itemClass = "";
                        
                        if (isLegacy) {
                             // Special Style for Legacy Chapter (Blue + Broken/Violent Shake)
                             itemClass = isLightTheme
                                ? 'bg-blue-50/80 border-blue-500 text-blue-900 shadow-[0_0_15px_rgba(37,99,235,0.4)] border-dashed animate-shake-violent skew-x-2'
                                : 'bg-blue-950/30 border-blue-400 text-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.4)] border-dashed animate-shake-violent -skew-x-1';
                        } else if (isConstructing) {
                             // Constructing Style (Emerald/Green + Glitch)
                             itemClass = 'bg-emerald-950/20 border-emerald-900 text-emerald-600 animate-pulse border-dashed border-2 cursor-progress';
                        } else if (isGarbled) {
                             // Collapsing Corruption Style
                             itemClass = 'bg-red-950/20 border-red-900 text-red-700 opacity-80 cursor-not-allowed animate-pulse border-dotted border-4 scale-[0.98] origin-center rotate-[0.5deg]';
                        } else if (isLocked) {
                            itemClass = isLightTheme 
                                ? 'bg-zinc-100 border-zinc-300 text-zinc-400 opacity-60 cursor-not-allowed'
                                : 'bg-ash-dark/20 border-ash-dark/50 text-ash-gray opacity-60 cursor-not-allowed';
                        } else {
                            itemClass = isLightTheme
                                ? 'bg-white border-zinc-300 text-zinc-800 hover:bg-zinc-50 hover:border-zinc-500 shadow-sm'
                                : 'bg-ash-black/80 border-ash-dark/50 text-ash-light hover:border-ash-light hover:bg-ash-dark/40 shadow-hard-sm';
                        }

                        return (
                            <Reveal key={chapter.id} delay={index * 50}>
                                <button
                                    onClick={() => {
                                        // Allow entry if not locked OR if it is the special constructing chapter
                                        if (!isLocked || isConstructing) {
                                            onSelectChapter(index);
                                        }
                                    }}
                                    // Disable only if locked AND not the special constructing chapter
                                    disabled={isLocked && !isConstructing}
                                    className={`
                                        w-full flex items-center gap-4 p-4 border transition-all duration-200 group relative overflow-hidden
                                        ${itemClass}
                                        ${isLegacy ? 'hover:scale-[1.01] hover:bg-blue-900/10 cursor-not-allowed' : ''}
                                    `}
                                >
                                    {/* Number Index */}
                                    <div className={`shrink-0 w-8 text-center font-mono text-xs ${isLegacy ? 'text-blue-500 font-bold' : isConstructing ? 'text-emerald-500 font-bold animate-pulse' : isGarbled ? 'text-red-800 font-black animate-glitch' : 'opacity-50'}`}>
                                        {isLegacy ? '!!' : isConstructing ? '>>' : isGarbled ? 'ERR' : String(index + 1).padStart(2, '0')}
                                    </div>
                                    
                                    {/* Icon Box */}
                                    <div className={`
                                        shrink-0 p-2 border transition-colors
                                        ${isLegacy
                                            ? 'bg-blue-950 border-blue-500 text-blue-500 animate-pulse'
                                            : isConstructing
                                                ? 'bg-emerald-950/50 border-emerald-600 text-emerald-500 animate-[spin_3s_linear_infinite]'
                                            : isGarbled
                                                ? 'bg-red-950 border-red-800 text-red-600 animate-[spin_2s_linear_infinite]'
                                                : isLocked 
                                                    ? 'bg-transparent border-current opacity-50' 
                                                    : isLightTheme 
                                                        ? 'bg-zinc-100 border-zinc-200 group-hover:bg-zinc-800 group-hover:text-white group-hover:border-zinc-800'
                                                        : 'bg-ash-dark/50 border-ash-gray/30 group-hover:border-ash-light group-hover:bg-ash-light group-hover:text-ash-black'
                                        }
                                    `}>
                                        {isLegacy ? <Star size={16} fill="currentColor" /> : isConstructing ? <Loader2 size={16} /> : isGarbled ? <XCircle size={16} /> : isLocked ? <Lock size={16} /> : <FileText size={16} />}
                                    </div>
                                    
                                    {/* Text Content */}
                                    <div className="flex-1 text-left relative overflow-hidden">
                                        <div className={`font-bold font-mono text-sm md:text-base uppercase truncate ${isLegacy ? 'glitch-text-heavy tracking-widest opacity-80' : isConstructing ? 'text-emerald-500 glitch-text-heavy' : isGarbled ? 'glitch-text-heavy text-red-500' : ''}`} data-text={t.title}>
                                            {t.title}
                                        </div>
                                        {/* Ghost Text Overlay for Legacy/Garbled/Constructing */}
                                        {(isLegacy || isGarbled || isConstructing) && (
                                            <>
                                                <div className={`absolute top-0 left-0 w-full h-full opacity-50 animate-pulse translate-x-[2px] pointer-events-none mix-blend-overlay ${isGarbled ? 'text-red-500' : isConstructing ? 'text-emerald-400' : 'text-blue-300'}`}>
                                                    {t.title}
                                                </div>
                                                <div className={`absolute top-0 left-0 w-full h-full opacity-20 animate-glitch translate-x-[-2px] pointer-events-none mix-blend-color-dodge ${isGarbled ? 'text-red-200' : isConstructing ? 'text-emerald-100' : 'text-white'}`}>
                                                    {t.title}
                                                </div>
                                            </>
                                        )}

                                        <div className={`text-[10px] font-mono flex items-center gap-2 ${isLegacy ? 'text-blue-500/70' : isConstructing ? 'text-emerald-600 font-bold' : isGarbled ? 'text-red-700 font-bold' : 'opacity-50'}`}>
                                            <span>{chapter.date}</span>
                                            {isLegacy && <span className="font-bold border border-blue-500/50 px-1 bg-blue-950/30">LEGACY // CORRUPTED</span>}
                                            {isConstructing && <span className="font-bold border border-emerald-500/50 px-1 bg-emerald-950/30 animate-pulse">BUILDING...</span>}
                                            {isGarbled && !isConstructing && <span className="font-bold border border-red-500/50 px-1 bg-red-950/30 animate-pulse">CRITICAL_FAILURE</span>}
                                            {!isLocked && !isLegacy && !isGarbled && <span className="hidden md:inline">| {t.content.length * 2} BYTES</span>}
                                        </div>
                                    </div>

                                    {/* Hover Decor */}
                                    {!isLocked && (
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ChevronRight size={16} />
                                        </div>
                                    )}

                                    {isLegacy && (
                                         <div className="opacity-70 animate-pulse">
                                             <AlertTriangle size={16} className="text-blue-500" />
                                         </div>
                                    )}

                                    {/* Scanline on Hover (Only dark mode or subtle) */}
                                    {(!isLocked || isConstructing) && !isLightTheme && !isLegacy && !isGarbled && <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none skew-x-12"></div>}
                                    
                                    {/* Legacy/Garbled Special Effects */}
                                    {isLegacy && (
                                        <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(59,130,246,0.05)_10px,rgba(59,130,246,0.05)_20px)] animate-[pulse_0.1s_infinite]"></div>
                                    )}
                                    {isGarbled && (
                                        <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(220,38,38,0.1)_2px,rgba(220,38,38,0.1)_4px)] animate-[glitch_0.2s_infinite]"></div>
                                    )}
                                    {isConstructing && (
                                        <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(16,185,129,0.1)_1px,rgba(16,185,129,0.1)_2px)] animate-[scanline_1s_linear_infinite]"></div>
                                    )}
                                </button>
                            </Reveal>
                        );
                    })}
                </div>
             </div>
        </div>
    );
};

export default SideStoryChapterList;
