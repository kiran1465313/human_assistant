import React from 'react';
import { useTheme } from '../hooks/useTheme';

export const ThemeObjects: React.FC = () => {
  const { theme } = useTheme();

  // Don't show objects for light and dark themes
  if (theme === 'light' || theme === 'dark') {
    return null;
  }

  return (
    <div className="theme-objects">
      {/* Pastel Cute Theme Objects */}
      {theme === 'pastel-cute' && (
        <>
          <div className="theme-object heart-1">💖</div>
          <div className="theme-object heart-2">💕</div>
          <div className="theme-object star-1">⭐</div>
          <div className="theme-object star-2">✨</div>
          <div className="theme-object cloud-1">☁️</div>
          <div className="theme-object" style={{ top: '45%', left: '3%', animation: 'float 3.5s ease-in-out infinite 0.5s' }}>🌸</div>
          <div className="theme-object" style={{ bottom: '15%', right: '5%', animation: 'wiggle 2.5s ease-in-out infinite' }}>🦄</div>
          <div className="theme-object" style={{ top: '75%', left: '85%', animation: 'bounce-gentle 3s ease-in-out infinite 1.5s' }}>🌈</div>
        </>
      )}

      {/* Sci-Fi Pet Theme Objects */}
      {theme === 'sci-fi-pet' && (
        <>
          <div className="theme-object circuit-1">⚡</div>
          <div className="theme-object circuit-2">🔋</div>
          <div className="theme-object orb-1">🔮</div>
          <div className="theme-object orb-2">💎</div>
          <div className="theme-object satellite-1">🛸</div>
          <div className="theme-object" style={{ top: '55%', left: '8%', animation: 'glow 2.5s ease-in-out infinite alternate 0.8s' }}>🤖</div>
          <div className="theme-object" style={{ bottom: '10%', right: '15%', animation: 'pulse-slow 3.5s ease-in-out infinite' }}>🌌</div>
          <div className="theme-object" style={{ top: '35%', left: '92%', animation: 'spin-slow 6s linear infinite' }}>⚙️</div>
          <div className="theme-object" style={{ top: '80%', left: '75%', animation: 'float 4s ease-in-out infinite 2s' }}>🚀</div>
        </>
      )}

      {/* Nature Spirit Theme Objects */}
      {theme === 'nature-spirit' && (
        <>
          <div className="theme-object leaf-1">🍃</div>
          <div className="theme-object leaf-2">🌿</div>
          <div className="theme-object butterfly-1">🦋</div>
          <div className="theme-object flower-1">🌺</div>
          <div className="theme-object bird-1">🐦</div>
          <div className="theme-object" style={{ top: '65%', right: '3%', animation: 'sway 4.5s ease-in-out infinite 1s' }}>🌻</div>
          <div className="theme-object" style={{ bottom: '35%', left: '85%', animation: 'flutter 3s ease-in-out infinite 0.7s' }}>🐝</div>
          <div className="theme-object" style={{ top: '15%', left: '60%', animation: 'bounce-gentle 3.5s ease-in-out infinite 2s' }}>🌳</div>
          <div className="theme-object" style={{ top: '85%', left: '20%', animation: 'float-slow 5s ease-in-out infinite' }}>🍄</div>
          <div className="theme-object" style={{ top: '40%', right: '40%', animation: 'flutter 2.5s ease-in-out infinite 1.2s' }}>🌸</div>
        </>
      )}
    </div>
  );
};