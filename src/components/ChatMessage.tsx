import React from 'react';
import { Bot, User, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
  onSpeak?: (text: string) => void;
  isSpeaking?: boolean;
  onStopSpeaking?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isUser, 
  timestamp, 
  onSpeak, 
  isSpeaking, 
  onStopSpeaking 
}) => {
  const theme = useTheme();

  const getTextColor = () => {
    if (isUser) return 'text-white';
    
    switch (theme.theme) {
      case 'pastel-cute': return 'text-pink-800';
      case 'sci-fi-pet': return 'text-blue-100';
      case 'nature-spirit': return 'text-green-800';
      default: return 'text-gray-800 dark:text-gray-100';
    }
  };

  const getMessageBg = () => {
    if (isUser) {
      switch (theme.theme) {
        case 'pastel-cute': return 'bg-gradient-to-r from-pink-500 to-purple-500';
        case 'sci-fi-pet': return 'bg-gradient-to-r from-blue-600 to-purple-600';
        case 'nature-spirit': return 'bg-gradient-to-r from-green-500 to-blue-500';
        default: return 'bg-blue-500';
      }
    } else {
      // Semi-transparent with glass effect for AI messages
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
    }
  };

  const handleSpeakClick = () => {
    if (isSpeaking) {
      onStopSpeaking?.();
    } else {
      onSpeak?.(message);
    }
  };

  return (
    <div className={`flex gap-3 mb-6 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-fade-in-up`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-500' : 'bg-gradient-to-br from-purple-500 to-pink-500'
      }`}>
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>
      
      <div className={`flex flex-col max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`relative group px-4 py-3 rounded-2xl ${
          isUser 
            ? `${getMessageBg()} text-white rounded-br-md` 
            : `${getMessageBg()} ${getTextColor()} rounded-bl-md transition-all duration-300`
        }`}>
          {/* Gradient text overlay for better readability */}
          {!isUser && (
            <div className="absolute inset-0 rounded-2xl rounded-bl-md bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          )}
          
          <div className="relative z-10">
            <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
              {message}
            </p>
          </div>
          
          {/* Voice button for AI messages */}
          {!isUser && onSpeak && (
            <button
              onClick={handleSpeakClick}
              className={`absolute -right-2 -bottom-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 ${
                theme.theme === 'pastel-cute' ? 'bg-pink-500 hover:bg-pink-600 text-white shadow-lg shadow-pink-500/30' :
                theme.theme === 'sci-fi-pet' ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30' :
                theme.theme === 'nature-spirit' ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30' :
                'bg-purple-500 hover:bg-purple-600 text-white shadow-lg'
              } ${isSpeaking ? 'animate-pulse' : ''}`}
              title={isSpeaking ? 'Stop speaking' : 'Speak message'}
            >
              {isSpeaking ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
        
        <span className={`text-xs mt-1 px-1 ${
          theme.theme === 'pastel-cute' ? 'text-pink-500' :
          theme.theme === 'sci-fi-pet' ? 'text-blue-400' :
          theme.theme === 'nature-spirit' ? 'text-green-600' :
          'text-gray-400 dark:text-gray-500'
        }`}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};