import React from 'react';
import { Mic, MicOff, Volume2, VolumeX, Settings } from 'lucide-react';
import { useVoiceChat } from '../hooks/useVoiceChat';

interface VoiceControlsProps {
  onVoiceInput?: (text: string) => void;
  onSpeakText?: (text: string) => void;
  className?: string;
}

export const VoiceControls: React.FC<VoiceControlsProps> = ({
  onVoiceInput,
  onSpeakText,
  className = ''
}) => {
  const {
    isListening,
    isSpeaking,
    isSupported,
    settings,
    startListening,
    stopListening,
    speak,
    stopSpeaking
  } = useVoiceChat();

  if (!isSupported) {
    return null;
  }

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening(
        (text) => onVoiceInput?.(text),
        (error) => console.error('Voice input error:', error)
      );
    }
  };

  const handleSpeakerClick = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else if (onSpeakText) {
      onSpeakText('Voice controls are ready');
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={handleMicClick}
        disabled={!settings.enabled}
        className={`p-2 rounded-full transition-colors ${
          isListening
            ? 'bg-red-500 text-white animate-pulse'
            : settings.enabled
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        title={isListening ? 'Stop listening' : 'Start voice input'}
      >
        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
      </button>

      <button
        onClick={handleSpeakerClick}
        disabled={!settings.enabled}
        className={`p-2 rounded-full transition-colors ${
          isSpeaking
            ? 'bg-green-500 text-white animate-pulse'
            : settings.enabled
            ? 'bg-purple-500 text-white hover:bg-purple-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        title={isSpeaking ? 'Stop speaking' : 'Test voice output'}
      >
        {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  );
};