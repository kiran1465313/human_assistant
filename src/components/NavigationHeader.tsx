import React from 'react';
import { ArrowLeft, Home, Settings, Info } from 'lucide-react';
import { Screen } from '../types/navigation';

interface NavigationHeaderProps {
  currentScreen: Screen;
  canGoBack: boolean;
  onBack: () => void;
  onHome: () => void;
  onNavigate: (screen: Screen) => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentScreen,
  canGoBack,
  onBack,
  onHome,
  onNavigate
}) => {
  const getScreenTitle = (screen: Screen) => {
    switch (screen) {
      case 'welcome': return 'AI Assistant';
      case 'chat': return 'Chat';
      case 'settings': return 'Settings';
      case 'about': return 'About';
      default: return 'AI Assistant';
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Back Button */}
          {canGoBack && (
            <button
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          
          {/* Home Button */}
          {currentScreen !== 'welcome' && (
            <button
              onClick={onHome}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
            </button>
          )}
          
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <div>
              <h1 className="font-semibold text-gray-800">{getScreenTitle(currentScreen)}</h1>
              <p className="text-sm text-gray-600">Always here to help</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('settings')}
            className={`p-2 rounded-lg transition-colors ${
              currentScreen === 'settings' 
                ? 'text-purple-600 bg-purple-50' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <Settings className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => onNavigate('about')}
            className={`p-2 rounded-lg transition-colors ${
              currentScreen === 'about' 
                ? 'text-purple-600 bg-purple-50' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};