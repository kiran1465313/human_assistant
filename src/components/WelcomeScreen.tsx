import React from 'react';
import { MessageCircle, Zap, Heart, Brain, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onStartChat: (message: string) => void;
  onNavigate: (screen: 'settings' | 'about') => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartChat, onNavigate }) => {
  const suggestions = [
    "Tell me a joke to brighten my day",
    "What's the weather like today?",
    "Help me understand a complex topic",
    "Set a reminder for me"
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 mx-auto">
          <MessageCircle className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Hi there! I'm your AI Assistant
        </h1>
        <p className="text-gray-600 text-lg max-w-md">
          I'm here to help you with anything you need — from answering questions to having friendly conversations. How can I assist you today?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full mb-8">
        <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <Zap className="w-6 h-6 text-yellow-500" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">Quick & Smart</h3>
            <p className="text-sm text-gray-600">Fast responses with accurate information</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <Heart className="w-6 h-6 text-red-500" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">Friendly & Patient</h3>
            <p className="text-sm text-gray-600">Always here to help with a warm tone</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <Brain className="w-6 h-6 text-blue-500" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">Understanding</h3>
            <p className="text-sm text-gray-600">I adapt to your needs and context</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <MessageCircle className="w-6 h-6 text-green-500" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">Natural Chat</h3>
            <p className="text-sm text-gray-600">Conversations that feel human</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Try asking me:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onStartChat(suggestion)}
              className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors text-gray-700 hover:text-gray-900"
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
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors text-gray-700 hover:text-gray-900"
        >
          Settings
          <ArrowRight className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => onNavigate('about')}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors text-gray-700 hover:text-gray-900"
        >
          About
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};