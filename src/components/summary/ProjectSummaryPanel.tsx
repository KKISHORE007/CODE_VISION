import React, { useEffect } from 'react';
import { useAIExplanation } from '../../hooks/useAIExplanation';

interface ProjectSummaryPanelProps {
  selectedLanguage: string;
}

export const ProjectSummaryPanel: React.FC<ProjectSummaryPanelProps> = ({ selectedLanguage }) => {
  const { summary, isLoading, fetchProjectSummary } = useAIExplanation();

  useEffect(() => {
    fetchProjectSummary(selectedLanguage);
  }, [selectedLanguage, fetchProjectSummary]);

  return (
    <section className="h-full flex flex-col bg-gray-50">
      <div className="px-4 py-2 bg-white border-b border-gray-200 text-sm font-medium text-gray-700 shadow-sm flex items-center">
        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
        Whole-Codebase Summary
      </div>
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-green-500">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Architecture & Overview
          </h2>
          
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-11/12"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>
          ) : (
            <div>
              <p className="text-gray-700 text-lg leading-relaxed">
                {summary}
              </p>
              
              {selectedLanguage !== 'English' && (
                <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <p className="text-sm text-amber-800 italic">
                    * This summary is translated to {selectedLanguage} by the AI backend.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
