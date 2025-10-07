import React, { useState, useEffect } from 'react';
import { Key, CheckCircle, XCircle, AlertCircle, RefreshCw, Eye, EyeOff, Shield, Info } from 'lucide-react';
import { geminiService } from '../services/geminiService';

export const APISettings: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isValidKey, setIsValidKey] = useState<boolean | null>(null);
  const [showKey, setShowKey] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<string>('');
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  useEffect(() => {
    // Load saved API key from localStorage
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      const status = geminiService.getAPIStatus();
      setIsValidKey(status.configured);
    }
  }, []);

  const handleSaveKey = async () => {
    if (!apiKey.trim()) {
      setTestResult('❌ Please enter an API key');
      return;
    }

    console.log('API Key length:', apiKey.length);
    console.log('API Key starts with AIza:', apiKey.startsWith('AIza'));
    
    // More flexible format validation
    if (!apiKey.startsWith('AIza')) {
      setTestResult('❌ Invalid API key format. Google API keys must start with "AIza".');
      setIsValidKey(false);
      return;
    }
    
    if (apiKey.length < 30 || apiKey.length > 50) {
      setTestResult('❌ Invalid API key length. Please check your key and try again.');
      setIsValidKey(false);
      return;
    }

    setIsTestingConnection(true);
    setTestResult('🔄 Testing API connection...');

    try {
      console.log('Updating API key in service...');
      // Update the API key in the service
      const updateSuccess = geminiService.updateAPIKey(apiKey.trim());
      
      if (!updateSuccess) {
        console.log('Failed to update API key in service');
        setTestResult('❌ Failed to configure API key');
        setIsValidKey(false);
        setIsTestingConnection(false);
        return;
      }

      console.log('Testing connection...');
      // Test the connection
      const connectionTest = await geminiService.testConnection();
      console.log('Connection test result:', connectionTest);
      
      if (connectionTest.success) {
        setIsValidKey(true);
        setTestResult(connectionTest.message);
        
        // Show success message and reload after delay
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setIsValidKey(false);
        setTestResult(connectionTest.message);
      }
    } catch (error) {
      console.error('Error in handleSaveKey:', error);
      setIsValidKey(false);
      setTestResult('❌ Connection test failed. Please verify your API key.');
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleRemoveKey = () => {
    if (window.confirm('Are you sure you want to remove the API key? This will disable advanced AI responses.')) {
      geminiService.removeAPIKey();
      setApiKey('');
      setIsValidKey(null);
      setTestResult('');
      
      // Reload to reset the application state
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const handleTestConnection = async () => {
    if (!isValidKey) {
      setTestResult('❌ Please save a valid API key first');
      return;
    }

    setIsTestingConnection(true);
    setTestResult('🔄 Testing connection...');

    try {
      const result = await geminiService.testConnection();
      setTestResult(result.message);
    } catch (error) {
      setTestResult('❌ Connection test failed');
    } finally {
      setIsTestingConnection(false);
    }
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
      return "🚀 Advanced AI responses enabled!";
    } else if (isValidKey === false) {
      return "❌ API key issue - Please check and try again";
    }
    return "⚠️ No API key configured - Using basic responses";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-4">
        <Key className="w-6 h-6 text-indigo-500" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Google Gemini API Configuration</h3>
        <div className="ml-auto relative">
          <button
            onClick={() => setShowInfoPopup(!showInfoPopup)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            title="API Key Information"
          >
            <Info className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
          {showInfoPopup && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowInfoPopup(false)}
              />
              <div className="absolute right-0 top-12 z-50 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">API Key Status</h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    {getStatusIcon()}
                    <span>{getStatusText()}</span>
                  </div>
                  {apiKey && (
                    <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Current Key (Hidden)</p>
                      <p className="font-mono text-xs">{'*'.repeat(apiKey.length)}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Status Display */}
        <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
          {getStatusIcon()}
          <span className="text-sm text-gray-700 dark:text-gray-300">{getStatusText()}</span>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 transition-colors duration-300">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">🔒 Security & Privacy</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                <li>• Your API key is stored locally and never shared</li>
                <li>• All API calls are made securely from your browser</li>
                <li>• No conversation data is stored on external servers</li>
                <li>• You can remove your key at any time</li>
              </ul>
            </div>
          </div>
        </div>

        {!isValidKey && (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 transition-colors duration-300">
            <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Get Your Free API Key</h4>
            <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
              Enable unlimited AI capabilities with Google's free Gemini API:
            </p>
            <ol className="text-sm text-blue-700 dark:text-blue-400 space-y-1 ml-4 list-decimal">
              <li>Visit <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800 dark:hover:text-blue-300 font-medium">Google AI Studio</a></li>
              <li>Sign in with your Google account</li>
              <li>Click "Create API Key" and copy it</li>
              <li>Paste it below and click "Save & Test"</li>
            </ol>
          </div>
        )}

        {!isValidKey && (
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
              Google Gemini API Key
            </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIza... (paste your Gemini API key here)"
                className="w-full p-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 dark:text-gray-100 transition-colors duration-300"
                disabled={isTestingConnection}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                disabled={isTestingConnection}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button
              onClick={handleSaveKey}
              disabled={!apiKey.trim() || isTestingConnection}
              className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              {isTestingConnection ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Testing...
                </>
              ) : (
                'Save & Test'
              )}
            </button>
          </div>
          </div>
        )}

        {/* Test Result */}
        {testResult && (
          <div className={`p-3 rounded-lg text-sm ${
            testResult.includes('✅') || testResult.includes('successful') 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800' 
              : testResult.includes('❌') || testResult.includes('failed')
              ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
              : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
          } transition-colors duration-300`}>
            {testResult}
          </div>
        )}

        {isValidKey && (
          <div className="flex gap-3">
            <button
              onClick={handleTestConnection}
              disabled={isTestingConnection}
              className="flex-1 p-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg border border-green-200 dark:border-green-800 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isTestingConnection ? 'animate-spin' : ''}`} />
              Test Connection
            </button>

            <button
              onClick={handleRemoveKey}
              className="flex-1 p-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800 transition-colors"
            >
              Remove API Key
            </button>
          </div>
        )}

        {!isValidKey && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-100 dark:border-green-800 p-4 transition-colors duration-300">
            <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">With API Key Enabled:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-green-700 dark:text-green-400">
              <div>• Unlimited conversations</div>
              <div>• Real-time knowledge</div>
              <div>• Advanced programming help</div>
              <div>• Creative writing assistance</div>
              <div>• Complex problem solving</div>
              <div>• Multi-language support</div>
            </div>
          </div>
        )}
        {isValidKey && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800 p-4 transition-colors duration-300">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h4 className="font-medium text-green-800 dark:text-green-300">API Connected Successfully</h4>
            </div>
            <p className="text-sm text-green-700 dark:text-green-400">
              Your chatbot now has access to advanced AI capabilities. All features are enabled.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};