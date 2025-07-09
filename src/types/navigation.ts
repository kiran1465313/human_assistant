export type Screen = 'welcome' | 'chat' | 'settings' | 'about';

export interface NavigationState {
  currentScreen: Screen;
  history: Screen[];
}