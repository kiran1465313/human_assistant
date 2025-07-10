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
          <div className={`rounded-xl shadow-sm p-6 transition-all duration-300 ${
            theme?.theme === 'pastel-cute' ? 'bg-gradient-to-br from-pink-50 to-blue-50 border border-pink-200' :
            theme?.theme === 'sci-fi-pet' ? 'bg-gradient-to-br from-gray-900 to-blue-950 border border-blue-700' :
            theme?.theme === 'nature-spirit' ? 'bg-gradient-to-br from-green-50 to-yellow-50 border border-green-200' :
            'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <Bell className={`w-6 h-6 ${
                theme?.theme === 'pastel-cute' ? 'text-pink-500' :
                theme?.theme === 'sci-fi-pet' ? 'text-blue-400' :
                theme?.theme === 'nature-spirit' ? 'text-green-600' :
                'text-blue-500'
              }`} />
              <h3 className={`text-lg font-semibold ${
                theme?.theme === 'pastel-cute' ? 'text-pink-800' :
                theme?.theme === 'sci-fi-pet' ? 'text-blue-100' :
                theme?.theme === 'nature-spirit' ? 'text-green-800' :
                'text-gray-800 dark:text-gray-100'
              }`}>Notifications</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${
                    theme?.theme === 'pastel-cute' ? 'text-pink-700' :
                    theme?.theme === 'sci-fi-pet' ? 'text-blue-200' :
                    theme?.theme === 'nature-spirit' ? 'text-green-700' :
                    'text-gray-700 dark:text-gray-300'
                  }`}>Sound Effects</p>
                  <p className={`text-sm ${
                    theme?.theme === 'pastel-cute' ? 'text-pink-600' :
                    theme?.theme === 'sci-fi-pet' ? 'text-blue-300' :
                    theme?.theme === 'nature-spirit' ? 'text-green-600' :
                    'text-gray-500 dark:text-gray-400'
                  }`}>Play sounds for messages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                    theme?.theme === 'pastel-cute' ? 'bg-pink-200 peer-focus:ring-pink-300 peer-checked:bg-pink-500' :
                    theme?.theme === 'sci-fi-pet' ? 'bg-gray-700 peer-focus:ring-blue-300 peer-checked:bg-blue-500' :
                    theme?.theme === 'nature-spirit' ? 'bg-green-200 peer-focus:ring-green-300 peer-checked:bg-green-500' :
                    'bg-gray-200 dark:bg-gray-600 peer-focus:ring-purple-300 peer-checked:bg-purple-600'
                  } peer-focus:outline-none peer-focus:ring-4`}></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${
                    theme?.theme === 'pastel-cute' ? 'text-pink-700' :
                    theme?.theme === 'sci-fi-pet' ? 'text-blue-200' :
                    theme?.theme === 'nature-spirit' ? 'text-green-700' :
                    'text-gray-700 dark:text-gray-300'
                  }`}>Desktop Notifications</p>
                  <p className={`text-sm ${
                    theme?.theme === 'pastel-cute' ? 'text-pink-600' :
                    theme?.theme === 'sci-fi-pet' ? 'text-blue-300' :
                    theme?.theme === 'nature-spirit' ? 'text-green-600' :
                    'text-gray-500 dark:text-gray-400'
                  }`}>Show notifications outside the app</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                    theme?.theme === 'pastel-cute' ? 'bg-pink-200 peer-focus:ring-pink-300 peer-checked:bg-pink-500' :
                    theme?.theme === 'sci-fi-pet' ? 'bg-gray-700 peer-focus:ring-blue-300 peer-checked:bg-blue-500' :
                    theme?.theme === 'nature-spirit' ? 'bg-green-200 peer-focus:ring-green-300 peer-checked:bg-green-500' :
                    'bg-gray-200 dark:bg-gray-600 peer-focus:ring-purple-300 peer-checked:bg-purple-600'
                  } peer-focus:outline-none peer-focus:ring-4`}></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className={`rounded-xl shadow-sm p-6 transition-all duration-300 ${
            theme?.theme === 'pastel-cute' ? 'bg-gradient-to-br from-pink-50 to-blue-50 border border-pink-200' :
            theme?.theme === 'sci-fi-pet' ? 'bg-gradient-to-br from-gray-900 to-blue-950 border border-blue-700' :
            theme?.theme === 'nature-spirit' ? 'bg-gradient-to-br from-green-50 to-yellow-50 border border-green-200' :
            'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <Shield className={`w-6 h-6 ${
                theme?.theme === 'pastel-cute' ? 'text-pink-500' :
                theme?.theme === 'sci-fi-pet' ? 'text-blue-400' :
                theme?.theme === 'nature-spirit' ? 'text-green-600' :
                'text-green-500'
              }`} />
              <h3 className={`text-lg font-semibold ${
                theme?.theme === 'pastel-cute' ? 'text-pink-800' :
                theme?.theme === 'sci-fi-pet' ? 'text-blue-100' :
                theme?.theme === 'nature-spirit' ? 'text-green-800' :
                'text-gray-800 dark:text-gray-100'
              }`}>Privacy & Security</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${
                    theme?.theme === 'pastel-cute' ? 'text-pink-700' :
                    theme?.theme === 'sci-fi-pet' ? 'text-blue-200' :
                    theme?.theme === 'nature-spirit' ? 'text-green-700' :
                    'text-gray-700 dark:text-gray-300'
                  }`}>Save Chat History</p>
                  <p className={`text-sm ${
                    theme?.theme === 'pastel-cute' ? 'text-pink-600' :
                    theme?.theme === 'sci-fi-pet' ? 'text-blue-300' :
                    theme?.theme === 'nature-spirit' ? 'text-green-600' :
                    'text-gray-500 dark:text-gray-400'
                  }`}>Keep conversations for future reference</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                    theme?.theme === 'pastel-cute' ? 'bg-pink-200 peer-focus:ring-pink-300 peer-checked:bg-pink-500' :
                    theme?.theme === 'sci-fi-pet' ? 'bg-gray-700 peer-focus:ring-blue-300 peer-checked:bg-blue-500' :
                    theme?.theme === 'nature-spirit' ? 'bg-green-200 peer-focus:ring-green-300 peer-checked:bg-green-500' :
                    'bg-gray-200 dark:bg-gray-600 peer-focus:ring-purple-300 peer-checked:bg-purple-600'
                  } peer-focus:outline-none peer-focus:ring-4`}></div>
                </label>
              </div>
              
              <button className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                theme?.theme === 'pastel-cute' ? 'bg-red-100 hover:bg-red-200 border border-red-300' :
                theme?.theme === 'sci-fi-pet' ? 'bg-red-900/30 hover:bg-red-800/40 border border-red-700' :
                theme?.theme === 'nature-spirit' ? 'bg-red-100 hover:bg-red-200 border border-red-300' :
                'bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800'
              }`}>
                <p className={`font-medium ${
                  theme?.theme === 'pastel-cute' ? 'text-red-800' :
                  theme?.theme === 'sci-fi-pet' ? 'text-red-300' :
                  theme?.theme === 'nature-spirit' ? 'text-red-800' :
                  'text-red-700 dark:text-red-400'
                }`}>Clear All Data</p>
                <p className={`text-sm ${
                  theme?.theme === 'pastel-cute' ? 'text-red-700' :
                  theme?.theme === 'sci-fi-pet' ? 'text-red-400' :
                  theme?.theme === 'nature-spirit' ? 'text-red-700' :
                  'text-red-600 dark:text-red-500'
                }`}>Delete all conversations and settings</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};