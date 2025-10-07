import React from 'react';
import { Brain, Sparkles, Zap, Cpu, Globe } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export type AIModel =
  | 'gemini-1.5-flash'
  | 'gpt-3.5-turbo'
  | 'flan-t5-xl'
  | 'phi-3-mini'
  | 'zephyr-7b'
  | 't5-base'
  | 't5-small';

interface ModelOption {
  value: AIModel;
  name: string;
  provider: string;
  description: string;
  badge?: string;
  color: string;
  icon: React.ReactNode;
  specs: string;
}

interface ModelSelectorProps {
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  const { theme } = useTheme();

  const models: ModelOption[] = [
    {
      value: 'gemini-1.5-flash',
      name: 'Gemini 1.5 Flash',
      provider: 'Google AI',
      description: 'Fast and efficient multimodal AI with advanced reasoning capabilities',
      badge: 'Active',
      color: 'from-blue-500 via-purple-500 to-blue-600',
      icon: <Sparkles className="w-7 h-7 text-white" />,
      specs: 'Multimodal • Fast • Context: 1M tokens'
    },
    {
      value: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      provider: 'OpenAI',
      description: 'Versatile conversational AI optimized for chat with broad knowledge base',
      color: 'from-green-500 via-emerald-500 to-teal-600',
      icon: <Cpu className="w-7 h-7 text-white" />,
      specs: 'Chat Optimized • Context: 16K tokens'
    },
    {
      value: 'flan-t5-xl',
      name: 'FLAN-T5-XL',
      provider: 'Google Research',
      description: 'Instruction-tuned text-to-text model for diverse NLP tasks',
      color: 'from-orange-500 via-red-500 to-pink-600',
      icon: <Brain className="w-7 h-7 text-white" />,
      specs: '3B params • Instruction-tuned • Multi-task'
    },
    {
      value: 'phi-3-mini',
      name: 'Phi-3 Mini 128K',
      provider: 'Microsoft',
      description: 'Compact yet powerful language model with extended context window',
      color: 'from-blue-400 via-cyan-500 to-sky-600',
      icon: <Zap className="w-7 h-7 text-white" />,
      specs: '3.8B params • Context: 128K tokens • Efficient'
    },
    {
      value: 'zephyr-7b',
      name: 'Zephyr 7B Beta',
      provider: 'HuggingFace H4',
      description: 'Fine-tuned for helpful, harmless, and honest conversations',
      color: 'from-purple-500 via-fuchsia-500 to-pink-600',
      icon: <Globe className="w-7 h-7 text-white" />,
      specs: '7B params • Alignment-tuned • Open-source'
    },
    {
      value: 't5-base',
      name: 'T5 Base',
      provider: 'Google',
      description: 'Balanced text-to-text transfer transformer for general tasks',
      color: 'from-yellow-500 via-amber-500 to-orange-600',
      icon: <Brain className="w-7 h-7 text-white" />,
      specs: '220M params • Text-to-text • Versatile'
    },
    {
      value: 't5-small',
      name: 'T5 Small',
      provider: 'Google',
      description: 'Lightweight and efficient text processing for resource-constrained environments',
      color: 'from-teal-500 via-green-500 to-emerald-600',
      icon: <Cpu className="w-7 h-7 text-white" />,
      specs: '60M params • Lightweight • Fast inference'
    }
  ];

  return (
    <div className={`rounded-xl shadow-lg p-6 transition-all duration-300 ${
      theme === 'pastel-cute' ? 'bg-gradient-to-br from-pink-50 to-blue-50 border-2 border-pink-200' :
      theme === 'sci-fi-pet' ? 'bg-gradient-to-br from-gray-900 to-blue-950 border-2 border-blue-700 shadow-blue-500/20' :
      theme === 'nature-spirit' ? 'bg-gradient-to-br from-green-50 to-yellow-50 border-2 border-green-200' :
      theme === 'electronics' ? 'bg-gradient-to-br from-gray-900 to-orange-950 border-2 border-orange-600 shadow-orange-500/20' :
      'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'
    }`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${
          theme === 'pastel-cute' ? 'bg-pink-100' :
          theme === 'sci-fi-pet' ? 'bg-blue-900/50' :
          theme === 'nature-spirit' ? 'bg-green-100' :
          theme === 'electronics' ? 'bg-orange-900/50' :
          'bg-purple-100 dark:bg-purple-900/30'
        }`}>
          <Brain className={`w-6 h-6 ${
            theme === 'pastel-cute' ? 'text-pink-600' :
            theme === 'sci-fi-pet' ? 'text-blue-400' :
            theme === 'nature-spirit' ? 'text-green-600' :
            theme === 'electronics' ? 'text-orange-500' :
            'text-purple-600 dark:text-purple-400'
          }`} />
        </div>
        <div>
          <h3 className={`text-lg font-bold ${
            theme === 'pastel-cute' ? 'text-pink-800' :
            theme === 'sci-fi-pet' ? 'text-blue-100' :
            theme === 'nature-spirit' ? 'text-green-800' :
            theme === 'electronics' ? 'text-orange-100' :
            'text-gray-800 dark:text-gray-100'
          }`}>AI Model Selection</h3>
          <p className={`text-sm ${
            theme === 'pastel-cute' ? 'text-pink-600' :
            theme === 'sci-fi-pet' ? 'text-blue-300' :
            theme === 'nature-spirit' ? 'text-green-600' :
            theme === 'electronics' ? 'text-orange-300' :
            'text-gray-600 dark:text-gray-400'
          }`}>Choose your preferred AI engine</p>
        </div>
      </div>

      <div className="space-y-3">
        {models.map((model) => (
          <button
            key={model.value}
            onClick={() => onModelChange(model.value)}
            disabled={model.value !== 'gemini-1.5-flash'}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left group relative overflow-hidden ${
              selectedModel === model.value
                ? `shadow-xl transform scale-[1.02] ${
                    theme === 'pastel-cute' ? 'border-pink-400 bg-pink-100/80' :
                    theme === 'sci-fi-pet' ? 'border-blue-400 bg-blue-900/40 shadow-blue-500/30' :
                    theme === 'nature-spirit' ? 'border-green-400 bg-green-100/80' :
                    theme === 'electronics' ? 'border-orange-400 bg-orange-900/40 shadow-orange-500/30' :
                    'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                  }`
                : `${
                    theme === 'pastel-cute' ? 'border-pink-200 hover:border-pink-300 hover:bg-pink-50/50' :
                    theme === 'sci-fi-pet' ? 'border-gray-700 hover:border-blue-500 hover:bg-blue-900/20' :
                    theme === 'nature-spirit' ? 'border-green-200 hover:border-green-300 hover:bg-green-50/50' :
                    theme === 'electronics' ? 'border-gray-700 hover:border-orange-500 hover:bg-orange-900/20' :
                    'border-gray-200 dark:border-gray-600 hover:border-purple-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`
            } ${model.value !== 'gemini-1.5-flash' ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.01] cursor-pointer hover:shadow-lg'}`}
          >
            {selectedModel === model.value && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            )}

            <div className="flex items-start gap-4 relative z-10">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${model.color} shadow-lg flex items-center justify-center relative overflow-hidden transition-all duration-300 flex-shrink-0 ${
                selectedModel === model.value ? 'scale-110 shadow-2xl' : ''
              }`}>
                <div className="relative z-10">
                  {model.icon}
                </div>
                {selectedModel === model.value && (
                  <>
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-50" />
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className={`font-bold text-base truncate ${
                    theme === 'pastel-cute' ? 'text-pink-800' :
                    theme === 'sci-fi-pet' ? 'text-blue-100' :
                    theme === 'nature-spirit' ? 'text-green-800' :
                    theme === 'electronics' ? 'text-orange-100' :
                    'text-gray-800 dark:text-gray-100'
                  }`}>
                    {model.name}
                  </h4>
                  {model.badge && (
                    <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full animate-pulse ${
                      theme === 'pastel-cute' ? 'bg-pink-500 text-white' :
                      theme === 'sci-fi-pet' ? 'bg-blue-500 text-white' :
                      theme === 'nature-spirit' ? 'bg-green-500 text-white' :
                      theme === 'electronics' ? 'bg-orange-500 text-white' :
                      'bg-purple-500 text-white'
                    }`}>
                      {model.badge}
                    </span>
                  )}
                </div>

                <p className={`text-xs font-medium mb-2 ${
                  theme === 'pastel-cute' ? 'text-pink-500' :
                  theme === 'sci-fi-pet' ? 'text-blue-300/80' :
                  theme === 'nature-spirit' ? 'text-green-500' :
                  theme === 'electronics' ? 'text-orange-300/80' :
                  'text-gray-500 dark:text-gray-400'
                }`}>
                  {model.provider}
                </p>

                <p className={`text-sm mb-2 leading-snug ${
                  theme === 'pastel-cute' ? 'text-pink-700' :
                  theme === 'sci-fi-pet' ? 'text-blue-200' :
                  theme === 'nature-spirit' ? 'text-green-700' :
                  theme === 'electronics' ? 'text-orange-200' :
                  'text-gray-600 dark:text-gray-300'
                }`}>
                  {model.description}
                </p>

                <div className={`inline-block px-2 py-1 rounded text-xs font-mono ${
                  theme === 'pastel-cute' ? 'bg-pink-200/50 text-pink-800' :
                  theme === 'sci-fi-pet' ? 'bg-blue-500/20 text-blue-200' :
                  theme === 'nature-spirit' ? 'bg-green-200/50 text-green-800' :
                  theme === 'electronics' ? 'bg-orange-500/20 text-orange-200' :
                  'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}>
                  {model.specs}
                </div>
              </div>

              <div className={`w-7 h-7 rounded-full border-2 transition-all duration-200 flex-shrink-0 flex items-center justify-center ${
                selectedModel === model.value
                  ? `${
                      theme === 'pastel-cute' ? 'border-pink-500 bg-pink-500' :
                      theme === 'sci-fi-pet' ? 'border-blue-400 bg-blue-400' :
                      theme === 'nature-spirit' ? 'border-green-500 bg-green-500' :
                      theme === 'electronics' ? 'border-orange-500 bg-orange-500' :
                      'border-purple-500 bg-purple-500'
                    } shadow-lg`
                  : `${
                      theme === 'pastel-cute' ? 'border-pink-300' :
                      theme === 'sci-fi-pet' ? 'border-gray-600' :
                      theme === 'nature-spirit' ? 'border-green-300' :
                      theme === 'electronics' ? 'border-gray-600' :
                      'border-gray-300 dark:border-gray-600'
                    }`
              }`}>
                {selectedModel === model.value && (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className={`mt-6 p-4 rounded-xl transition-all duration-300 relative overflow-hidden ${
        theme === 'pastel-cute' ? 'bg-gradient-to-r from-pink-100 to-blue-100 border border-pink-300' :
        theme === 'sci-fi-pet' ? 'bg-gradient-to-r from-gray-800 to-blue-900 border border-blue-700' :
        theme === 'nature-spirit' ? 'bg-gradient-to-r from-green-100 to-yellow-100 border border-green-300' :
        theme === 'electronics' ? 'bg-gradient-to-r from-gray-800 to-orange-900 border border-orange-600' :
        'bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600'
      }`}>
        <div className="flex items-start gap-3">
          <Sparkles className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
            theme === 'pastel-cute' ? 'text-pink-600' :
            theme === 'sci-fi-pet' ? 'text-blue-400' :
            theme === 'nature-spirit' ? 'text-green-600' :
            theme === 'electronics' ? 'text-orange-400' :
            'text-purple-600 dark:text-purple-400'
          }`} />
          <p className={`text-sm leading-relaxed ${
            theme === 'pastel-cute' ? 'text-pink-800' :
            theme === 'sci-fi-pet' ? 'text-blue-100' :
            theme === 'nature-spirit' ? 'text-green-800' :
            theme === 'electronics' ? 'text-orange-100' :
            'text-gray-700 dark:text-gray-200'
          }`}>
            <span className="font-bold">Currently Active:</span> Only Gemini 1.5 Flash is functional. Other models are shown as demonstration options for future integration possibilities.
          </p>
        </div>
      </div>
    </div>
  );
};
