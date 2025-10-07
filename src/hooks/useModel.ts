import { useState, useEffect, useCallback } from 'react';
import { AIModel } from '../components/ModelSelector';

export const useModel = () => {
  const [selectedModel, setSelectedModel] = useState<AIModel>(() => {
    const savedModel = localStorage.getItem('selected-ai-model') as AIModel;
    return savedModel || 'gemini-1.5-flash';
  });

  useEffect(() => {
    localStorage.setItem('selected-ai-model', selectedModel);
  }, [selectedModel]);

  const changeModel = useCallback((model: AIModel) => {
    setSelectedModel(model);
  }, []);

  const getModelDisplayName = (model: AIModel): string => {
    const modelNames: Record<AIModel, string> = {
      'gemini-1.5-flash': 'Gemini 1.5 Flash',
      'gpt-3.5-turbo': 'GPT-3.5 Turbo',
      'flan-t5-xl': 'FLAN-T5-XL',
      'phi-3-mini': 'Phi-3 Mini 128K',
      'zephyr-7b': 'Zephyr 7B Beta',
      't5-base': 'T5 Base',
      't5-small': 'T5 Small'
    };
    return modelNames[model] || model;
  };

  return {
    selectedModel,
    changeModel,
    getModelDisplayName
  };
};
