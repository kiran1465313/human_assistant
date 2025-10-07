import React, { useState, useEffect } from 'react';
import { ArrowLeft, Home, Settings, Info } from 'lucide-react';
import { Screen } from '../types/navigation';
import { VoiceControls } from './VoiceControls';
import { useTheme } from '../hooks/useTheme';

interface NavigationHeaderProps {
  currentScreen: Screen;
  canGoBack: boolean;
  onBack: () => void;
  onHome: () => void;
  onNavigate: (screen: Screen) => void;
  voiceChat: any;
  theme: ReturnType<typeof useTheme>;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentScreen,
  canGoBack,
  onBack,
  onHome,
  onNavigate,
  voiceChat,
  theme
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold
        setScrollDirection('down');
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setScrollDirection('up');
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const getScreenTitle = (screen: Screen) => {
    switch (screen) {
      case 'welcome': return 'Hello Guys';
      case 'chat': return 'Chat';
      case 'settings': return 'Settings';
      case 'about': return 'About';
      default: return 'Hello Guys';
    }
  };

  const getMirrorBackground = () => {
    switch (theme.theme) {
      case 'dark':
        return 'bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95';
      case 'pastel-cute':
        return 'bg-gradient-to-r from-pink-50/95 via-white/95 to-purple-50/95';
      case 'sci-fi-pet':
        return 'bg-gradient-to-r from-gray-900/95 via-blue-950/95 to-purple-950/95';
      case 'nature-spirit':
        return 'bg-gradient-to-r from-green-50/95 via-white/95 to-blue-50/95';
      case 'electronics':
        return 'bg-gradient-to-r from-gray-900/95 via-orange-950/95 to-gray-900/95';
      default: // light theme
        return 'bg-gradient-to-r from-white/95 via-gray-50/95 to-white/95';
    }
  };

  const getBacklitTextColor = () => {
    switch (theme.theme) {
      case 'dark':
        return 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]';
      case 'pastel-cute':
        return 'text-pink-800 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]';
      case 'sci-fi-pet':
        return 'text-blue-100 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]';
      case 'nature-spirit':
        return 'text-green-800 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]';
      case 'electronics':
        return 'text-orange-100 drop-shadow-[0_0_10px_rgba(249,115,22,0.9)]';
      default: // light theme
        return 'text-gray-800 drop-shadow-[0_0_8px_rgba(0,0,0,0.3)]';
    }
  };

  const getSubtitleColor = () => {
    switch (theme.theme) {
      case 'dark':
        return 'text-gray-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]';
      case 'pastel-cute':
        return 'text-pink-600 drop-shadow-[0_0_6px_rgba(236,72,153,0.4)]';
      case 'sci-fi-pet':
        return 'text-blue-300 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]';
      case 'nature-spirit':
        return 'text-green-600 drop-shadow-[0_0_6px_rgba(34,197,94,0.4)]';
      default: // light theme
        return 'text-gray-600 drop-shadow-[0_0_6px_rgba(0,0,0,0.2)]';
    }
  };

  const getBorderGlow = () => {
    switch (theme.theme) {
      case 'dark':
        return 'border-b border-white/20 shadow-[0_1px_20px_rgba(255,255,255,0.1)]';
      case 'pastel-cute':
        return 'border-b border-pink-200/50 shadow-[0_1px_20px_rgba(236,72,153,0.15)]';
      case 'sci-fi-pet':
        return 'border-b border-blue-400/30 shadow-[0_1px_20px_rgba(59,130,246,0.2)]';
      case 'nature-spirit':
        return 'border-b border-green-200/50 shadow-[0_1px_20px_rgba(34,197,94,0.15)]';
      case 'electronics':
        return 'border-b border-orange-500/40 shadow-[0_1px_20px_rgba(249,115,22,0.25)]';
      default: // light theme
        return 'border-b border-gray-200/50 shadow-[0_1px_20px_rgba(0,0,0,0.1)]';
    }
  };

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-500 ease-in-out
        ${getMirrorBackground()}
        ${getBorderGlow()}
        backdrop-blur-xl backdrop-saturate-150
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
      style={{
        background: theme.theme === 'light' 
          ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 50%, rgba(255,255,255,0.95) 100%)'
          : undefined
      }}
    >
      {/* Mirror reflection effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/5 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          {/* Back Button */}
          {canGoBack && (
            <button
              onClick={onBack}
              className={`
                p-2 rounded-lg transition-all duration-300 hover:scale-110
                ${theme.theme === 'light' 
                  ? 'text-gray-700 hover:text-gray-900 hover:bg-white/50 hover:shadow-lg' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-lg'
                }
                backdrop-blur-sm
              `}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          
          {/* Home Button */}
          {currentScreen !== 'welcome' && (
            <button
              onClick={onHome}
              className={`
                p-2 rounded-lg transition-all duration-300 hover:scale-110
                ${theme.theme === 'light' 
                  ? 'text-gray-700 hover:text-gray-900 hover:bg-white/50 hover:shadow-lg' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-lg'
                }
                backdrop-blur-sm
              `}
            >
              <Home className="w-5 h-5" />
            </button>
          )}
          
          {/* Logo and Title with Backlit Effect */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
                <span className="text-white font-bold text-sm drop-shadow-lg">HG</span>
              </div>
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-md opacity-50 -z-10" />
            </div>
            <div>
              <h1 className={`font-bold text-lg ${getBacklitTextColor()} transition-all duration-300`}>
                {getScreenTitle(currentScreen)}
              </h1>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex items-center gap-2">
          {/* Voice Controls */}
          <div className="mr-2">
            <VoiceControls
              isListening={voiceChat.isListening}
              isSpeaking={voiceChat.isSpeaking}
              isSupported={voiceChat.isSupported}
              onStartListening={() => {}}
              onStopListening={voiceChat.stopListening}
              onStopSpeaking={voiceChat.stopSpeaking}
              disabled={true}
            />
          </div>
          
          <button
            onClick={() => onNavigate('settings')}
            className={`
              p-2 rounded-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm
              ${currentScreen === 'settings' 
                ? `${theme.theme === 'light' 
                    ? 'text-purple-600 bg-purple-50/80 shadow-lg shadow-purple-500/20' 
                    : 'text-purple-400 bg-purple-900/50 shadow-lg shadow-purple-500/30'
                  } drop-shadow-[0_0_8px_rgba(147,51,234,0.6)]`
                : `${theme.theme === 'light' 
                    ? 'text-gray-700 hover:text-gray-900 hover:bg-white/50 hover:shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-lg'
                  }`
              }
            `}
          >
            <Settings className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => onNavigate('about')}
            className={`
              p-2 rounded-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm
              ${currentScreen === 'about' 
                ? `${theme.theme === 'light' 
                    ? 'text-purple-600 bg-purple-50/80 shadow-lg shadow-purple-500/20' 
                    : 'text-purple-400 bg-purple-900/50 shadow-lg shadow-purple-500/30'
                  } drop-shadow-[0_0_8px_rgba(147,51,234,0.6)]`
                : `${theme.theme === 'light' 
                    ? 'text-gray-700 hover:text-gray-900 hover:bg-white/50 hover:shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-lg'
                  }`
              }
            `}
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};