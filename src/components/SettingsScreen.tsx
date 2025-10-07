import React, { useState, useEffect } from 'react';
import { Volume2, Bell, Globe, Shield, Trash2, Download, AlertTriangle } from 'lucide-react';
import { VoiceSettings } from './VoiceSettings';
import { HiddenAPISettings } from './HiddenAPISettings';
import { ThemeSelector } from './ThemeSelector';
import { DataManager } from './DataManager';
import { useTheme } from '../hooks/useTheme';

interface SettingsScreenProps {
  voiceChat?: any;
  theme?: ReturnType<typeof useTheme>;
  onClearAllData?: () => void;
  onExportData?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  voiceChat,
  theme,
  onClearAllData,
  onExportData
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [showAPISettings, setShowAPISettings] = useState(false);
  const [resetTimer, setResetTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (clickCount >= 7) {
      setShowAPISettings(true);
      setClickCount(0);
    }
  }, [clickCount]);

  useEffect(() => {
    return () => {
      if (resetTimer) {
        clearTimeout(resetTimer);
      }
    };
  }, [resetTimer]);

  const handleSecretClick = () => {
    setClickCount(prev => prev + 1);

    if (resetTimer) {
      clearTimeout(resetTimer);
    }

    const timer = setTimeout(() => {
      setClickCount(0);
    }, 2000);

    setResetTimer(timer);
  };

  const handleClearAllData = () => {
    if (window.confirm('⚠️ This will permanently delete all your chat history, settings, and API keys. This action cannot be undone. Are you sure?')) {
      if (window.confirm('🚨 Last chance! This will clear EVERYTHING. Continue?')) {
        // Clear all localStorage data
        localStorage.clear();
        
        // Call the callback if provided
        onClearAllData?.();
        
        // Show success message and reload
        alert('✅ All data has been cleared successfully. The page will now reload.');
        window.location.reload();
      }
    }
  };

  const handleExportData = () => {
    try {
      const data = {
        chatHistory: localStorage.getItem('hello-guys-chat-history'),
        voiceSettings: localStorage.getItem('voice-settings'),
        theme: localStorage.getItem('theme'),
        exportDate: new Date().toISOString(),
        version: '1.0.0'
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hello-guys-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      onExportData?.();
    } catch (error) {
      console.error('Export failed:', error);
      alert('❌ Failed to export data. Please try again.');
    }
  };

  const testVoice = () => {
    if (voiceChat?.settings.voice && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance("नमस्ते! मैं आपका AI असिस्टेंट हूँ। Hello! I am your AI assistant. This is how I sound with the current settings.");
      utterance.voice = voiceChat.settings.voice;
      utterance.rate = voiceChat.settings.rate;
      utterance.pitch = voiceChat.settings.pitch;
      utterance.volume = voiceChat.settings.volume;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">Customize your Hello Guys experience</p>
        </div>

        <div className="space-y-6">
          {/* Hidden API Settings */}
          <HiddenAPISettings
            isVisible={showAPISettings}
            onHide={() => setShowAPISettings(false)}
          />

          {/* Theme Selection */}
          <ThemeSelector
            theme={theme}
            onSecretClick={handleSecretClick}
          />

          {/* Data Manager */}
          <DataManager />

          {/* Voice Settings */}
          {voiceChat && (
            <VoiceSettings
              settings={voiceChat.settings}
              voices={voiceChat.voices}
              onUpdateSettings={voiceChat.updateSettings}
              onTestVoice={testVoice}
            />
          )}

          {/* Notifications */}
          <div className={`rounded-xl shadow-sm p-6 transition-all duration-300 ${
            theme?.theme === 'pastel-cute' ? 'bg-gradient-to-br from-pink-50 to-blue-50 border border-pink-200' :
            theme?.theme === 'sci-fi-pet' ? 'bg-gradient-to-br from-gray-900 to-blue-950 border border-blue-700' :
            theme?.theme === 'nature-spirit' ? 'bg-gradient-to-br from-green-50 to-yellow-50 border border-green-200' :
            theme?.theme === 'electronics' ? 'bg-gradient-to-br from-gray-900 to-orange-950 border border-orange-600' :
            'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <Bell className={`w-6 h-6 ${
                theme?.theme === 'pastel-cute' ? 'text-pink-500' :
                theme?.theme === 'sci-fi-pet' ? 'text-blue-400' :
                theme?.theme === 'nature-spirit' ? 'text-green-600' :
                theme?.theme === 'electronics' ? 'text-orange-500' :
                'text-blue-500'
              }`} />
              <h3 className={`text-lg font-semibold ${
                theme?.theme === 'pastel-cute' ? 'text-pink-800' :
                theme?.theme === 'sci-fi-pet' ? 'text-blue-100' :
                theme?.theme === 'nature-spirit' ? 'text-green-800' :
                theme?.theme === 'electronics' ? 'text-orange-100' :
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
                    theme?.theme === 'electronics' ? 'text-orange-200' :
                    'text-gray-700 dark:text-gray-300'
                  }`}>Sound Effects</p>
                  <p className={`text-sm ${
                    theme?.theme === 'pastel-cute' ? 'text-pink-600' :
                    theme?.theme === 'sci-fi-pet' ? 'text-blue-300' :
                    theme?.theme === 'nature-spirit' ? 'text-green-600' :
                    theme?.theme === 'electronics' ? 'text-orange-300' :
                    'text-gray-500 dark:text-gray-400'
                  }`}>Play sounds for messages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                    theme?.theme === 'pastel-cute' ? 'bg-pink-200 peer-focus:ring-pink-300 peer-checked:bg-pink-500' :
                    theme?.theme === 'sci-fi-pet' ? 'bg-gray-700 peer-focus:ring-blue-300 peer-checked:bg-blue-500' :
                    theme?.theme === 'nature-spirit' ? 'bg-green-200 peer-focus:ring-green-300 peer-checked:bg-green-500' :
                    theme?.theme === 'electronics' ? 'bg-gray-700 peer-focus:ring-orange-300 peer-checked:bg-orange-500' :
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
                    theme?.theme === 'electronics' ? 'text-orange-200' :
                    'text-gray-700 dark:text-gray-300'
                  }`}>Desktop Notifications</p>
                  <p className={`text-sm ${
                    theme?.theme === 'pastel-cute' ? 'text-pink-600' :
                    theme?.theme === 'sci-fi-pet' ? 'text-blue-300' :
                    theme?.theme === 'nature-spirit' ? 'text-green-600' :
                    theme?.theme === 'electronics' ? 'text-orange-300' :
                    'text-gray-500 dark:text-gray-400'
                  }`}>Show notifications outside the app</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                    theme?.theme === 'pastel-cute' ? 'bg-pink-200 peer-focus:ring-pink-300 peer-checked:bg-pink-500' :
                    theme?.theme === 'sci-fi-pet' ? 'bg-gray-700 peer-focus:ring-blue-300 peer-checked:bg-blue-500' :
                    theme?.theme === 'nature-spirit' ? 'bg-green-200 peer-focus:ring-green-300 peer-checked:bg-green-500' :
                    theme?.theme === 'electronics' ? 'bg-gray-700 peer-focus:ring-orange-300 peer-checked:bg-orange-500' :
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
            theme?.theme === 'electronics' ? 'bg-gradient-to-br from-gray-900 to-orange-950 border border-orange-600' :
            'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <Shield className={`w-6 h-6 ${
                theme?.theme === 'pastel-cute' ? 'text-pink-500' :
                theme?.theme === 'sci-fi-pet' ? 'text-blue-400' :
                theme?.theme === 'nature-spirit' ? 'text-green-600' :
                theme?.theme === 'electronics' ? 'text-orange-500' :
                'text-green-500'
              }`} />
              <h3 className={`text-lg font-semibold ${
                theme?.theme === 'pastel-cute' ? 'text-pink-800' :
                theme?.theme === 'sci-fi-pet' ? 'text-blue-100' :
                theme?.theme === 'nature-spirit' ? 'text-green-800' :
                theme?.theme === 'electronics' ? 'text-orange-100' :
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
                    theme?.theme === 'electronics' ? 'text-orange-200' :
                    'text-gray-700 dark:text-gray-300'
                  }`}>Save Chat History</p>
                  <p className={`text-sm ${
                    theme?.theme === 'pastel-cute' ? 'text-pink-600' :
                    theme?.theme === 'sci-fi-pet' ? 'text-blue-300' :
                    theme?.theme === 'nature-spirit' ? 'text-green-600' :
                    theme?.theme === 'electronics' ? 'text-orange-300' :
                    'text-gray-500 dark:text-gray-400'
                  }`}>Keep conversations for future reference</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                    theme?.theme === 'pastel-cute' ? 'bg-pink-200 peer-focus:ring-pink-300 peer-checked:bg-pink-500' :
                    theme?.theme === 'sci-fi-pet' ? 'bg-gray-700 peer-focus:ring-blue-300 peer-checked:bg-blue-500' :
                    theme?.theme === 'nature-spirit' ? 'bg-green-200 peer-focus:ring-green-300 peer-checked:bg-green-500' :
                    theme?.theme === 'electronics' ? 'bg-gray-700 peer-focus:ring-orange-300 peer-checked:bg-orange-500' :
                    'bg-gray-200 dark:bg-gray-600 peer-focus:ring-purple-300 peer-checked:bg-purple-600'
                  } peer-focus:outline-none peer-focus:ring-4`}></div>
                </label>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={handleExportData}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                    theme?.theme === 'pastel-cute' ? 'bg-blue-100 hover:bg-blue-200 border border-blue-300' :
                    theme?.theme === 'sci-fi-pet' ? 'bg-blue-900/30 hover:bg-blue-800/40 border border-blue-700' :
                    theme?.theme === 'nature-spirit' ? 'bg-blue-100 hover:bg-blue-200 border border-blue-300' :
                    theme?.theme === 'electronics' ? 'bg-blue-900/30 hover:bg-blue-800/40 border border-blue-700' :
                    'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Download className={`w-5 h-5 ${
                      theme?.theme === 'pastel-cute' ? 'text-blue-700' :
                      theme?.theme === 'sci-fi-pet' ? 'text-blue-300' :
                      theme?.theme === 'nature-spirit' ? 'text-blue-700' :
                      theme?.theme === 'electronics' ? 'text-blue-300' :
                      'text-blue-600 dark:text-blue-400'
                    }`} />
                    <div>
                      <p className={`font-medium ${
                        theme?.theme === 'pastel-cute' ? 'text-blue-800' :
                        theme?.theme === 'sci-fi-pet' ? 'text-blue-200' :
                        theme?.theme === 'nature-spirit' ? 'text-blue-800' :
                        theme?.theme === 'electronics' ? 'text-blue-200' :
                        'text-blue-700 dark:text-blue-300'
                      }`}>Export Data</p>
                      <p className={`text-sm ${
                        theme?.theme === 'pastel-cute' ? 'text-blue-700' :
                        theme?.theme === 'sci-fi-pet' ? 'text-blue-400' :
                        theme?.theme === 'nature-spirit' ? 'text-blue-700' :
                        theme?.theme === 'electronics' ? 'text-blue-400' :
                        'text-blue-600 dark:text-blue-400'
                      }`}>Download your chat history and settings</p>
                    </div>
                  </div>
                </button>
                
                <button 
                  onClick={handleClearAllData}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                theme?.theme === 'pastel-cute' ? 'bg-red-100 hover:bg-red-200 border border-red-300' :
                theme?.theme === 'sci-fi-pet' ? 'bg-red-900/30 hover:bg-red-800/40 border border-red-700' :
                theme?.theme === 'nature-spirit' ? 'bg-red-100 hover:bg-red-200 border border-red-300' :
                theme?.theme === 'electronics' ? 'bg-red-900/30 hover:bg-red-800/40 border border-red-700' :
                'bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800'
              }`}>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`w-5 h-5 ${
                      theme?.theme === 'pastel-cute' ? 'text-red-700' :
                      theme?.theme === 'sci-fi-pet' ? 'text-red-300' :
                      theme?.theme === 'nature-spirit' ? 'text-red-700' :
                      theme?.theme === 'electronics' ? 'text-red-300' :
                      'text-red-600 dark:text-red-400'
                    }`} />
                    <div>
                      <p className={`font-medium ${
                        theme?.theme === 'pastel-cute' ? 'text-red-800' :
                        theme?.theme === 'sci-fi-pet' ? 'text-red-300' :
                        theme?.theme === 'nature-spirit' ? 'text-red-800' :
                        theme?.theme === 'electronics' ? 'text-red-300' :
                        'text-red-700 dark:text-red-400'
                      }`}>Clear All Data</p>
                      <p className={`text-sm ${
                        theme?.theme === 'pastel-cute' ? 'text-red-700' :
                        theme?.theme === 'sci-fi-pet' ? 'text-red-400' :
                        theme?.theme === 'nature-spirit' ? 'text-red-700' :
                        theme?.theme === 'electronics' ? 'text-red-400' :
                        'text-red-600 dark:text-red-500'
                      }`}>⚠️ Permanently delete all conversations, settings, and API keys</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};