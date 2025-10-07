import { Theme } from '../hooks/useTheme';

export const getThemeStyles = (theme: Theme) => {
  const isDark = theme === 'dark' || theme === 'sci-fi-pet' || theme === 'electronics';

  return {
    // Background colors
    cardBg: isDark
      ? theme === 'sci-fi-pet'
        ? 'bg-gray-900/80 border-blue-700/50'
        : theme === 'electronics'
        ? 'bg-gray-900/80 border-orange-600/50'
        : 'bg-gray-800/80 border-gray-700'
      : theme === 'pastel-cute'
      ? 'bg-pink-50/80 border-pink-200'
      : theme === 'nature-spirit'
      ? 'bg-green-50/80 border-green-200'
      : 'bg-white/80 border-gray-200',

    // Text colors
    primaryText: isDark
      ? theme === 'sci-fi-pet'
        ? 'text-blue-100'
        : theme === 'electronics'
        ? 'text-orange-100'
        : 'text-gray-100'
      : theme === 'pastel-cute'
      ? 'text-pink-800'
      : theme === 'nature-spirit'
      ? 'text-green-800'
      : 'text-gray-800',

    secondaryText: isDark
      ? theme === 'sci-fi-pet'
        ? 'text-blue-300'
        : theme === 'electronics'
        ? 'text-orange-300'
        : 'text-gray-300'
      : theme === 'pastel-cute'
      ? 'text-pink-600'
      : theme === 'nature-spirit'
      ? 'text-green-600'
      : 'text-gray-600',

    mutedText: isDark
      ? theme === 'sci-fi-pet'
        ? 'text-blue-400'
        : theme === 'electronics'
        ? 'text-orange-400'
        : 'text-gray-400'
      : theme === 'pastel-cute'
      ? 'text-pink-500'
      : theme === 'nature-spirit'
      ? 'text-green-500'
      : 'text-gray-500',

    // Button styles
    buttonBg: isDark
      ? theme === 'sci-fi-pet'
        ? 'bg-gray-800 hover:bg-gray-700 border-gray-700'
        : theme === 'electronics'
        ? 'bg-gray-800 hover:bg-gray-700 border-gray-700'
        : 'bg-gray-800 hover:bg-gray-700 border-gray-700'
      : theme === 'pastel-cute'
      ? 'bg-white hover:bg-pink-50 border-pink-200'
      : theme === 'nature-spirit'
      ? 'bg-white hover:bg-green-50 border-green-200'
      : 'bg-white hover:bg-gray-50 border-gray-200',

    // Accent colors
    accent: theme === 'pastel-cute'
      ? 'text-pink-500'
      : theme === 'sci-fi-pet'
      ? 'text-blue-400'
      : theme === 'nature-spirit'
      ? 'text-green-500'
      : theme === 'electronics'
      ? 'text-orange-500'
      : 'text-purple-500',

    accentBg: theme === 'pastel-cute'
      ? 'bg-pink-500'
      : theme === 'sci-fi-pet'
      ? 'bg-blue-500'
      : theme === 'nature-spirit'
      ? 'bg-green-500'
      : theme === 'electronics'
      ? 'bg-orange-500'
      : 'bg-purple-500',

    // Input styles
    inputBg: isDark
      ? 'bg-gray-900/50 border-gray-600'
      : theme === 'pastel-cute'
      ? 'bg-white border-pink-200'
      : theme === 'nature-spirit'
      ? 'bg-white border-green-200'
      : 'bg-white border-gray-200',

    // Hover effects
    hoverBorder: theme === 'pastel-cute'
      ? 'hover:border-pink-300'
      : theme === 'sci-fi-pet'
      ? 'hover:border-blue-500'
      : theme === 'nature-spirit'
      ? 'hover:border-green-300'
      : theme === 'electronics'
      ? 'hover:border-orange-500'
      : 'hover:border-purple-300',

    // Glow effects
    glow: theme === 'pastel-cute'
      ? 'drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]'
      : theme === 'sci-fi-pet'
      ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]'
      : theme === 'nature-spirit'
      ? 'drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]'
      : theme === 'electronics'
      ? 'drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]'
      : 'drop-shadow-[0_0_8px_rgba(147,51,234,0.6)]',
  };
};
