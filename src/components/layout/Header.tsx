import React, { useState } from 'react';

interface HeaderProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  viewMode: 'line' | 'summary';
  onViewModeChange: (mode: 'line' | 'summary') => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onShare: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  selectedLanguage, 
  onLanguageChange,
  viewMode,
  onViewModeChange,
  isPlaying,
  onTogglePlay,
  onShare
}) => {
  const [showShareToast, setShowShareToast] = useState(false);

  const handleShare = () => {
    onShare();
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 3000);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm z-10 relative">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-lg font-bold text-xl shadow-inner">
          C
        </div>
        <h1 className="text-xl font-bold tracking-tight text-gray-800">
          CodeVision <span className="text-sm font-normal text-gray-500 ml-2">Phase 5</span>
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Play Walkthrough Button */}
        <button
          onClick={onTogglePlay}
          className={`flex items-center px-4 py-1.5 text-sm font-semibold rounded-md shadow-sm transition-all border ${
            isPlaying 
              ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' 
              : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
          }`}
        >
          {isPlaying ? (
            <>
              <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" /></svg>
              Stop Walkthrough
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
              Play Walkthrough
            </>
          )}
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex items-center px-4 py-1.5 text-sm font-semibold rounded-md bg-white border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
          Share Link
        </button>

        <div className="h-6 w-px bg-gray-300 mx-2"></div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
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

        {/* Language Selector */}
        <div className="flex items-center space-x-2 pl-2">
          <label htmlFor="language" className="text-sm font-medium text-gray-600">
            Lang:
          </label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="block w-28 rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6 cursor-pointer bg-white"
          >
            <option value="English">English</option>
            <option value="Tamil">Tamil</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
      </div>

      {/* Toast Notification */}
      {showShareToast && (
        <div className="absolute top-full mt-2 right-6 bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-md shadow-lg flex items-center animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          Link copied to clipboard!
        </div>
      )}
    </header>
  );
};
