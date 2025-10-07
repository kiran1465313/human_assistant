import React from 'react';
import { Palette, Sun, Moon, Heart, Zap, Leaf, Cpu } from 'lucide-react';
import { Theme, useTheme } from '../hooks/useTheme';

interface ThemeSelectorProps {
  theme: ReturnType<typeof useTheme>;
  onSecretClick?: () => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ theme, onSecretClick }) => {
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
    },
    {
      value: 'electronics',
      name: 'Electronics Lab',
      icon: <Cpu className="w-5 h-5" />,
      description: 'Circuit board aesthetics with tech vibes',
      preview: 'bg-gradient-to-r from-orange-500 via-yellow-400 to-green-500'
    }
  ];

  return (
    <div className={`rounded-xl shadow-sm p-6 transition-all duration-300 ${
      theme.theme === 'pastel-cute' ? 'bg-gradient-to-br from-pink-50 to-blue-50 border border-pink-200' :
      theme.theme === 'sci-fi-pet' ? 'bg-gradient-to-br from-gray-900 to-blue-950 border border-blue-700' :
      theme.theme === 'nature-spirit' ? 'bg-gradient-to-br from-green-50 to-yellow-50 border border-green-200' :
      theme.theme === 'electronics' ? 'bg-gradient-to-br from-gray-900 to-orange-950 border border-orange-600' :
      'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'
    }`}>
      <div className="flex items-center gap-3 mb-6">
        <Palette className={`w-6 h-6 ${
          theme.theme === 'pastel-cute' ? 'text-pink-500' :
          theme.theme === 'sci-fi-pet' ? 'text-blue-400' :
          theme.theme === 'nature-spirit' ? 'text-green-600' :
          theme.theme === 'electronics' ? 'text-orange-500' :
          'text-purple-500'
        }`} />
        <h3
          onClick={onSecretClick}
          className={`text-lg font-semibold select-none ${
          theme.theme === 'pastel-cute' ? 'text-pink-800' :
          theme.theme === 'sci-fi-pet' ? 'text-blue-100' :
          theme.theme === 'nature-spirit' ? 'text-green-800' :
          theme.theme === 'electronics' ? 'text-orange-100' :
          'text-gray-800 dark:text-gray-100'
        }`}>Theme Selection</h3>
      </div>
      
      <div className="space-y-4">
        {themes.map((themeOption) => (
          <button
            key={themeOption.value}
            onClick={() => theme.setThemeDirectly(themeOption.value)}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left group hover:scale-[1.02] ${
              theme.theme === themeOption.value
                ? `shadow-lg ${
                    theme.theme === 'pastel-cute' ? 'border-pink-400 bg-pink-100' :
                    theme.theme === 'sci-fi-pet' ? 'border-blue-400 bg-blue-900/30' :
                    theme.theme === 'nature-spirit' ? 'border-green-400 bg-green-100' :
                    theme.theme === 'electronics' ? 'border-orange-400 bg-orange-900/30' :
                    'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  }`
                : `${
                    theme.theme === 'pastel-cute' ? 'border-pink-200 hover:border-pink-300' :
                    theme.theme === 'sci-fi-pet' ? 'border-gray-700 hover:border-blue-500' :
                    theme.theme === 'nature-spirit' ? 'border-green-200 hover:border-green-300' :
                    theme.theme === 'electronics' ? 'border-gray-700 hover:border-orange-500' :
                    'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-400'
                  }`
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
                  <h4 className={`font-semibold ${
                    theme.theme === 'pastel-cute' ? 'text-pink-800' :
                    theme.theme === 'sci-fi-pet' ? 'text-blue-100' :
                    theme.theme === 'nature-spirit' ? 'text-green-800' :
                    theme.theme === 'electronics' ? 'text-orange-100' :
                    'text-gray-800 dark:text-gray-100'
                  }`}>
                    {themeOption.name}
                  </h4>
                  {theme.theme === themeOption.value && (
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      theme.theme === 'pastel-cute' ? 'bg-pink-500' :
                      theme.theme === 'sci-fi-pet' ? 'bg-blue-400' :
                      theme.theme === 'nature-spirit' ? 'bg-green-500' :
                      theme.theme === 'electronics' ? 'bg-orange-500' :
                      'bg-purple-500'
                    }`} />
                  )}
                </div>
                <p className={`text-sm ${
                  theme.theme === 'pastel-cute' ? 'text-pink-600' :
                  theme.theme === 'sci-fi-pet' ? 'text-blue-300' :
                  theme.theme === 'nature-spirit' ? 'text-green-600' :
                  theme.theme === 'electronics' ? 'text-orange-300' :
                  'text-gray-600 dark:text-gray-400'
                }`}>
                  {themeOption.description}
                </p>
              </div>
              
              {/* Selection Indicator */}
              <div className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                theme.theme === themeOption.value
                  ? `${
                      theme.theme === 'pastel-cute' ? 'border-pink-500 bg-pink-500' :
                      theme.theme === 'sci-fi-pet' ? 'border-blue-400 bg-blue-400' :
                      theme.theme === 'nature-spirit' ? 'border-green-500 bg-green-500' :
                      theme.theme === 'electronics' ? 'border-orange-500 bg-orange-500' :
                      'border-purple-500 bg-purple-500'
                    }`
                  : `${
                      theme.theme === 'pastel-cute' ? 'border-pink-300' :
                      theme.theme === 'sci-fi-pet' ? 'border-gray-600' :
                      theme.theme === 'nature-spirit' ? 'border-green-300' :
                      theme.theme === 'electronics' ? 'border-gray-600' :
                      'border-gray-300 dark:border-gray-600'
                    } group-hover:border-purple-400`
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
      <div className={`mt-6 p-4 rounded-lg transition-all duration-300 ${
        theme.theme === 'pastel-cute' ? 'bg-gradient-to-r from-pink-50 to-blue-50 border border-pink-200' :
        theme.theme === 'sci-fi-pet' ? 'bg-gradient-to-r from-gray-800 to-blue-900 border border-blue-700' :
        theme.theme === 'nature-spirit' ? 'bg-gradient-to-r from-green-50 to-yellow-50 border border-green-200' :
        theme.theme === 'electronics' ? 'bg-gradient-to-r from-gray-800 to-orange-900 border border-orange-600' :
        'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
      }`}>
        <h4 className={`font-medium mb-2 ${
          theme.theme === 'pastel-cute' ? 'text-pink-800' :
          theme.theme === 'sci-fi-pet' ? 'text-blue-100' :
          theme.theme === 'nature-spirit' ? 'text-green-800' :
          theme.theme === 'electronics' ? 'text-orange-100' :
          'text-gray-800 dark:text-gray-200'
        }`}>
          Current Theme: {theme.getThemeDisplayName(theme.theme)}
        </h4>
        <div className={`text-sm ${
          theme.theme === 'pastel-cute' ? 'text-pink-600' :
          theme.theme === 'sci-fi-pet' ? 'text-blue-300' :
          theme.theme === 'nature-spirit' ? 'text-green-600' :
          theme.theme === 'electronics' ? 'text-orange-300' :
          'text-gray-600 dark:text-gray-400'
        }`}>
          {theme.theme === 'light' && "Clean and professional interface with bright backgrounds"}
          {theme.theme === 'dark' && "Reduced eye strain with dark backgrounds and light text"}
          {theme.theme === 'pastel-cute' && "Soft, playful colors with gentle gradients and rounded elements"}
          {theme.theme === 'sci-fi-pet' && "Futuristic design with glowing accents and metallic textures"}
          {theme.theme === 'nature-spirit' && "Organic, earthy tones inspired by nature and wildlife"}
          {theme.theme === 'electronics' && "Circuit board inspired design with warm tech colors and electrical vibes"}
        </div>
      </div>
    </div>
  );
};