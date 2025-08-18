import React from 'react';
import { MessageCircle, Zap, Heart, Brain, ArrowRight, Mic } from 'lucide-react';

interface WelcomeScreenProps {
  onStartChat: (message: string) => void;
  onNavigate: (screen: 'settings' | 'about') => void;
  onPersonalityDemo?: (trait: string) => void;
  voiceChat?: any;
  theme?: any;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartChat, onNavigate, onPersonalityDemo, voiceChat, theme }) => {
  const suggestions = [
    "Tell me a joke to brighten my day",
    "What's the weather like today?",
    "Help me understand a complex topic",
    "Set a reminder for me"
  ];

  const handleVoiceInput = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (!voiceChat) return;
    
    voiceChat.startListening(
      (transcript: string) => {
        if (inputRef.current) {
          inputRef.current.value = transcript;
          onStartChat(transcript);
        }
      },
      (error: string) => {
        console.error('Voice input error:', error);
      }
    );
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 mx-auto">
          <MessageCircle className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 text-center">
          Hi there! I'm an Ai assistant Created by Kiran
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto text-center">
          I'm here to help you with anything you need — from answering questions to having friendly conversations. How can I assist you today?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full mb-8">
        <button 
          onClick={() => onPersonalityDemo?.('quick')}
          className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 dark:hover:from-yellow-900/20 dark:hover:to-orange-900/20 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-yellow-200 dark:hover:border-yellow-600 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
        >
          <Zap className="w-6 h-6 text-yellow-500" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Quick & Smart</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Click to see lightning-fast responses!</p>
          </div>
        </button>
        
        <button 
          onClick={() => onPersonalityDemo?.('friendly')}
          className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/20 dark:hover:to-pink-900/20 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-600 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
        >
          <Heart className="w-6 h-6 text-red-500" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Friendly & Patient</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Experience my warm, caring personality!</p>
          </div>
        </button>
        
        <button 
          onClick={() => onPersonalityDemo?.('smart')}
          className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
        >
          <Brain className="w-6 h-6 text-blue-500" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Understanding</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Test my knowledge and explanations!</p>
          </div>
        </button>
        
        <button 
          onClick={() => onPersonalityDemo?.('patient')}
          className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-600 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
        >
          <MessageCircle className="w-6 h-6 text-green-500" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Patient & Kind</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">See how I handle repetitive questions!</p>
          </div>
        </button>
      </div>

      <div className="w-full max-w-2xl">
        {/* Direct Chat Input */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Start chatting right away:</h3>
          <div className="relative flex items-center gap-3">
            {voiceChat && voiceChat.isSupported && (
              <button
                onClick={() => {
                  const input = document.querySelector('input[placeholder*="Type your message"]') as HTMLInputElement;
                  handleVoiceInput({ current: input });
                }}
                disabled={voiceChat.isListening || voiceChat.isSpeaking}
                className={`p-3 rounded-full transition-all duration-200 ${
                  voiceChat.isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50'
                }`}
                title="Voice input"
              >
                <Mic className="w-5 h-5" />
              </button>
            )}
            
            <input
              ref={(el) => {
                if (el) {
                  el.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                      const target = e.target as HTMLInputElement;
                      if (target.value.trim()) {
                        onStartChat(target.value.trim());
                        target.value = '';
                      }
                    }
                  });
                }
              }}
              type="text"
              placeholder="Type your message here and press Enter..."
              className="flex-1 px-4 py-3 pr-12 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 dark:text-gray-100 shadow-sm transition-colors"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
              <span className="text-sm">Press Enter ↵</span>
            </div>
          </div>
          
          {voiceChat && voiceChat.isListening && (
            <div className="mt-2 text-center text-red-600 text-sm animate-pulse">
              🎤 Listening... Speak now!
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Try asking me:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onStartChat(suggestion)}
              className="p-3 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
            >
              "{suggestion}"
            </button>
          ))}
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="mt-8 flex gap-4 justify-center">
        <button
          onClick={() => onNavigate('settings')}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
        >
          Settings
          <ArrowRight className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => onNavigate('about')}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
        >
          About
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};