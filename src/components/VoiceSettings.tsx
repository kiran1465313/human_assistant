import React from 'react';
import { Volume2, Settings } from 'lucide-react';
import { VoiceSettings as VoiceSettingsType } from '../hooks/useVoiceChat';

interface VoiceSettingsProps {
  settings: VoiceSettingsType;
  voices: SpeechSynthesisVoice[];
  onUpdateSettings: (settings: Partial<VoiceSettingsType>) => void;
}

export const VoiceSettings: React.FC<VoiceSettingsProps> = ({
  settings,
  voices,
  onUpdateSettings
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-4">
        <Volume2 className="w-6 h-6 text-indigo-500" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Voice Settings</h3>
      </div>
      
      <div className="space-y-4">
        {/* Enable Voice */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">Enable Voice Features</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Turn on voice input and output</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={settings.enabled}
              onChange={(e) => onUpdateSettings({ enabled: e.target.checked })}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>

        {/* Auto Speak */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">Auto Speak Responses</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Automatically read AI responses aloud</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={settings.autoSpeak}
              onChange={(e) => onUpdateSettings({ autoSpeak: e.target.checked })}
              disabled={!settings.enabled}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 peer-disabled:opacity-50"></div>
          </label>
        </div>

        {/* Voice Selection */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">Voice</label>
          <select
            value={settings.voice?.name || ''}
            onChange={(e) => {
              const selectedVoice = voices.find(v => v.name === e.target.value);
              onUpdateSettings({ voice: selectedVoice || null });
            }}
            disabled={!settings.enabled}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 bg-white dark:bg-gray-700 dark:text-gray-100 transition-colors duration-300"
          >
            <option value="">Select a voice</option>
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>

        {/* Speed Control */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
            Speech Rate: {settings.rate.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={settings.rate}
            onChange={(e) => onUpdateSettings({ rate: parseFloat(e.target.value) })}
            disabled={!settings.enabled}
            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
          />
        </div>

        {/* Pitch Control */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
            Pitch: {settings.pitch.toFixed(1)}
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={settings.pitch}
            onChange={(e) => onUpdateSettings({ pitch: parseFloat(e.target.value) })}
            disabled={!settings.enabled}
            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
          />
        </div>

        {/* Volume Control */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
            Volume: {Math.round(settings.volume * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.volume}
            onChange={(e) => onUpdateSettings({ volume: parseFloat(e.target.value) })}
            disabled={!settings.enabled}
            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
          />
        </div>

        {/* Test Voice Button */}
        <button
          onClick={() => {
            if (settings.voice && window.speechSynthesis) {
              const utterance = new SpeechSynthesisUtterance("Hello! This is how I sound with the current settings.");
              utterance.voice = settings.voice;
              utterance.rate = settings.rate;
              utterance.pitch = settings.pitch;
              utterance.volume = settings.volume;
              window.speechSynthesis.speak(utterance);
            }
          }}
          disabled={!settings.enabled || !settings.voice}
          className="w-full bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Test Voice
        </button>
      </div>
    </div>
  );
};