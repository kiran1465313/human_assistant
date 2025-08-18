import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

interface ChatMascotProps {
  isTyping: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  lastMessageType?: 'user' | 'ai' | null;
  mood?: 'happy' | 'thinking' | 'excited' | 'calm';
}

export const ChatMascot: React.FC<ChatMascotProps> = ({
  isTyping,
  isSpeaking,
  isListening,
  lastMessageType,
  mood = 'happy'
}) => {
  const theme = useTheme();
  const [currentExpression, setCurrentExpression] = useState('😊');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let expression = '😊';
    
    if (isListening) {
      expression = '👂';
    } else if (isSpeaking) {
      expression = '🗣️';
    } else if (isTyping) {
      expression = '🤔';
    } else if (lastMessageType === 'user') {
      expression = '👍';
    } else if (lastMessageType === 'ai') {
      expression = '😄';
    } else {
      switch (mood) {
        case 'thinking': expression = '🤔'; break;
        case 'excited': expression = '🤩'; break;
        case 'calm': expression = '😌'; break;
        default: expression = '😊';
      }
    }

    if (expression !== currentExpression) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentExpression(expression);
        setIsAnimating(false);
      }, 150);
    }
  }, [isTyping, isSpeaking, isListening, lastMessageType, mood, currentExpression]);

  const getMascotStyle = () => {
    switch (theme.theme) {
      case 'pastel-cute':
        return 'bg-gradient-to-br from-pink-100 to-purple-100 border-pink-300 shadow-pink-500/20';
      case 'sci-fi-pet':
        return 'bg-gradient-to-br from-blue-900 to-purple-900 border-blue-400 shadow-blue-500/30';
      case 'nature-spirit':
        return 'bg-gradient-to-br from-green-100 to-blue-100 border-green-300 shadow-green-500/20';
      default:
        return 'bg-gradient-to-br from-white to-gray-50 border-gray-300 shadow-gray-500/20';
    }
  };

  const getPulseColor = () => {
    if (isListening) return 'shadow-red-500/50';
    if (isSpeaking) return 'shadow-green-500/50';
    if (isTyping) return 'shadow-blue-500/50';
    
    switch (theme.theme) {
      case 'pastel-cute': return 'shadow-pink-500/30';
      case 'sci-fi-pet': return 'shadow-blue-500/30';
      case 'nature-spirit': return 'shadow-green-500/30';
      default: return 'shadow-purple-500/30';
    }
  };

  return (
    <div className="fixed right-6 bottom-24 z-40">
      <div className={`
        relative w-20 h-20 rounded-full border-2 backdrop-blur-md transition-all duration-300
        ${getMascotStyle()}
        ${isListening || isSpeaking || isTyping ? 'animate-pulse scale-110' : 'hover:scale-105'}
        shadow-xl ${getPulseColor()}
      `}>
        {/* Glow effect */}
        <div className={`
          absolute inset-0 rounded-full blur-md opacity-50 -z-10
          ${isListening ? 'bg-red-400' : isSpeaking ? 'bg-green-400' : isTyping ? 'bg-blue-400' : 'bg-purple-400'}
        `} />
        
        {/* Mascot face */}
        <div className={`
          w-full h-full flex items-center justify-center text-3xl transition-all duration-300
          ${isAnimating ? 'scale-75 opacity-50' : 'scale-100 opacity-100'}
        `}>
          {currentExpression}
        </div>
        
        {/* Status indicator */}
        {(isListening || isSpeaking || isTyping) && (
          <div className={`
            absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs
            ${isListening ? 'bg-red-500 animate-pulse' : 
              isSpeaking ? 'bg-green-500 animate-pulse' : 
              'bg-blue-500 animate-bounce'}
            text-white shadow-lg
          `}>
            {isListening ? '🎤' : isSpeaking ? '🔊' : '💭'}
          </div>
        )}
        
        {/* Floating particles for extra charm */}
        {(isSpeaking || isListening) && (
          <>
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-75" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-1 -right-2 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '1s' }} />
          </>
        )}
      </div>
    </div>
  );
};