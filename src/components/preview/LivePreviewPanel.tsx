import React from 'react';
import { SandpackPreview } from '@codesandbox/sandpack-react';

export const LivePreviewPanel: React.FC = () => {
  return (
    <section className="h-full flex flex-col bg-white border-b border-gray-200">
      <div className="px-4 py-2 bg-gray-100 border-b border-gray-200 text-sm font-medium text-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Live Preview
        </div>
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-red-400"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
        </div>
      </div>
      <div className="flex-1 relative overflow-hidden bg-white">
        <SandpackPreview 
          showOpenInCodeSandbox={false}
          showRefreshButton={true}
          style={{ height: '100%' }}
        />
      </div>
    </section>
  );
};
