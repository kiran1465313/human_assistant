import React from 'react';
import { Volume2, Bell, Globe, Shield } from 'lucide-react';
import { VoiceSettings } from './VoiceSettings';
import { APISettings } from './APISettings';
import { ThemeSelector } from './ThemeSelector';
import { useTheme } from '../hooks/useTheme';

interface SettingsScreenProps {
  voiceChat?: any;
  theme?: ReturnType<typeof useTheme>;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ voiceChat, theme }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">Customize your Hello Guys experience</p>
        </div>

        <div className="space-y-6">
          {/* API Settings */}
          <APISettings />

          {/* Theme Selection */}
          <ThemeSelector theme={theme} />

          {/* Voice Settings */}
          {voiceChat && (
            <VoiceSettings
              settings={voiceChat.settings}
              voices={voiceChat.voices}
              onUpdateSettings={voiceChat.updateSettings}
            />
          )}

          {/* Notifications */}
          <div className="bg-white dark:bg-gray-800 pastel-cute:bg-gradient-to-br pastel-cute:from-pink-50 pastel-cute:to-blue-50 sci-fi-pet:bg-gradient-to-br sci-fi-pet:from-gray-900 sci-fi-pet:to-blue-950 nature-spirit:bg-gradient-to-br nature-spirit:from-green-50 nature-spirit:to-yellow-50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 pastel-cute:border-pink-200 sci-fi-pet:border-blue-700 nature-spirit:border-green-200 p-6 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-6 h-6 text-blue-500 pastel-cute:text-pink-500 sci-fi-pet:text-blue-400 nature-spirit:text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 pastel-cute:text-pink-800 sci-fi-pet:text-blue-100 nature-spirit:text-green-800">Notifications</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300 pastel-cute:text-pink-700 sci-fi-pet:text-blue-200 nature-spirit:text-green-700">Sound Effects</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 pastel-cute:text-pink-600 sci-fi-pet:text-blue-300 nature-spirit:text-green-600">Play sounds for messages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 pastel-cute:bg-pink-200 sci-fi-pet:bg-gray-700 nature-spirit:bg-green-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 pastel-cute:peer-focus:ring-pink-300 sci-fi-pet:peer-focus:ring-blue-300 nature-spirit:peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 pastel-cute:peer-checked:bg-pink-500 sci-fi-pet:peer-checked:bg-blue-500 nature-spirit:peer-checked:bg-green-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300 pastel-cute:text-pink-700 sci-fi-pet:text-blue-200 nature-spirit:text-green-700">Desktop Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 pastel-cute:text-pink-600 sci-fi-pet:text-blue-300 nature-spirit:text-green-600">Show notifications outside the app</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 pastel-cute:bg-pink-200 sci-fi-pet:bg-gray-700 nature-spirit:bg-green-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 pastel-cute:peer-focus:ring-pink-300 sci-fi-pet:peer-focus:ring-blue-300 nature-spirit:peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 pastel-cute:peer-checked:bg-pink-500 sci-fi-pet:peer-checked:bg-blue-500 nature-spirit:peer-checked:bg-green-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white dark:bg-gray-800 pastel-cute:bg-gradient-to-br pastel-cute:from-pink-50 pastel-cute:to-blue-50 sci-fi-pet:bg-gradient-to-br sci-fi-pet:from-gray-900 sci-fi-pet:to-blue-950 nature-spirit:bg-gradient-to-br nature-spirit:from-green-50 nature-spirit:to-yellow-50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 pastel-cute:border-pink-200 sci-fi-pet:border-blue-700 nature-spirit:border-green-200 p-6 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-green-500 pastel-cute:text-pink-500 sci-fi-pet:text-blue-400 nature-spirit:text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 pastel-cute:text-pink-800 sci-fi-pet:text-blue-100 nature-spirit:text-green-800">Privacy & Security</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300 pastel-cute:text-pink-700 sci-fi-pet:text-blue-200 nature-spirit:text-green-700">Save Chat History</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 pastel-cute:text-pink-600 sci-fi-pet:text-blue-300 nature-spirit:text-green-600">Keep conversations for future reference</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 pastel-cute:bg-pink-200 sci-fi-pet:bg-gray-700 nature-spirit:bg-green-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 pastel-cute:peer-focus:ring-pink-300 sci-fi-pet:peer-focus:ring-blue-300 nature-spirit:peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 pastel-cute:peer-checked:bg-pink-500 sci-fi-pet:peer-checked:bg-blue-500 nature-spirit:peer-checked:bg-green-500"></div>
                </label>
              </div>
              
              <button className="w-full text-left p-3 bg-red-50 dark:bg-red-900/20 pastel-cute:bg-red-100 sci-fi-pet:bg-red-900/30 nature-spirit:bg-red-100 hover:bg-red-100 dark:hover:bg-red-900/30 pastel-cute:hover:bg-red-200 sci-fi-pet:hover:bg-red-800/40 nature-spirit:hover:bg-red-200 rounded-lg border border-red-200 dark:border-red-800 pastel-cute:border-red-300 sci-fi-pet:border-red-700 nature-spirit:border-red-300 transition-all duration-300">
                <p className="font-medium text-red-700 dark:text-red-400 pastel-cute:text-red-800 sci-fi-pet:text-red-300 nature-spirit:text-red-800">Clear All Data</p>
                <p className="text-sm text-red-600 dark:text-red-500 pastel-cute:text-red-700 sci-fi-pet:text-red-400 nature-spirit:text-red-700">Delete all conversations and settings</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};