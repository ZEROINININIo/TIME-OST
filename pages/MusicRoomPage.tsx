
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, List, Activity, Mic2, Heart, Clock, Repeat, Repeat1, ChevronUp, ChevronDown } from 'lucide-react';
import { musicTracks } from '../data/musicData';
import { Language } from '../types';
import Reveal from '../components/Reveal';

interface MusicRoomPageProps {
  language: Language;
  isLightTheme: boolean;
}

// --- Glitch Art Component ---
const GlitchArt = ({ src, isPlaying, isLightTheme }: { src: string; isPlaying: boolean; isLightTheme: boolean }) => {
    return (
      <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 group select-none transition-all duration-500">
         {/* Decorative Frame Elements - Broken Corners */}
         <div className={`absolute -top-4 -left-4 w-6 h-6 md:w-8 md:h-8 border-t-4 border-l-4 transition-all duration-300 ${isPlaying ? 'translate-x-2 translate-y-2' : ''} ${isLightTheme ? 'border-zinc-900' : 'border-ash-light'}`}></div>
         <div className={`absolute -bottom-4 -right-4 w-6 h-6 md:w-8 md:h-8 border-b-4 border-r-4 transition-all duration-300 ${isPlaying ? '-translate-x-2 -translate-y-2' : ''} ${isLightTheme ? 'border-zinc-900' : 'border-ash-light'}`}></div>
         
         {/* Base Image Container - ALLOW OVERFLOW */}
         <div className={`relative w-full h-full overflow-visible ${isPlaying ? 'scale-[0.98]' : 'scale-100'} transition-transform duration-500`}>
             
             {/* Layer 0: Base Image (Black BG for contrast) */}
             <div className="absolute inset-0 bg-black z-0"></div>
             <img src={src} alt="Cover" className="w-full h-full object-cover relative z-10 opacity-90 shadow-2xl" />
  
             {/* Glitch Layers - MULTI-BLOCK FRAGMENTATION */}
             <div className={`absolute -inset-4 z-20 pointer-events-none mix-blend-hard-light opacity-100`}>
                 
                 {/* Fragment 1: Cyan - Top Left Block */}
                 <div className="absolute inset-0 animate-[shakeGentle_4s_ease-in-out_infinite] opacity-60 mix-blend-screen" 
                      style={{ clipPath: 'inset(0 65% 65% 0)', transform: 'scale(1.05)' }}>
                     <img src={src} className="w-full h-full object-cover filter hue-rotate-90 contrast-150 scale-110" />
                 </div>
  
                 {/* Fragment 2: Magenta - Bottom Right Block */}
                 <div className="absolute inset-0 animate-[shakeGentle_3.5s_ease-in-out_infinite] opacity-60 mix-blend-screen" 
                      style={{ clipPath: 'inset(65% 0 0 65%)', animationDirection: 'reverse' }}>
                     <img src={src} className="w-full h-full object-cover filter hue-rotate-[270deg] contrast-150 scale-110" />
                 </div>

                 {/* Fragment 3: Green - Top Right Block */}
                 <div className="absolute inset-0 animate-[shakeGentle_5s_ease-in-out_infinite] opacity-50 mix-blend-screen" 
                      style={{ clipPath: 'inset(10% 0 55% 70%)', transform: 'translate(5px, -5px) scale(1.02)' }}>
                     <img src={src} className="w-full h-full object-cover filter hue-rotate-180 contrast-150 scale-110" />
                 </div>

                 {/* Fragment 4: Yellow - Bottom Left Block */}
                 <div className="absolute inset-0 animate-[shakeGentle_4.5s_ease-in-out_infinite] opacity-50 mix-blend-screen" 
                      style={{ clipPath: 'inset(55% 70% 10% 0)', animationDirection: 'reverse', transform: 'translate(-5px, 5px)' }}>
                     <img src={src} className="w-full h-full object-cover filter hue-rotate-60 contrast-125 scale-110" />
                 </div>

                 {/* Fragment 5: Center Slice - Blue/Invert */}
                 <div className="absolute inset-0 animate-[shakeGentle_2.5s_ease-in-out_infinite] opacity-40 mix-blend-exclusion" 
                      style={{ clipPath: 'inset(45% 10% 45% 10%)', transform: 'scale(1.1)' }}>
                     <img src={src} className="w-full h-full object-cover filter invert scale-110" />
                 </div>
  
                 {/* Layer: Global Noise Slice - Subtle & Occasional */}
                 <div className="absolute inset-0 animate-[glitch_3s_infinite] opacity-20 mix-blend-overlay" 
                      style={{ clipPath: 'inset(20% 0 20% 0)', transform: 'scale(1.05)' }}>
                     <img src={src} className="w-full h-full object-cover filter grayscale contrast-200" />
                 </div>
                 
                 {/* Layer: Vertical Scanline Distortion */}
                 <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:4px_100%] opacity-20 mix-blend-multiply scale-110"></div>
             </div>
  
             {/* Static Noise Overlay */}
             <div className="absolute inset-0 z-30 bg-halftone opacity-30 pointer-events-none mix-blend-overlay"></div>
             
             {/* CRT Scanline */}
             <div className="absolute inset-0 z-40 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-40"></div>
         </div>
         
         {/* Floating "Broken" Text Elements - Always Visible */}
         <div className={`absolute top-1/4 -right-8 font-mono text-xs font-black tracking-widest rotate-90 origin-bottom animate-pulse ${isLightTheme ? 'text-zinc-900' : 'text-ash-light'}`}>
            ERR_VISUAL
         </div>
         <div className={`absolute bottom-0 -left-6 font-mono text-[10px] font-bold writing-vertical-rl animate-glitch ${isLightTheme ? 'text-red-600' : 'text-red-500'}`}>
            UNSTABLE
         </div>

         {/* Conspicuous VoidOS Branding */}
         <div className={`absolute -top-10 -right-4 font-black font-custom-02 text-3xl md:text-5xl tracking-tighter opacity-10 select-none pointer-events-none z-0 ${isLightTheme ? 'text-zinc-900' : 'text-ash-white'}`}>
            VoidOS
         </div>
      </div>
    );
  };

const MusicRoomPage: React.FC<MusicRoomPageProps> = ({ language, isLightTheme }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.13); // Default volume set to 13%
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sourceIndex, setSourceIndex] = useState(0); // For fallback URLs
  const [visualizerData, setVisualizerData] = useState<number[]>(new Array(20).fill(10));
  const [loopMode, setLoopMode] = useState<'list' | 'single'>('list'); // 'list' or 'single'
  
  // Mobile Playlist Collapse State
  const [isMobilePlaylistOpen, setIsMobilePlaylistOpen] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const currentTrack = musicTracks[currentTrackIndex];

  // Initialize Audio
  useEffect(() => {
    if (!audioRef.current) {
        audioRef.current = new Audio();
        // audioRef.current.loop is handled in a separate effect
        audioRef.current.volume = volume;
    }

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
        setProgress(audio.currentTime);
        setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
        if (!audio.loop) {
            handleNext();
        }
    };

    const handleError = () => {
        console.warn("Audio source failed, trying fallback...");
        if (sourceIndex < currentTrack.sources.length - 1) {
            setSourceIndex(prev => prev + 1);
        } else {
            console.error("All sources failed for this track.");
        }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
    };
  }, [sourceIndex, currentTrackIndex]); // Re-bind if track changes

  // Handle Loop Mode
  useEffect(() => {
      if (audioRef.current) {
          // If single loop, let the audio element handle it natively
          audioRef.current.loop = (loopMode === 'single');
      }
  }, [loopMode]);

  // Handle Track Change
  useEffect(() => {
      if (audioRef.current) {
          const src = currentTrack.sources[sourceIndex] || "";
          // Only change if different to prevent reload loops
          if (audioRef.current.src !== src && src) {
              audioRef.current.src = src;
              if (isPlaying) {
                  audioRef.current.play().catch(e => console.error("Play failed", e));
              }
          }
      }
  }, [currentTrackIndex, sourceIndex, currentTrack]);

  // Handle Play/Pause
  useEffect(() => {
      if (audioRef.current) {
          if (isPlaying) {
              audioRef.current.play().catch(e => {
                  console.warn("Autoplay blocked", e);
                  setIsPlaying(false);
              });
          } else {
              audioRef.current.pause();
          }
      }
  }, [isPlaying]);

  // Handle Volume
  useEffect(() => {
      if (audioRef.current) {
          audioRef.current.volume = volume;
      }
  }, [volume]);

  // Fake Visualizer Animation
  useEffect(() => {
      if (isPlaying) {
          const updateVisualizer = () => {
              setVisualizerData(prev => prev.map(() => Math.random() * 100));
              animationRef.current = requestAnimationFrame(updateVisualizer);
          };
          updateVisualizer();
      } else {
          if (animationRef.current) cancelAnimationFrame(animationRef.current);
          setVisualizerData(new Array(20).fill(5)); // Flatline
      }
      return () => {
          if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
  }, [isPlaying]);

  const handleNext = () => {
      setSourceIndex(0);
      setCurrentTrackIndex((prev) => (prev + 1) % musicTracks.length);
      setIsPlaying(true); // Next button -> Auto Play
  };

  const handlePrev = () => {
      setSourceIndex(0);
      setCurrentTrackIndex((prev) => (prev - 1 + musicTracks.length) % musicTracks.length);
      setIsPlaying(true); // Prev button -> Auto Play
  };

  const toggleLoopMode = () => {
      setLoopMode(prev => prev === 'list' ? 'single' : 'list');
  };

  const formatTime = (time: number) => {
      if (isNaN(time)) return "00:00";
      const min = Math.floor(time / 60);
      const sec = Math.floor(time % 60);
      return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseFloat(e.target.value);
      if (audioRef.current) {
          audioRef.current.currentTime = val;
          setProgress(val);
      }
  };

  const getLoopModeLabel = () => {
      if (loopMode === 'single') {
          return language === 'zh-CN' ? '单曲循环' : language === 'zh-TW' ? '單曲循環' : 'LOOP: 1';
      } else {
          return language === 'zh-CN' ? '列表循环' : language === 'zh-TW' ? '列表循環' : 'LOOP: ALL';
      }
  };

  return (
    // Mobile: flex-col-reverse (Playlist at bottom), Desktop: flex-row (Playlist at left)
    <div className={`h-full flex flex-col-reverse md:flex-row pt-16 ${isLightTheme ? 'bg-zinc-100 text-zinc-900' : 'bg-ash-black text-ash-light'}`}>
        
        {/* Playlist Container */}
        {/* Mobile: Top border, Height dynamic. Desktop: Right border, Full Height */}
        <div 
            className={`
                w-full md:w-1/3 lg:w-1/4 flex flex-col shrink-0 
                transition-all duration-300 ease-in-out
                ${isMobilePlaylistOpen ? 'h-[35vh]' : 'h-14'} 
                md:h-auto border-t-2 md:border-t-0 md:border-r-2 
                ${isLightTheme ? 'border-zinc-300 bg-white' : 'border-ash-dark bg-ash-black/50'}
            `}
        >
            <div 
                className={`p-2 md:p-4 border-b-2 flex items-center justify-between cursor-pointer md:cursor-default h-14 md:h-auto ${isLightTheme ? 'border-zinc-300' : 'border-ash-dark'}`}
                onClick={() => setIsMobilePlaylistOpen(!isMobilePlaylistOpen)}
            >
                <h2 className="font-black font-custom-02 tracking-widest flex items-center gap-2 text-sm md:text-base">
                    <List size={16} /> 
                    {language === 'en' ? 'PLAYLIST' : language === 'zh-TW' ? '播放清單' : '播放列表'}
                    {/* Mobile Toggle Icon */}
                    <span className="md:hidden opacity-50 ml-2">
                        {isMobilePlaylistOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                    </span>
                </h2>
                <div className="text-[10px] font-mono opacity-50">{musicTracks.length} TRACKS</div>
            </div>
            
            <div className={`flex-1 overflow-y-auto p-2 space-y-1 ${!isMobilePlaylistOpen ? 'hidden md:block' : 'block'}`}>
                {musicTracks.map((track, idx) => (
                    <button
                        key={track.id}
                        onClick={() => {
                            setSourceIndex(0);
                            setCurrentTrackIndex(idx);
                            setIsPlaying(false); // Manual Click -> Default Paused
                        }}
                        className={`w-full text-left p-2 md:p-3 border text-xs transition-all flex items-center gap-3 group relative overflow-hidden ${
                            currentTrackIndex === idx 
                            ? (isLightTheme ? 'bg-zinc-200 border-zinc-400 text-black' : 'bg-ash-light text-ash-black border-ash-light')
                            : (isLightTheme ? 'bg-white border-transparent hover:border-zinc-300 hover:bg-zinc-50' : 'bg-transparent border-transparent hover:border-ash-gray/50 hover:bg-ash-dark/30')
                        }`}
                    >
                        <div className={`w-6 text-center font-bold ${currentTrackIndex === idx ? 'animate-pulse' : 'opacity-30'}`}>
                            {currentTrackIndex === idx ? <Activity size={14} /> : (idx + 1).toString().padStart(2, '0')}
                        </div>
                        <div className="flex-1 truncate">
                            <div className="font-bold truncate">{track.title}</div>
                            <div className="opacity-60 text-[10px]">{track.artist}</div>
                        </div>
                        {currentTrackIndex === idx && (
                            <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none"></div>
                        )}
                    </button>
                ))}
            </div>
        </div>

        {/* Player Area */}
        {/* Mobile: Takes remaining height (top part), Desktop: Takes remaining width (right part) */}
        <div className="flex-1 flex flex-col relative overflow-hidden min-h-0">
            {/* Background Visualization */}
            <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
                 <div className={`w-[80vw] h-[80vw] border-[1px] rounded-full flex items-center justify-center animate-spin-slow ${isLightTheme ? 'border-zinc-400' : 'border-ash-gray'}`}>
                    <div className={`w-[60%] h-[60%] border-[1px] border-dashed rounded-full ${isLightTheme ? 'border-zinc-400' : 'border-ash-gray'}`}></div>
                 </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-12 z-10 space-y-4 md:space-y-12">
                
                {/* Glitched Album Art */}
                <Reveal>
                    <GlitchArt 
                        src={currentTrack.cover || "https://free.picui.cn/free/2025/12/15/694012a94d57f.png"} 
                        isPlaying={isPlaying} 
                        isLightTheme={isLightTheme} 
                    />
                </Reveal>

                {/* Metadata */}
                <div className="text-center w-full max-w-xl space-y-1 md:space-y-2">
                    <h1 className="text-xl md:text-4xl font-black font-custom-02 uppercase tracking-tight glitch-text-heavy truncate px-4" data-text={currentTrack.title}>
                        {currentTrack.title}
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-mono opacity-70">
                        <Mic2 size={12} /> {currentTrack.artist}
                    </div>
                    {/* Description: Hidden on small screens if too long, or limited height */}
                    <div className={`text-[10px] md:text-sm font-custom-02 mt-2 md:mt-4 leading-relaxed border-t border-dashed pt-2 md:pt-4 px-4 max-h-16 md:max-h-none overflow-y-auto no-scrollbar ${isLightTheme ? 'border-zinc-300 text-zinc-500' : 'border-ash-gray/30 text-ash-gray'}`}>
                        {currentTrack.description[language] || currentTrack.description['en']}
                    </div>
                </div>

                {/* Visualizer Bars (Optional on mobile to save space, but keeping small) */}
                <div className="flex items-end justify-center gap-1 h-8 md:h-12 w-full max-w-md opacity-50">
                    {visualizerData.map((h, i) => (
                        <div 
                            key={i}
                            className={`w-1.5 md:w-2 transition-all duration-75 ${isLightTheme ? 'bg-zinc-800' : 'bg-ash-light'}`}
                            style={{ height: `${Math.max(5, h)}%`, opacity: isPlaying ? 0.8 : 0.2 }}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Controls Bar */}
            <div className={`p-4 md:p-6 border-t-2 shrink-0 ${isLightTheme ? 'bg-white border-zinc-300' : 'bg-ash-black border-ash-dark'}`}>
                <div className="max-w-4xl mx-auto flex flex-col gap-3 md:gap-4">
                    {/* Progress */}
                    <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs font-mono">
                        <span className="opacity-70 w-8 md:w-10 text-right">{formatTime(progress)}</span>
                        <input 
                            type="range" 
                            min="0" 
                            max={duration || 100} 
                            value={progress} 
                            onChange={handleSeek}
                            className="flex-1 h-1 bg-ash-gray/30 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-current [&::-webkit-slider-thumb]:border-0 rounded-none"
                        />
                        <span className="opacity-70 w-8 md:w-10">{formatTime(duration)}</span>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 w-1/4 md:w-1/3">
                            <button onClick={() => setVolume(v => Math.max(0, v - 0.1))} className="hidden md:block"><Volume1 size={16} /></button>
                            {/* Mobile Volume Slider: Restored and Visible */}
                            <input 
                                type="range" 
                                min="0" max="1" step="0.05" 
                                value={volume} 
                                onChange={e => setVolume(parseFloat(e.target.value))}
                                className="w-16 md:w-20 h-1 bg-ash-gray/30 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-current rounded-none"
                            />
                        </div>

                        <div className="flex items-center gap-4 md:gap-6 justify-center flex-1">
                            <button onClick={handlePrev} className="p-2 hover:opacity-70 transition-opacity"><SkipBack size={20} className="md:w-6 md:h-6" /></button>
                            <button 
                                onClick={() => setIsPlaying(!isPlaying)}
                                className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border-2 rounded-full transition-all hover:scale-105 ${isLightTheme ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-ash-light text-ash-black border-ash-light'}`}
                            >
                                {isPlaying ? <Pause size={18} className="md:w-5 md:h-5" fill="currentColor" /> : <Play size={18} className="md:w-5 md:h-5 ml-0.5" fill="currentColor" />}
                            </button>
                            <button onClick={handleNext} className="p-2 hover:opacity-70 transition-opacity"><SkipForward size={20} className="md:w-6 md:h-6" /></button>
                            
                            {/* Loop Mode Toggle */}
                            <button 
                                onClick={toggleLoopMode} 
                                className="p-2 hover:opacity-70 transition-opacity relative group"
                                title={loopMode === 'single' ? "Single Loop" : "List Loop"}
                            >
                                {loopMode === 'single' ? <Repeat1 size={18} className="md:w-5 md:h-5 text-ash-light" /> : <Repeat size={18} className="md:w-5 md:h-5 opacity-50" />}
                                <span className={`absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border hidden md:block ${isLightTheme ? 'bg-zinc-200 text-zinc-900 border-zinc-300' : 'bg-ash-dark text-ash-light border-ash-gray'}`}>
                                    {getLoopModeLabel()}
                                </span>
                            </button>
                        </div>

                        <div className="flex items-center justify-end gap-2 md:gap-4 w-1/4 md:w-1/3 text-[10px] font-mono opacity-50">
                            <div className="hidden sm:flex items-center gap-1"><Clock size={12} /> {isPlaying ? 'PLAYING' : 'PAUSED'}</div>
                            <div className="flex items-center gap-1"><Heart size={12} /> FAV</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default MusicRoomPage;
