import React, { useState, KeyboardEvent } from 'react';
import { Send, Smile } from 'lucide-react';
import { EmojiPicker } from './EmojiPicker';
import { VoiceControls } from './VoiceControls';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  voiceChat?: any;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false, voiceChat }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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
    if (e.key === 'Enter' && !e.shiftKey) {
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

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 transition-colors duration-300">
      <div className="flex items-end gap-3 max-w-4xl mx-auto">
        <div className="relative">
          <button 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="flex-shrink-0 p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
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
          {/* Voice Controls */}
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
              />
            </div>
          )}
          
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            disabled={disabled}
            className={`w-full py-3 pr-12 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
              voiceChat ? 'pl-20' : 'px-4'
            } dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 transition-colors duration-300`}
            rows={1}
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
        </div>
        
        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="flex-shrink-0 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};