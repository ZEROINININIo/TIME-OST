
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
      <nav className="fixed top-0 left-0 right-0 h-16 bg-ash-black border-b-2 border-ash-gray/20 z-50 flex items-center justify-between px-4 md:px-8 shadow-2xl">
          <div className="flex items-center gap-4">
               {/* Logo Image */}
               <div className="relative w-8 h-8 bg-ash-black border border-ash-gray/50 p-0.5 shadow-hard group">
                   <img 
                      src="https://free.picui.cn/free/2025/12/08/6936e856897d6.png" 
                      alt="Nova Labs"
                      className="w-full h-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                   />
              </div>
              <div className="leading-none">
                  <h1 className="text-2xl font-black text-ash-light tracking-tighter font-custom-02 glitch-text" data-text="VoidOS">
                    VoidOS
                  </h1>
                  <div className="text-[10px] text-ash-gray font-custom-02 tracking-widest flex items-center gap-2">
                    <span>NOVA_LABS // MUSIC_ROOM</span>
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  </div>
              </div>
          </div>

          <button
                onClick={() => setShowSettings(true)}
                className={`flex items-center gap-2 px-3 py-1.5 border-2 transition-all duration-300 group shadow-hard ${
                    showSettings
                    ? 'bg-ash-light text-ash-black border-ash-light'
                    : 'bg-ash-black text-ash-gray border-ash-gray/50 hover:border-ash-light hover:text-ash-light'
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
                className="w-[350px] bg-ash-black border-2 border-ash-light p-6 shadow-[0_0_50px_rgba(0,0,0,0.7)] relative animate-zoom-in-fast"
                onClick={e => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6 border-b-2 border-ash-gray/30 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-ash-light text-ash-black">
                            <Music size={16} />
                        </div>
                        <h2 className="text-sm font-black text-ash-light uppercase tracking-widest font-custom-02">{t.settingsTitle}</h2>
                    </div>
                    <button 
                        onClick={() => setShowSettings(false)} 
                        className="text-ash-gray hover:text-ash-light transition-colors hover:bg-ash-dark p-1"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Content Grid */}
                <div className="flex flex-col gap-4">
                    {/* Language Row */}
                    <button 
                      onClick={cycleLanguage}
                      className="flex items-center justify-between w-full px-4 py-3 border-2 transition-all duration-300 shadow-hard bg-ash-black text-ash-gray border-ash-gray/50 hover:border-ash-light hover:text-ash-light group"
                    >
                      <div className="flex items-center gap-3">
                        <Globe size={16} />
                        <span className="text-xs font-custom-02 font-bold uppercase">Language</span>
                      </div>
                      <span className="text-xs font-custom-02 font-bold bg-ash-dark px-2 py-1 border border-ash-gray/30 group-hover:border-ash-gray">{getLangLabel()}</span>
                    </button>

                    {/* Grid Controls */}
                    <div className="grid grid-cols-2 gap-4">
                        <CRTToggle value={crtEnabled} onChange={setCrtEnabled} language={language} />
                        <ThemeToggle value={isLightTheme} onChange={setIsLightTheme} />
                    </div>
                    
                    <FullscreenToggle language={language} />
                </div>

                {/* Modal Footer */}
                <div className="mt-6 pt-3 border-t border-dashed border-ash-gray/30 flex justify-between items-center text-[10px] text-ash-gray font-custom-02">
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
