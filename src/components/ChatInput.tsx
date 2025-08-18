import React, { useState, KeyboardEvent } from 'react';
import { Send, Smile, Trash2 } from 'lucide-react';
import { EmojiPicker } from './EmojiPicker';
import { VoiceControls } from './VoiceControls';
import { useTheme } from '../hooks/useTheme';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onClearChat?: () => void;
  disabled?: boolean;
  voiceChat?: any;
  hasMessages?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  onClearChat, 
  disabled = false, 
  voiceChat,
  hasMessages = false 
}) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const theme = useTheme();

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !disabled) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceInput = () => {
    if (!voiceChat) return;
    
    voiceChat.startListening(
      (transcript: string) => {
        setMessage(prev => prev + transcript);
      },
      (error: string) => {
        console.error('Voice input error:', error);
      }
    );
  };

  const handleClearChat = () => {
    if (onClearChat && hasMessages) {
      if (window.confirm('Are you sure you want to clear all messages? This action cannot be undone.')) {
        onClearChat();
      }
    }
  };

  const getInputBg = () => {
    switch (theme.theme) {
      case 'pastel-cute': 
        return 'bg-white/70 backdrop-blur-md border-pink-200/50 focus:border-pink-400 focus:ring-pink-400/30';
      case 'sci-fi-pet': 
        return 'bg-gray-900/70 backdrop-blur-md border-blue-400/30 focus:border-blue-400 focus:ring-blue-400/30 text-blue-100 placeholder-blue-300';
      case 'nature-spirit': 
        return 'bg-white/70 backdrop-blur-md border-green-200/50 focus:border-green-400 focus:ring-green-400/30';
      default: 
        return 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-gray-200/50 dark:border-gray-700/50 focus:border-blue-400 focus:ring-blue-400/30 dark:text-gray-100';
    }
  };

  const getContainerBg = () => {
    switch (theme.theme) {
      case 'pastel-cute': 
        return 'bg-white/60 backdrop-blur-lg border-pink-200/30';
      case 'sci-fi-pet': 
        return 'bg-gray-900/60 backdrop-blur-lg border-blue-400/20';
      case 'nature-spirit': 
        return 'bg-white/60 backdrop-blur-lg border-green-200/30';
      default: 
        return 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-gray-200/30 dark:border-gray-700/30';
    }
  };

  const getSendButtonStyle = () => {
    switch (theme.theme) {
      case 'pastel-cute': 
        return 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg shadow-pink-500/30';
      case 'sci-fi-pet': 
        return 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/30';
      case 'nature-spirit': 
        return 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg shadow-green-500/30';
      default: 
        return 'bg-blue-500 hover:bg-blue-600 shadow-lg';
    }
  };

  const getClearButtonStyle = () => {
    switch (theme.theme) {
      case 'pastel-cute': 
        return 'bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 shadow-lg shadow-red-500/30';
      case 'sci-fi-pet': 
        return 'bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600 shadow-lg shadow-red-500/30';
      case 'nature-spirit': 
        return 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-lg shadow-red-500/30';
      default: 
        return 'bg-red-500 hover:bg-red-600 shadow-lg';
    }
  };

  return (
    <div className={`border-t p-4 transition-all duration-300 ${getContainerBg()}`}>
      <div className="flex items-end gap-3 max-w-4xl mx-auto">
        {/* Clear Chat Button */}
        {hasMessages && (
          <button
            onClick={handleClearChat}
            className={`flex-shrink-0 p-3 text-white rounded-full transition-all duration-200 hover:scale-110 ${getClearButtonStyle()}`}
            title="Clear chat history"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
        
        <div className="relative">
          <button 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className={`flex-shrink-0 p-2 rounded-full transition-all duration-200 hover:scale-110 ${
              theme.theme === 'pastel-cute' ? 'text-pink-500 hover:bg-pink-100' :
              theme.theme === 'sci-fi-pet' ? 'text-blue-400 hover:bg-blue-900/30' :
              theme.theme === 'nature-spirit' ? 'text-green-600 hover:bg-green-100' :
              'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Smile className="w-5 h-5" />
          </button>
          <EmojiPicker 
            isOpen={showEmojiPicker}
            onEmojiSelect={handleEmojiSelect}
            onClose={() => setShowEmojiPicker(false)}
          />
        </div>
        
        <div className="flex-1 relative">
          {/* Voice Controls - Better positioned */}
          {voiceChat && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
              <VoiceControls
                isListening={voiceChat.isListening}
                isSpeaking={voiceChat.isSpeaking}
                isSupported={voiceChat.isSupported}
                onStartListening={handleVoiceInput}
                onStopListening={voiceChat.stopListening}
                onStopSpeaking={voiceChat.stopSpeaking}
                disabled={disabled}
                compact={true}
              />
            </div>
          )}
          
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message here... (Enter to send, Shift+Enter for new line)"
            disabled={disabled}
            className={`w-full py-3 pr-12 border rounded-2xl resize-none focus:outline-none focus:ring-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg ${
              voiceChat ? 'pl-16' : 'px-4'
            } ${getInputBg()}`}
            rows={1}
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
        </div>
        
        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className={`flex-shrink-0 p-3 text-white rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 ${getSendButtonStyle()}`}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};