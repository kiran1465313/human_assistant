import React from 'react';
import { Mic, MicOff, Volume2, Square } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface VoiceControlsProps {
  isListening: boolean;
  isSpeaking: boolean;
  isSupported: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onStopSpeaking: () => void;
  disabled?: boolean;
  compact?: boolean;
}

export const VoiceControls: React.FC<VoiceControlsProps> = ({
  isListening,
  isSpeaking,
  isSupported,
  onStartListening,
  onStopListening,
  onStopSpeaking,
  disabled = false,
  compact = false
}) => {
  const theme = useTheme();

  if (!isSupported) {
    return compact ? null : (
      <div className="flex items-center gap-2 text-gray-400">
        <MicOff className="w-5 h-5" />
        <span className="text-sm">Voice not supported</span>
      </div>
    );
  }

  const getButtonStyle = (type: 'listening' | 'speaking' | 'default') => {
    const baseStyle = "p-2 rounded-full transition-all duration-200 shadow-lg";
    
    switch (type) {
      case 'listening':
        switch (theme.theme) {
          case 'pastel-cute': 
            return `${baseStyle} bg-gradient-to-r from-red-400 to-pink-500 text-white animate-pulse shadow-red-500/30`;
          case 'sci-fi-pet': 
            return `${baseStyle} bg-gradient-to-r from-red-500 to-purple-500 text-white animate-pulse shadow-red-500/30`;
          case 'nature-spirit': 
            return `${baseStyle} bg-gradient-to-r from-red-400 to-orange-500 text-white animate-pulse shadow-red-500/30`;
          default: 
            return `${baseStyle} bg-red-500 text-white animate-pulse shadow-red-500/30`;
        }
      case 'speaking':
        switch (theme.theme) {
          case 'pastel-cute': 
            return `${baseStyle} bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white animate-pulse shadow-green-500/30`;
          case 'sci-fi-pet': 
            return `${baseStyle} bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white animate-pulse shadow-green-500/30`;
          case 'nature-spirit': 
            return `${baseStyle} bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white animate-pulse shadow-green-500/30`;
          default: 
            return `${baseStyle} bg-green-500 hover:bg-green-600 text-white animate-pulse shadow-green-500/30`;
        }
      default:
        switch (theme.theme) {
          case 'pastel-cute': 
            return `${baseStyle} bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-pink-500/30`;
          case 'sci-fi-pet': 
            return `${baseStyle} bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-blue-500/30`;
          case 'nature-spirit': 
            return `${baseStyle} bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-green-500/30`;
          default: 
            return `${baseStyle} bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/30`;
        }
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Voice Input Button */}
      <button
        onClick={isListening ? onStopListening : onStartListening}
        disabled={disabled || isSpeaking}
        className={`${getButtonStyle(isListening ? 'listening' : 'default')} disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110`}
        title={isListening ? 'Stop listening' : 'Start voice input'}
      >
        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
      </button>

      {/* Speaking Indicator/Stop Button */}
      {isSpeaking && (
        <button
          onClick={onStopSpeaking}
          className={`${getButtonStyle('speaking')} hover:scale-110`}
          title="Stop speaking"
        >
          <Square className="w-4 h-4" />
        </button>
      )}

      {/* Status Indicator - Only show if not compact */}
      {!compact && (
        <div className="flex items-center gap-1 text-sm">
          {isListening && (
            <div className={`flex items-center gap-1 ${
              theme.theme === 'pastel-cute' ? 'text-pink-600' :
              theme.theme === 'sci-fi-pet' ? 'text-blue-400' :
              theme.theme === 'nature-spirit' ? 'text-green-600' :
              'text-red-600'
            }`}>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span>Listening...</span>
            </div>
          )}
          {isSpeaking && (
            <div className={`flex items-center gap-1 ${
              theme.theme === 'pastel-cute' ? 'text-pink-600' :
              theme.theme === 'sci-fi-pet' ? 'text-blue-400' :
              theme.theme === 'nature-spirit' ? 'text-green-600' :
              'text-green-600'
            }`}>
              <Volume2 className="w-4 h-4" />
              <span>Speaking...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};