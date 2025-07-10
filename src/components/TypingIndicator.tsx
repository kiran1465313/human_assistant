import React from 'react';
import { Bot } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const TypingIndicator: React.FC = () => {
  const theme = useTheme();

  const getIndicatorBg = () => {
    switch (theme.theme) {
      case 'pastel-cute': 
        return 'bg-white/70 backdrop-blur-md border border-pink-200/50 shadow-lg';
      case 'sci-fi-pet': 
        return 'bg-gray-900/70 backdrop-blur-md border border-blue-400/30 shadow-lg shadow-blue-500/20';
      case 'nature-spirit': 
        return 'bg-white/70 backdrop-blur-md border border-green-200/50 shadow-lg';
      default: 
        return 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border border-gray-200/50 dark:border-gray-700/50';
    }
  };

  const getDotColor = () => {
    switch (theme.theme) {
      case 'pastel-cute': return 'bg-pink-400';
      case 'sci-fi-pet': return 'bg-blue-400';
      case 'nature-spirit': return 'bg-green-500';
      default: return 'bg-gray-400 dark:bg-gray-500';
    }
  };

  return (
    <div className="flex gap-3 mb-6">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
        <Bot className="w-4 h-4 text-white" />
      </div>
      
      <div className={`rounded-2xl rounded-bl-md px-4 py-3 transition-all duration-300 ${getIndicatorBg()}`}>
        {/* Gradient overlay for better visual effect */}
        <div className="absolute inset-0 rounded-2xl rounded-bl-md bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex gap-1">
          <div className={`w-2 h-2 rounded-full animate-bounce ${getDotColor()}`} style={{ animationDelay: '0ms' }}></div>
          <div className={`w-2 h-2 rounded-full animate-bounce ${getDotColor()}`} style={{ animationDelay: '150ms' }}></div>
          <div className={`w-2 h-2 rounded-full animate-bounce ${getDotColor()}`} style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};