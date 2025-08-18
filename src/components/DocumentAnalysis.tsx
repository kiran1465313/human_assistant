import React, { useState, useRef } from 'react';
import { Upload, FileText, X, AlertCircle, CheckCircle } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface DocumentAnalysisProps {
  onAnalyze: (content: string, fileName: string) => void;
  isAnalyzing: boolean;
}

export const DocumentAnalysis: React.FC<DocumentAnalysisProps> = ({ onAnalyze, isAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    setError(null);
    
    // Check file type
    const allowedTypes = ['text/plain', 'application/pdf', 'text/markdown', 'text/csv'];
    const allowedExtensions = ['.txt', '.md', '.csv', '.pdf'];
    
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      setError('Please upload a text file (.txt, .md, .csv, .pdf)');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setUploadedFile(file);

    try {
      let content = '';
      
      if (file.type === 'application/pdf') {
        // For PDF files, we'll need to extract text
        content = `PDF file uploaded: ${file.name}. Please note that PDF text extraction is limited in this demo. For full PDF analysis, please copy and paste the text content.`;
      } else {
        // Read text files
        content = await file.text();
      }

      onAnalyze(content, file.name);
    } catch (err) {
      setError('Failed to read file. Please try again.');
      console.error('File reading error:', err);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getDropzoneStyle = () => {
    const baseStyle = "relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer";
    
    if (dragActive) {
      switch (theme.theme) {
        case 'pastel-cute':
          return `${baseStyle} border-pink-400 bg-pink-50/50`;
        case 'sci-fi-pet':
          return `${baseStyle} border-blue-400 bg-blue-900/30`;
        case 'nature-spirit':
          return `${baseStyle} border-green-400 bg-green-50/50`;
        default:
          return `${baseStyle} border-purple-400 bg-purple-50/50 dark:bg-purple-900/20`;
      }
    }

    switch (theme.theme) {
      case 'pastel-cute':
        return `${baseStyle} border-pink-300 hover:border-pink-400 hover:bg-pink-50/30`;
      case 'sci-fi-pet':
        return `${baseStyle} border-blue-600 hover:border-blue-400 hover:bg-blue-900/20`;
      case 'nature-spirit':
        return `${baseStyle} border-green-300 hover:border-green-400 hover:bg-green-50/30`;
      default:
        return `${baseStyle} border-gray-300 dark:border-gray-600 hover:border-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800`;
    }
  };

  return (
    <div className="space-y-4">
      {!uploadedFile ? (
        <div
          className={getDropzoneStyle()}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".txt,.md,.csv,.pdf"
            onChange={handleFileInput}
          />
          
          <Upload className={`w-12 h-12 mx-auto mb-4 ${
            theme.theme === 'pastel-cute' ? 'text-pink-500' :
            theme.theme === 'sci-fi-pet' ? 'text-blue-400' :
            theme.theme === 'nature-spirit' ? 'text-green-500' :
            'text-gray-400 dark:text-gray-500'
          }`} />
          
          <h3 className={`text-lg font-semibold mb-2 ${
            theme.theme === 'pastel-cute' ? 'text-pink-800' :
            theme.theme === 'sci-fi-pet' ? 'text-blue-100' :
            theme.theme === 'nature-spirit' ? 'text-green-800' :
            'text-gray-800 dark:text-gray-100'
          }`}>
            Upload Document for Analysis
          </h3>
          
          <p className={`text-sm mb-4 ${
            theme.theme === 'pastel-cute' ? 'text-pink-600' :
            theme.theme === 'sci-fi-pet' ? 'text-blue-300' :
            theme.theme === 'nature-spirit' ? 'text-green-600' :
            'text-gray-600 dark:text-gray-400'
          }`}>
            Drag and drop your file here, or click to browse
          </p>
          
          <p className={`text-xs ${
            theme.theme === 'pastel-cute' ? 'text-pink-500' :
            theme.theme === 'sci-fi-pet' ? 'text-blue-400' :
            theme.theme === 'nature-spirit' ? 'text-green-500' :
            'text-gray-500 dark:text-gray-400'
          }`}>
            Supports: .txt, .md, .csv, .pdf (max 5MB)
          </p>
        </div>
      ) : (
        <div className={`rounded-2xl p-4 border transition-all duration-300 ${
          theme.theme === 'pastel-cute' ? 'bg-pink-50 border-pink-200' :
          theme.theme === 'sci-fi-pet' ? 'bg-blue-900/30 border-blue-600' :
          theme.theme === 'nature-spirit' ? 'bg-green-50 border-green-200' :
          'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className={`w-8 h-8 ${
                theme.theme === 'pastel-cute' ? 'text-pink-500' :
                theme.theme === 'sci-fi-pet' ? 'text-blue-400' :
                theme.theme === 'nature-spirit' ? 'text-green-500' :
                'text-gray-500'
              }`} />
              <div>
                <p className={`font-medium ${
                  theme.theme === 'pastel-cute' ? 'text-pink-800' :
                  theme.theme === 'sci-fi-pet' ? 'text-blue-100' :
                  theme.theme === 'nature-spirit' ? 'text-green-800' :
                  'text-gray-800 dark:text-gray-100'
                }`}>
                  {uploadedFile.name}
                </p>
                <p className={`text-sm ${
                  theme.theme === 'pastel-cute' ? 'text-pink-600' :
                  theme.theme === 'sci-fi-pet' ? 'text-blue-300' :
                  theme.theme === 'nature-spirit' ? 'text-green-600' :
                  'text-gray-600 dark:text-gray-400'
                }`}>
                  {(uploadedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {isAnalyzing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-500 border-t-transparent" />
                  <span className="text-sm text-purple-600">Analyzing...</span>
                </div>
              ) : (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              
              <button
                onClick={removeFile}
                disabled={isAnalyzing}
                className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
};