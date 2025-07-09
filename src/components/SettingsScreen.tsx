import React from 'react';
import { Volume2, Moon, Sun, Bell, Globe, Shield, Palette } from 'lucide-react';
import { VoiceSettings } from './VoiceSettings';
import { APISettings } from './APISettings';
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

          {/* Voice Settings */}
          {voiceChat && (
            <VoiceSettings
              settings={voiceChat.settings}
              voices={voiceChat.voices}
              onUpdateSettings={voiceChat.updateSettings}
            />
          )}

          {/* Appearance */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-6 h-6 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Appearance</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {theme?.isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    <p className="font-medium text-gray-700 dark:text-gray-300">Dark Mode</p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {theme?.isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                  </p>
                </div>
                <button
                  onClick={theme?.toggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                    theme?.isDark ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      theme?.isDark ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Compact Mode</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Reduce spacing for more content</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Notifications</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Sound Effects</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Play sounds for messages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Desktop Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Show notifications outside the app</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Privacy & Security</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Save Chat History</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Keep conversations for future reference</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              
              <button className="w-full text-left p-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800 transition-colors">
                <p className="font-medium text-red-700 dark:text-red-400">Clear All Data</p>
                <p className="text-sm text-red-600 dark:text-red-500">Delete all conversations and settings</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};