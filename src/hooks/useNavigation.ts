import { useState, useCallback } from 'react';
import { Screen, NavigationState } from '../types/navigation';

export const useNavigation = () => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentScreen: 'welcome',
    history: []
  });

  const navigateTo = useCallback((screen: Screen) => {
    setNavigationState(prev => ({
      currentScreen: screen,
      history: [...prev.history, prev.currentScreen]
    }));
  }, []);

  const goBack = useCallback(() => {
    setNavigationState(prev => {
      if (prev.history.length === 0) return prev;
      
      const newHistory = [...prev.history];
      const previousScreen = newHistory.pop()!;
      
      return {
        currentScreen: previousScreen,
        history: newHistory
      };
    });
  }, []);

  const goHome = useCallback(() => {
    setNavigationState({
      currentScreen: 'welcome',
      history: []
    });
  }, []);

  const canGoBack = navigationState.history.length > 0;

  return {
    currentScreen: navigationState.currentScreen,
    navigateTo,
    goBack,
    goHome,
    canGoBack
  };
};