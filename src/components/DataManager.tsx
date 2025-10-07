import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Database } from 'lucide-react';
import { ragService } from '../services/ragService';
import { useTheme } from '../hooks/useTheme';

export const DataManager: React.FC = () => {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setUploadStatus('Please upload a CSV file');
      setUploadSuccess(false);
      return;
    }

    setUploadStatus('Reading file...');
    setUploadSuccess(null);

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const result = ragService.loadAdditionalCSV(content);

        if (result.success) {
          setUploadStatus(`Successfully added ${result.count} Q&A entries!`);
          setUploadSuccess(true);
        } else {
          setUploadStatus(`Failed to load CSV: ${result.error || 'Unknown error'}`);
          setUploadSuccess(false);
        }
      };

      reader.onerror = () => {
        setUploadStatus('Error reading file');
        setUploadSuccess(false);
      };

      reader.readAsText(file);
    } catch (error) {
      setUploadStatus('Error processing file');
      setUploadSuccess(false);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`rounded-xl shadow-sm p-6 transition-all duration-300 ${
      theme.theme === 'pastel-cute' ? 'bg-gradient-to-br from-pink-50 to-blue-50 border border-pink-200' :
      theme.theme === 'sci-fi-pet' ? 'bg-gradient-to-br from-gray-900 to-blue-950 border border-blue-700' :
      theme.theme === 'nature-spirit' ? 'bg-gradient-to-br from-green-50 to-yellow-50 border border-green-200' :
      theme.theme === 'electronics' ? 'bg-gradient-to-br from-gray-900 to-orange-950 border border-orange-600' :
      'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'
    }`}>
      <div className="flex items-center gap-3 mb-4">
        <Database className={`w-6 h-6 ${
          theme.theme === 'pastel-cute' ? 'text-pink-500' :
          theme.theme === 'sci-fi-pet' ? 'text-blue-400' :
          theme.theme === 'nature-spirit' ? 'text-green-600' :
          theme.theme === 'electronics' ? 'text-orange-500' :
          'text-blue-500'
        }`} />
        <h3 className={`text-lg font-semibold ${
          theme.theme === 'pastel-cute' ? 'text-pink-800' :
          theme.theme === 'sci-fi-pet' ? 'text-blue-100' :
          theme.theme === 'nature-spirit' ? 'text-green-800' :
          theme.theme === 'electronics' ? 'text-orange-100' :
          'text-gray-800 dark:text-gray-100'
        }`}>Knowledge Base Manager</h3>
      </div>

      <div className="space-y-4">
        <div className={`p-4 rounded-lg ${
          theme.theme === 'pastel-cute' ? 'bg-blue-100 border border-blue-200' :
          theme.theme === 'sci-fi-pet' ? 'bg-blue-900/30 border border-blue-700' :
          theme.theme === 'nature-spirit' ? 'bg-blue-100 border border-blue-200' :
          theme.theme === 'electronics' ? 'bg-orange-900/30 border border-orange-700' :
          'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
        }`}>
          <h4 className={`font-medium mb-2 ${
            theme.theme === 'pastel-cute' ? 'text-blue-800' :
            theme.theme === 'sci-fi-pet' ? 'text-blue-200' :
            theme.theme === 'nature-spirit' ? 'text-blue-800' :
            theme.theme === 'electronics' ? 'text-orange-200' :
            'text-blue-800 dark:text-blue-300'
          }`}>Upload Additional Q&A Data</h4>
          <p className={`text-sm mb-3 ${
            theme.theme === 'pastel-cute' ? 'text-blue-700' :
            theme.theme === 'sci-fi-pet' ? 'text-blue-300' :
            theme.theme === 'nature-spirit' ? 'text-blue-700' :
            theme.theme === 'electronics' ? 'text-orange-300' :
            'text-blue-700 dark:text-blue-400'
          }`}>
            Upload a CSV file with questions and answers to expand the chatbot's knowledge base.
          </p>
          <p className={`text-xs mb-3 ${
            theme.theme === 'pastel-cute' ? 'text-blue-600' :
            theme.theme === 'sci-fi-pet' ? 'text-blue-400' :
            theme.theme === 'nature-spirit' ? 'text-blue-600' :
            theme.theme === 'electronics' ? 'text-orange-400' :
            'text-blue-600 dark:text-blue-500'
          }`}>
            CSV Format: id,category,question,answer
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
        />

        <button
          onClick={triggerFileInput}
          className={`w-full p-4 rounded-lg border-2 border-dashed transition-all duration-300 hover:scale-[1.02] ${
            theme.theme === 'pastel-cute' ? 'border-pink-300 bg-pink-50 hover:bg-pink-100 hover:border-pink-400' :
            theme.theme === 'sci-fi-pet' ? 'border-blue-600 bg-blue-900/20 hover:bg-blue-900/30 hover:border-blue-500' :
            theme.theme === 'nature-spirit' ? 'border-green-300 bg-green-50 hover:bg-green-100 hover:border-green-400' :
            theme.theme === 'electronics' ? 'border-orange-600 bg-orange-900/20 hover:bg-orange-900/30 hover:border-orange-500' :
            'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <Upload className={`w-5 h-5 ${
              theme.theme === 'pastel-cute' ? 'text-pink-600' :
              theme.theme === 'sci-fi-pet' ? 'text-blue-400' :
              theme.theme === 'nature-spirit' ? 'text-green-600' :
              theme.theme === 'electronics' ? 'text-orange-400' :
              'text-blue-600 dark:text-blue-400'
            }`} />
            <span className={`font-medium ${
              theme.theme === 'pastel-cute' ? 'text-pink-700' :
              theme.theme === 'sci-fi-pet' ? 'text-blue-200' :
              theme.theme === 'nature-spirit' ? 'text-green-700' :
              theme.theme === 'electronics' ? 'text-orange-200' :
              'text-gray-700 dark:text-gray-300'
            }`}>
              Choose CSV File
            </span>
            <FileText className={`w-5 h-5 ${
              theme.theme === 'pastel-cute' ? 'text-pink-600' :
              theme.theme === 'sci-fi-pet' ? 'text-blue-400' :
              theme.theme === 'nature-spirit' ? 'text-green-600' :
              theme.theme === 'electronics' ? 'text-orange-400' :
              'text-blue-600 dark:text-blue-400'
            }`} />
          </div>
        </button>

        {uploadStatus && (
          <div className={`p-3 rounded-lg flex items-center gap-2 ${
            uploadSuccess === true
              ? theme.theme === 'pastel-cute' ? 'bg-green-100 border border-green-300' :
                theme.theme === 'sci-fi-pet' ? 'bg-green-900/30 border border-green-700' :
                theme.theme === 'nature-spirit' ? 'bg-green-100 border border-green-300' :
                theme.theme === 'electronics' ? 'bg-green-900/30 border border-green-700' :
                'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              : uploadSuccess === false
              ? theme.theme === 'pastel-cute' ? 'bg-red-100 border border-red-300' :
                theme.theme === 'sci-fi-pet' ? 'bg-red-900/30 border border-red-700' :
                theme.theme === 'nature-spirit' ? 'bg-red-100 border border-red-300' :
                theme.theme === 'electronics' ? 'bg-red-900/30 border border-red-700' :
                'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              : theme.theme === 'pastel-cute' ? 'bg-blue-100 border border-blue-300' :
                theme.theme === 'sci-fi-pet' ? 'bg-blue-900/30 border border-blue-700' :
                theme.theme === 'nature-spirit' ? 'bg-blue-100 border border-blue-300' :
                theme.theme === 'electronics' ? 'bg-orange-900/30 border border-orange-700' :
                'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
          }`}>
            {uploadSuccess === true && <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />}
            {uploadSuccess === false && <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />}
            <span className={`text-sm ${
              uploadSuccess === true
                ? 'text-green-700 dark:text-green-400'
                : uploadSuccess === false
                ? 'text-red-700 dark:text-red-400'
                : theme.theme === 'pastel-cute' ? 'text-blue-700' :
                  theme.theme === 'sci-fi-pet' ? 'text-blue-300' :
                  theme.theme === 'nature-spirit' ? 'text-blue-700' :
                  theme.theme === 'electronics' ? 'text-orange-300' :
                  'text-blue-700 dark:text-blue-400'
            }`}>
              {uploadStatus}
            </span>
          </div>
        )}

        <div className={`p-3 rounded-lg text-xs ${
          theme.theme === 'pastel-cute' ? 'bg-pink-100 text-pink-700 border border-pink-200' :
          theme.theme === 'sci-fi-pet' ? 'bg-gray-800 text-blue-300 border border-gray-700' :
          theme.theme === 'nature-spirit' ? 'bg-green-100 text-green-700 border border-green-200' :
          theme.theme === 'electronics' ? 'bg-gray-800 text-orange-300 border border-gray-700' :
          'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-600'
        }`}>
          Current knowledge base: {ragService.getKnowledgeBaseSize()} entries
        </div>
      </div>
    </div>
  );
};
