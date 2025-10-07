import React from 'react';
import { APISettings } from './APISettings';
import { useTheme } from '../hooks/useTheme';

interface HiddenAPISettingsProps {
  isVisible: boolean;
  onHide: () => void;
}

export const HiddenAPISettings: React.FC<HiddenAPISettingsProps> = ({ isVisible, onHide }) => {
  const theme = useTheme();

  if (!isVisible) {
    return null;
  }

  return (
    <div>
      <APISettings />
      <button
        onClick={onHide}
        className={`mt-3 w-full text-xs py-2 rounded-lg transition-all ${
          theme.theme === 'pastel-cute' ? 'bg-pink-100 text-pink-600 hover:bg-pink-200' :
          theme.theme === 'sci-fi-pet' ? 'bg-gray-800 text-blue-400 hover:bg-gray-700' :
          theme.theme === 'nature-spirit' ? 'bg-green-100 text-green-600 hover:bg-green-200' :
          theme.theme === 'electronics' ? 'bg-gray-800 text-orange-400 hover:bg-gray-700' :
          'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        Hide Advanced Configuration
      </button>
    </div>
  );
};
