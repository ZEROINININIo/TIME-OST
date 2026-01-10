
import React, { useState } from 'react';
import { Settings, Globe, X, Disc, Music } from 'lucide-react';
import CRTToggle from './CRTToggle';
import ThemeToggle from './ThemeToggle';
import FullscreenToggle from './FullscreenToggle';
import { Language } from '../types';

interface NavigationProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  crtEnabled: boolean;
  setCrtEnabled: (val: boolean) => void;
  isLightTheme: boolean;
  setIsLightTheme: (val: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
    language, setLanguage,
    crtEnabled, setCrtEnabled, isLightTheme, setIsLightTheme,
}) => {
  const [showSettings, setShowSettings] = useState(false);

  const t = {
    'zh-CN': {
      config: '系统配置',
      settingsTitle: '音频环境配置'
    },
    'zh-TW': {
      config: '系統配置',
      settingsTitle: '音頻環境配置'
    },
    'en': {
      config: 'SYS_CONFIG',
      settingsTitle: 'AUDIO_ENV_CONFIG'
    }
  }[language];

  const cycleLanguage = () => {
    if (language === 'zh-CN') setLanguage('zh-TW');
    else if (language === 'zh-TW') setLanguage('en');
    else setLanguage('zh-CN');
  };

  const getLangLabel = () => {
    if (language === 'zh-CN') return '简';
    if (language === 'zh-TW') return '繁';
    return 'EN';
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 h-16 border-b-2 border-ash-gray/20 z-50 flex items-center justify-between px-4 md:px-8 shadow-2xl backdrop-blur-md transition-colors duration-500 ${isLightTheme ? 'bg-white/80' : 'bg-ash-black/70'}`}>
          <div className="flex items-center gap-4">
               {/* Logo Image */}
               <div className={`relative w-8 h-8 border p-0.5 shadow-hard group transition-colors ${isLightTheme ? 'bg-white border-zinc-300' : 'bg-ash-black border-ash-gray/50'}`}>
                   <img 
                      src="https://free.picui.cn/free/2025/12/08/6936e856897d6.png" 
                      alt="Nova Labs"
                      className="w-full h-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                   />
              </div>
              <div className="leading-none">
                  <h1 className={`text-2xl font-black tracking-tighter font-custom-02 glitch-text ${isLightTheme ? 'text-zinc-900' : 'text-ash-light'}`} data-text="VoidOS">
                    VoidOS
                  </h1>
                  <div className={`text-[10px] font-custom-02 tracking-widest flex items-center gap-2 ${isLightTheme ? 'text-zinc-500' : 'text-ash-gray'}`}>
                    <span>NOVA_LABS // MUSIC_ROOM</span>
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  </div>
              </div>
          </div>

          <button
                onClick={() => setShowSettings(true)}
                className={`flex items-center gap-2 px-3 py-1.5 border-2 transition-all duration-300 group shadow-hard ${
                    showSettings
                    ? (isLightTheme ? 'bg-zinc-800 text-white border-zinc-800' : 'bg-ash-light text-ash-black border-ash-light')
                    : (isLightTheme ? 'bg-white/50 text-zinc-600 border-zinc-300 hover:border-zinc-800 hover:text-zinc-900' : 'bg-black/20 text-ash-gray border-ash-gray/50 hover:border-ash-light hover:text-ash-light')
                }`}
            >
                <Settings size={14} className={`transition-transform duration-700 ${showSettings ? 'rotate-180' : ''}`} />
                <span className="text-xs font-bold font-custom-02 tracking-widest uppercase hidden md:inline">{t.config}</span>
            </button>
      </nav>

      {/* Settings Modal (Floating Window) */}
      {showSettings && (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowSettings(false)}
        >
            <div 
                className={`w-[350px] border-2 p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative animate-zoom-in-fast ${isLightTheme ? 'bg-white border-zinc-900' : 'bg-ash-black border-ash-light'}`}
                onClick={e => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className={`flex items-center justify-between mb-6 border-b-2 pb-4 ${isLightTheme ? 'border-zinc-200' : 'border-ash-gray/30'}`}>
                    <div className="flex items-center gap-3">
                        <div className={`p-1.5 ${isLightTheme ? 'bg-zinc-900 text-white' : 'bg-ash-light text-ash-black'}`}>
                            <Music size={16} />
                        </div>
                        <h2 className={`text-sm font-black uppercase tracking-widest font-custom-02 ${isLightTheme ? 'text-zinc-900' : 'text-ash-light'}`}>{t.settingsTitle}</h2>
                    </div>
                    <button 
                        onClick={() => setShowSettings(false)} 
                        className={`transition-colors p-1 ${isLightTheme ? 'text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100' : 'text-ash-gray hover:text-ash-light hover:bg-ash-dark'}`}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Content Grid */}
                <div className="flex flex-col gap-4">
                    {/* Language Row */}
                    <button 
                      onClick={cycleLanguage}
                      className={`flex items-center justify-between w-full px-4 py-3 border-2 transition-all duration-300 shadow-hard group ${isLightTheme ? 'bg-zinc-50 border-zinc-200 hover:border-zinc-900 hover:text-zinc-900 text-zinc-600' : 'bg-ash-black text-ash-gray border-ash-gray/50 hover:border-ash-light hover:text-ash-light'}`}
                    >
                      <div className="flex items-center gap-3">
                        <Globe size={16} />
                        <span className="text-xs font-custom-02 font-bold uppercase">Language</span>
                      </div>
                      <span className={`text-xs font-custom-02 font-bold px-2 py-1 border ${isLightTheme ? 'bg-white border-zinc-200' : 'bg-ash-dark border-ash-gray/30 group-hover:border-ash-gray'}`}>{getLangLabel()}</span>
                    </button>

                    {/* Grid Controls */}
                    <div className="grid grid-cols-2 gap-4">
                        <CRTToggle value={crtEnabled} onChange={setCrtEnabled} language={language} />
                        <ThemeToggle value={isLightTheme} onChange={setIsLightTheme} />
                    </div>
                    
                    <FullscreenToggle language={language} />
                </div>

                {/* Modal Footer */}
                <div className={`mt-6 pt-3 border-t border-dashed flex justify-between items-center text-[10px] font-custom-02 ${isLightTheme ? 'border-zinc-300 text-zinc-400' : 'border-ash-gray/30 text-ash-gray'}`}>
                    <span>SYS_CFG // AUDIO_ONLY</span>
                    <span className="opacity-50">VoidOS</span>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
