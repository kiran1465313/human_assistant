import React from 'react';
import { Palette, Sun, Moon, Heart, Zap, Leaf } from 'lucide-react';
import { Theme, useTheme } from '../hooks/useTheme';

interface ThemeSelectorProps {
  theme: ReturnType<typeof useTheme>;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ theme }) => {
  const themes: { value: Theme; name: string; icon: React.ReactNode; description: string; preview: string }[] = [
    {
      value: 'light',
      name: 'Light',
      icon: <Sun className="w-5 h-5" />,
      description: 'Clean and bright interface',
      preview: 'bg-gradient-to-r from-gray-50 to-white'
    },
    {
      value: 'dark',
      name: 'Dark',
      icon: <Moon className="w-5 h-5" />,
      description: 'Easy on the eyes',
      preview: 'bg-gradient-to-r from-gray-800 to-gray-900'
    },
    {
      value: 'pastel-cute',
      name: 'Pastel Cute',
      icon: <Heart className="w-5 h-5" />,
      description: 'Soft pinks, blues, and mint colors',
      preview: 'bg-gradient-to-r from-pink-100 via-blue-100 to-green-100'
    },
    {
      value: 'sci-fi-pet',
      name: 'Sci-Fi Pet Bot',
      icon: <Zap className="w-5 h-5" />,
      description: 'Futuristic with glowing accents',
      preview: 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600'
    },
    {
      value: 'nature-spirit',
      name: 'Nature Spirit',
      icon: <Leaf className="w-5 h-5" />,
      description: 'Earthy greens and natural tones',
      preview: 'bg-gradient-to-r from-green-200 via-yellow-100 to-blue-200'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 pastel-cute:bg-gradient-to-br pastel-cute:from-pink-50 pastel-cute:to-blue-50 sci-fi-pet:bg-gradient-to-br sci-fi-pet:from-gray-900 sci-fi-pet:to-blue-950 nature-spirit:bg-gradient-to-br nature-spirit:from-green-50 nature-spirit:to-yellow-50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 pastel-cute:border-pink-200 sci-fi-pet:border-blue-700 nature-spirit:border-green-200 p-6 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <Palette className="w-6 h-6 text-purple-500 pastel-cute:text-pink-500 sci-fi-pet:text-blue-400 nature-spirit:text-green-600" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 pastel-cute:text-pink-800 sci-fi-pet:text-blue-100 nature-spirit:text-green-800">Theme Selection</h3>
      </div>
      
      <div className="space-y-4">
        {themes.map((themeOption) => (
          <button
            key={themeOption.value}
            onClick={() => theme.setThemeDirectly(themeOption.value)}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left group hover:scale-[1.02] ${
              theme.theme === themeOption.value
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 pastel-cute:border-pink-400 pastel-cute:bg-pink-100 sci-fi-pet:border-blue-400 sci-fi-pet:bg-blue-900/30 nature-spirit:border-green-400 nature-spirit:bg-green-100 shadow-lg'
                : 'border-gray-200 dark:border-gray-600 pastel-cute:border-pink-200 sci-fi-pet:border-gray-700 nature-spirit:border-green-200 hover:border-purple-300 dark:hover:border-purple-400 pastel-cute:hover:border-pink-300 sci-fi-pet:hover:border-blue-500 nature-spirit:hover:border-green-300'
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Theme Preview */}
              <div className={`w-12 h-12 rounded-lg ${themeOption.preview} border border-gray-200 dark:border-gray-600 shadow-sm flex items-center justify-center text-white`}>
                {themeOption.icon}
              </div>
              
              {/* Theme Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 pastel-cute:text-pink-800 sci-fi-pet:text-blue-100 nature-spirit:text-green-800">
                    {themeOption.name}
                  </h4>
                  {theme.theme === themeOption.value && (
                    <div className="w-2 h-2 bg-purple-500 pastel-cute:bg-pink-500 sci-fi-pet:bg-blue-400 nature-spirit:bg-green-500 rounded-full animate-pulse" />
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 pastel-cute:text-pink-600 sci-fi-pet:text-blue-300 nature-spirit:text-green-600">
                  {themeOption.description}
                </p>
              </div>
              
              {/* Selection Indicator */}
              <div className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                theme.theme === themeOption.value
                  ? 'border-purple-500 bg-purple-500 pastel-cute:border-pink-500 pastel-cute:bg-pink-500 sci-fi-pet:border-blue-400 sci-fi-pet:bg-blue-400 nature-spirit:border-green-500 nature-spirit:bg-green-500'
                  : 'border-gray-300 dark:border-gray-600 pastel-cute:border-pink-300 sci-fi-pet:border-gray-600 nature-spirit:border-green-300 group-hover:border-purple-400'
              }`}>
                {theme.theme === themeOption.value && (
                  <div className="w-full h-full rounded-full bg-white scale-50" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {/* Theme Features */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 pastel-cute:bg-gradient-to-r pastel-cute:from-pink-50 pastel-cute:to-blue-50 sci-fi-pet:bg-gradient-to-r sci-fi-pet:from-gray-800 sci-fi-pet:to-blue-900 nature-spirit:bg-gradient-to-r nature-spirit:from-green-50 nature-spirit:to-yellow-50 rounded-lg border border-gray-200 dark:border-gray-600 pastel-cute:border-pink-200 sci-fi-pet:border-blue-700 nature-spirit:border-green-200 transition-all duration-300">
        <h4 className="font-medium text-gray-800 dark:text-gray-200 pastel-cute:text-pink-800 sci-fi-pet:text-blue-100 nature-spirit:text-green-800 mb-2">
          Current Theme: {theme.getThemeDisplayName(theme.theme)}
        </h4>
        <div className="text-sm text-gray-600 dark:text-gray-400 pastel-cute:text-pink-600 sci-fi-pet:text-blue-300 nature-spirit:text-green-600">
          {theme.theme === 'light' && "Clean and professional interface with bright backgrounds"}
          {theme.theme === 'dark' && "Reduced eye strain with dark backgrounds and light text"}
          {theme.theme === 'pastel-cute' && "Soft, playful colors with gentle gradients and rounded elements"}
          {theme.theme === 'sci-fi-pet' && "Futuristic design with glowing accents and metallic textures"}
          {theme.theme === 'nature-spirit' && "Organic, earthy tones inspired by nature and wildlife"}
        </div>
      </div>
    </div>
  );
};