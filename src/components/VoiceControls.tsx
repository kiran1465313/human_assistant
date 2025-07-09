import React from 'react';
import { Mic, MicOff, Volume2, VolumeX, Square } from 'lucide-react';

interface VoiceControlsProps {
  isListening: boolean;
  isSpeaking: boolean;
  isSupported: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onStopSpeaking: () => void;
  disabled?: boolean;
}

export const VoiceControls: React.FC<VoiceControlsProps> = ({
  isListening,
  isSpeaking,
  isSupported,
  onStartListening,
  onStopListening,
  onStopSpeaking,
  disabled = false
}) => {
  if (!isSupported) {
    return (
      <div className="flex items-center gap-2 text-gray-400">
        <MicOff className="w-5 h-5" />
        <span className="text-sm">Voice not supported</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {/* Voice Input Button */}
      <button
        onClick={isListening ? onStopListening : onStartListening}
        disabled={disabled || isSpeaking}
        className={`p-2 rounded-full transition-all duration-200 ${
          isListening
            ? 'bg-red-500 text-white animate-pulse shadow-lg'
            : 'bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed'
        }`}
        title={isListening ? 'Stop listening' : 'Start voice input'}
      >
        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
      </button>

      {/* Speaking Indicator/Stop Button */}
      {isSpeaking && (
        <button
          onClick={onStopSpeaking}
          className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors animate-pulse"
          title="Stop speaking"
        >
          <Square className="w-4 h-4" />
        </button>
      )}

      {/* Status Indicator */}
      <div className="flex items-center gap-1 text-sm">
        {isListening && (
          <div className="flex items-center gap-1 text-red-600">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span>Listening...</span>
          </div>
        )}
        {isSpeaking && (
          <div className="flex items-center gap-1 text-green-600">
            <Volume2 className="w-4 h-4" />
            <span>Speaking...</span>
          </div>
        )}
      </div>
    </div>
  );
};