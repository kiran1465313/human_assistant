import React from 'react';
import { useTheme } from '../hooks/useTheme';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect, isOpen, onClose }) => {
  const theme = useTheme();
  
  const emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
    '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
    '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
    '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
    '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
    '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
    '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯',
    '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐',
    '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈',
    '👍', '👎', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙',
    '👈', '👉', '👆', '🖕', '👇', '☝️', '👋', '🤚', '🖐️', '✋',
    '🖖', '👏', '🙌', '🤝', '🙏', '✍️', '💪', '🦾', '🦿', '🦵',
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
    '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️',
    '✨', '🌟', '💫', '⭐', '🌠', '☄️', '💥', '🔥', '🌈', '☀️',
    '🌤️', '⛅', '🌦️', '🌧️', '⛈️', '🌩️', '🌨️', '❄️', '☃️', '⛄'
  ];

  if (!isOpen) return null;

  const getPickerBg = () => {
    switch (theme.theme) {
      case 'pastel-cute': 
        return 'bg-white/80 backdrop-blur-lg border-pink-200/50 shadow-xl shadow-pink-500/20';
      case 'sci-fi-pet': 
        return 'bg-gray-900/80 backdrop-blur-lg border-blue-400/30 shadow-xl shadow-blue-500/20';
      case 'nature-spirit': 
        return 'bg-white/80 backdrop-blur-lg border-green-200/50 shadow-xl shadow-green-500/20';
      default: 
        return 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-xl';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Emoji Picker */}
      <div className={`absolute bottom-full left-0 mb-2 rounded-2xl p-4 z-50 w-80 max-h-64 overflow-y-auto transition-all duration-300 ${getPickerBg()}`}>
        <div className="grid grid-cols-8 gap-2">
          {emojis.map((emoji, index) => (
            <button
              key={index}
              onClick={() => {
                onEmojiSelect(emoji);
                onClose();
              }}
              className={`w-8 h-8 flex items-center justify-center text-lg rounded-lg transition-all duration-200 hover:scale-110 ${
                theme.theme === 'pastel-cute' ? 'hover:bg-pink-100' :
                theme.theme === 'sci-fi-pet' ? 'hover:bg-blue-900/30' :
                theme.theme === 'nature-spirit' ? 'hover:bg-green-100' :
                'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};