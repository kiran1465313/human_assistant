import React, { useState, useEffect } from 'react';
import { Key, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const APISettings: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isValidKey, setIsValidKey] = useState<boolean | null>(null);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    // Load saved API key from localStorage
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsValidKey(true);
    }
  }, []);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      // Set environment variable for the session
      (window as any).VITE_GEMINI_API_KEY = apiKey.trim();
      setIsValidKey(true);
      
      // Reload the page to reinitialize the Gemini service
      window.location.reload();
    }
  };

  const handleRemoveKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setIsValidKey(null);
    delete (window as any).VITE_GEMINI_API_KEY;
    
    // Reload the page to reinitialize the service
    window.location.reload();
  };

  const getStatusIcon = () => {
    if (isValidKey === true) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else if (isValidKey === false) {
      return <XCircle className="w-5 h-5 text-red-500" />;
    }
    return <AlertCircle className="w-5 h-5 text-yellow-500" />;
  };

  const getStatusText = () => {
    if (isValidKey === true) {
      return "API key configured - Advanced AI responses enabled! 🚀";
    } else if (isValidKey === false) {
      return "Invalid API key - Please check and try again";
    }
    return "No API key configured - Using basic responses";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Key className="w-6 h-6 text-indigo-500" />
        <h3 className="text-lg font-semibold text-gray-800">AI API Configuration</h3>
      </div>
      
      <div className="space-y-4">
        {/* Status */}
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          {getStatusIcon()}
          <span className="text-sm text-gray-700">{getStatusText()}</span>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">🚀 Enable Advanced AI Responses</h4>
          <p className="text-sm text-blue-700 mb-3">
            To unlock unlimited AI capabilities, get a free Google Gemini API key:
          </p>
          <ol className="text-sm text-blue-700 space-y-1 ml-4 list-decimal">
            <li>Visit <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">Google AI Studio</a></li>
            <li>Sign in with your Google account</li>
            <li>Click "Create API Key"</li>
            <li>Copy the key and paste it below</li>
          </ol>
        </div>

        {/* API Key Input */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Google Gemini API Key
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API key..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showKey ? "Hide" : "Show"}
              </button>
            </div>
            <button
              onClick={handleSaveKey}
              disabled={!apiKey.trim()}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 text-white rounded-lg transition-colors"
            >
              Save
            </button>
          </div>
        </div>

        {/* Remove Key Button */}
        {isValidKey && (
          <button
            onClick={handleRemoveKey}
            className="w-full p-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg border border-red-200 transition-colors"
          >
            Remove API Key
          </button>
        )}

        {/* Features */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100 p-4">
          <h4 className="font-medium text-purple-800 mb-2">✨ With API Key Enabled:</h4>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Unlimited questions and topics</li>
            <li>• Real-time knowledge and information</li>
            <li>• Advanced programming help</li>
            <li>• Creative writing and brainstorming</li>
            <li>• Complex problem solving</li>
            <li>• Multi-language support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};