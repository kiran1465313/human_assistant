import React from 'react';
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
  const getScreenTitle = (screen: Screen) => {
    switch (screen) {
      case 'welcome': return 'Hello Guys';
      case 'chat': return 'Chat';
      case 'settings': return 'Settings';
      case 'about': return 'About';
      default: return 'Hello Guys';
    }
  };

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Back Button */}
          {canGoBack && (
            <button
              onClick={onBack}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          
          {/* Home Button */}
          {currentScreen !== 'welcome' && (
            <button
              onClick={onHome}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
            </button>
          )}
          
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">HG</span>
            </div>
            <div>
              <h1 className="font-semibold text-gray-800 dark:text-gray-100">{getScreenTitle(currentScreen)}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Created by Kiran</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex items-center gap-2">
          {/* Voice Controls */}
          <VoiceControls
            isListening={voiceChat.isListening}
            isSpeaking={voiceChat.isSpeaking}
            isSupported={voiceChat.isSupported}
            onStartListening={() => {}}
            onStopListening={voiceChat.stopListening}
            onStopSpeaking={voiceChat.stopSpeaking}
            disabled={true}
          />
          
          <button
            onClick={() => onNavigate('settings')}
            className={`p-2 rounded-lg transition-colors ${
              currentScreen === 'settings' 
                ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Settings className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => onNavigate('about')}
            className={`p-2 rounded-lg transition-colors ${
              currentScreen === 'about' 
                ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};