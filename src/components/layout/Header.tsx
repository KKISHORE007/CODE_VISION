import React from 'react';

interface HeaderProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  viewMode: 'line' | 'summary';
  onViewModeChange: (mode: 'line' | 'summary') => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  selectedLanguage, 
  onLanguageChange,
  viewMode,
  onViewModeChange
}) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-lg font-bold text-xl shadow-inner">
          C
        </div>
        <h1 className="text-xl font-bold tracking-tight text-gray-800">
          CodeVision <span className="text-sm font-normal text-gray-500 ml-2">Phase 2</span>
        </h1>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => onViewModeChange('line')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'line' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Line Explainer
          </button>
          <button
            onClick={() => onViewModeChange('summary')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'summary' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Project Summary
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <label htmlFor="language" className="text-sm font-medium text-gray-600">
            Language:
          </label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="block w-32 rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6 cursor-pointer bg-white"
          >
            <option value="English">English</option>
            <option value="Tamil">Tamil</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
      </div>
    </header>
  );
};
