import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark' | 'pastel-cute' | 'sci-fi-pet' | 'nature-spirit';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    // Add transition class for smooth theme switching
    body.classList.add('theme-transitioning');
    
    // Remove all theme classes
    root.classList.remove('dark', 'pastel-cute', 'sci-fi-pet', 'nature-spirit');
    
    // Add current theme class
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'pastel-cute') {
      root.classList.add('pastel-cute');
    } else if (theme === 'sci-fi-pet') {
      root.classList.add('sci-fi-pet');
    } else if (theme === 'nature-spirit') {
      root.classList.add('nature-spirit');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Remove transition class after a short delay
    setTimeout(() => {
      body.classList.remove('theme-transitioning');
    }, 100);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't manually set a preference
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      switch (prev) {
        case 'light': return 'dark';
        case 'dark': return 'pastel-cute';
        case 'pastel-cute': return 'sci-fi-pet';
        case 'sci-fi-pet': return 'nature-spirit';
        case 'nature-spirit': return 'light';
        default: return 'light';
      }
    });
  }, []);

  const setThemeDirectly = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
  }, []);

  const setLightTheme = useCallback(() => setTheme('light'), []);
  const setDarkTheme = useCallback(() => setTheme('dark'), []);

  const getThemeDisplayName = (themeType: Theme) => {
    switch (themeType) {
      case 'light': return 'Light';
      case 'dark': return 'Dark';
      case 'pastel-cute': return 'Pastel Cute';
      case 'sci-fi-pet': return 'Sci-Fi Pet Bot';
      case 'nature-spirit': return 'Nature Spirit';
      default: return 'Light';
    }
  };

  return {
    theme,
    isDark: theme === 'dark',
    isPastelCute: theme === 'pastel-cute',
    isSciFiPet: theme === 'sci-fi-pet',
    isNatureSpirit: theme === 'nature-spirit',
    toggleTheme,
    setThemeDirectly,
    setLightTheme,
    setDarkTheme,
    getThemeDisplayName
  };
};