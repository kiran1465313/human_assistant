/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float 3s ease-in-out infinite 1s',
        'float-slow': 'float 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'flutter': 'flutter 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-in-left': 'slide-in-left 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        sway: {
          '0%, 100%': { transform: 'translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateX(5px) rotate(1deg)' },
          '75%': { transform: 'translateX(-5px) rotate(-1deg)' },
        },
        flutter: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-3px) rotate(1deg)' },
          '50%': { transform: 'translateY(-6px) rotate(0deg)' },
          '75%': { transform: 'translateY(-3px) rotate(-1deg)' },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    // Theme-specific classes
    'pastel-cute',
    'sci-fi-pet', 
    'nature-spirit',
    // Background gradients
    'bg-gradient-to-br',
    'from-pink-50',
    'via-blue-50', 
    'to-green-50',
    'from-gray-900',
    'via-blue-950',
    'to-purple-950',
    'from-green-50',
    'via-yellow-50',
    'to-blue-50',
    // Text colors
    'text-pink-800',
    'text-pink-600',
    'text-pink-500',
    'text-blue-100',
    'text-blue-200',
    'text-blue-300',
    'text-blue-400',
    'text-green-800',
    'text-green-600',
    'text-green-500',
    // Border colors
    'border-pink-200',
    'border-pink-300',
    'border-blue-700',
    'border-blue-500',
    'border-green-200',
    'border-green-300',
    // Background colors
    'bg-pink-50',
    'bg-pink-100',
    'bg-pink-200',
    'bg-blue-50',
    'bg-blue-900',
    'bg-blue-950',
    'bg-green-50',
    'bg-green-100',
    'bg-yellow-50',
  ],
};