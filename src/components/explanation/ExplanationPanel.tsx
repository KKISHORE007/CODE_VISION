import React from 'react';

interface ExplanationPanelProps {
  selectedLine: number | null;
  explanation: string | null;
  isLoading: boolean;
  selectedLanguage: string;
  usingMock: boolean;
}

export const ExplanationPanel: React.FC<ExplanationPanelProps> = ({
  selectedLine,
  explanation,
  isLoading,
  selectedLanguage,
  usingMock
}) => {
  return (
    <section className="h-full flex flex-col bg-gray-50">
      <div className="px-4 py-2 bg-white border-b border-gray-200 text-sm font-medium text-gray-700 shadow-sm flex items-center justify-between">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          AI Explanation
        </div>
        {usingMock ? (
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded border border-yellow-200">Mock LLM</span>
        ) : (
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded border border-green-200">Gemini AI</span>
        )}
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
        {selectedLine === null ? (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center mt-10">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Click any line of code
            </h2>
            <p className="text-gray-500 max-w-sm mx-auto">
              CodeVision will explain exactly what that line does in the context of the whole application.
            </p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center space-x-2 mb-4">
               <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md">
                 Line {selectedLine}
               </span>
               {isLoading && (
                 <span className="flex space-x-1">
                   <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                   <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                   <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                 </span>
               )}
            </div>
            
            {isLoading ? (
              <div className="space-y-3 mt-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
            ) : (
              <div>
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                  {explanation}
                </p>
                
                {selectedLanguage !== 'English' && usingMock && (
                  <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
                    <p className="text-sm text-amber-800 italic">
                      * This explanation is translated to {selectedLanguage} by the AI backend.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

/* automated commit 3 */

/* automated commit 28 */
