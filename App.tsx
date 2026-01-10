
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import MusicRoomPage from './pages/MusicRoomPage';
import CustomCursor from './components/CustomCursor';
import ParticleField from './components/VisualEffects/ParticleField';
import { Language } from './types';

const STORAGE_KEY = 'nova_music_room_v1';

interface AppConfig {
  language: Language;
  crtEnabled: boolean;
  isLightTheme: boolean;
}

const defaultConfig: AppConfig = {
  language: 'zh-CN',
  crtEnabled: true,
  isLightTheme: false,
};

const App: React.FC = () => {
  // 1. Load config from localStorage
  const loadConfig = (): AppConfig => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...defaultConfig, ...JSON.parse(saved) };
    } catch (e) {
      console.warn("Failed to load config", e);
    }
    return defaultConfig;
  };

  const initialConfig = loadConfig();

  // Global Preference State
  const [language, setLanguage] = useState<Language>(initialConfig.language);
  const [crtEnabled, setCrtEnabled] = useState(initialConfig.crtEnabled);
  const [isLightTheme, setIsLightTheme] = useState(initialConfig.isLightTheme);

  // Remove the static HTML loader
  useEffect(() => {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        setTimeout(() => loader.remove(), 500);
      }, 500);
    }
  }, []);

  // 2. Persist settings
  useEffect(() => {
    const config: AppConfig = {
      language,
      crtEnabled,
      isLightTheme,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [language, crtEnabled, isLightTheme]);

  return (
    <>
      <CustomCursor />
      
      {/* Dynamic Background Layer (Z-Index 0) */}
      <ParticleField isLightTheme={isLightTheme} />

      {/* Render Main App Layer (Z-Index 10, Transparent Background) */}
      <div className="flex flex-col h-screen supports-[height:100dvh]:h-[100dvh] bg-transparent text-ash-light overflow-hidden font-mono selection:bg-ash-light selection:text-ash-black cursor-none relative z-10">
          
          {/* Global Texture Overlays */}
          <div className="noise-overlay"></div>
          <div className="absolute inset-0 z-0 bg-grid-hard pointer-events-none opacity-30"></div>

          <Navigation 
            language={language}
            setLanguage={setLanguage}
            crtEnabled={crtEnabled}
            setCrtEnabled={setCrtEnabled}
            isLightTheme={isLightTheme}
            setIsLightTheme={setIsLightTheme}
          />
          
          <main className="flex-1 h-full overflow-hidden relative z-10 border-t-2 border-ash-dark/30">
             <MusicRoomPage language={language} isLightTheme={isLightTheme} />
          </main>
      </div>
    </>
  );
};

export default App;
