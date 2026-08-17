import React, { useState } from 'react';
import { SandpackProvider } from '@codesandbox/sandpack-react';
import { Header } from './components/layout/Header';
import { CodeEditorPanel } from './components/editor/CodeEditorPanel';
import { ExplanationPanel } from './components/explanation/ExplanationPanel';
import { ProjectSummaryPanel } from './components/summary/ProjectSummaryPanel';
import { LivePreviewPanel } from './components/preview/LivePreviewPanel';
import { useAIExplanation } from './hooks/useAIExplanation';

// Sample mock code annotated with data-line attributes and runtime listener
const mockCode = `import React, { useState, useEffect } from 'react';

export default function App() {
  // Initialize counter state to 0
  const [count, setCount] = useState(0);

  // Increment the counter
  const handleIncrement = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'HIGHLIGHT_LINE') {
        const line = event.data.line;
        
        // Remove old highlights
        document.querySelectorAll('.runtime-highlight').forEach(el => {
          el.classList.remove('runtime-highlight');
          el.style.boxShadow = '';
          el.style.transition = '';
        });

        // Add new highlight
        const el = document.querySelector(\`[data-line="\${line}"]\`);
        if (el) {
          el.classList.add('runtime-highlight');
          el.style.transition = 'all 0.3s ease-in-out';
          el.style.boxShadow = '0 0 0 4px rgba(234, 179, 8, 0.6)';
          
          // Remove highlight after 2 seconds
          setTimeout(() => {
            el.style.boxShadow = '';
            el.classList.remove('runtime-highlight');
          }, 2000);
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div data-line="35" style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '2rem' }}>
      <h2 data-line="36">Current Count: {count}</h2>
      <button 
        data-line="37"
        onClick={handleIncrement}
        style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', marginTop: '1rem' }}
      >
        Increment
      </button>
    </div>
  );
}`;

function CodeVisionApp() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [viewMode, setViewMode] = useState<'line' | 'summary'>('line');
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  
  const { 
    explanation, 
    isLoading, 
    fetchLineExplanation, 
    clearExplanation 
  } = useAIExplanation();

  const handleLineClick = (lineNumber: number) => {
    if (viewMode === 'summary') {
      setViewMode('line');
    }
    
    setSelectedLine(lineNumber);
    fetchLineExplanation(lineNumber, selectedLanguage);

    // Broadcast highlight message to Sandpack iframe
    const iframes = document.getElementsByTagName('iframe');
    for (let i = 0; i < iframes.length; i++) {
      iframes[i].contentWindow?.postMessage({ type: 'HIGHLIGHT_LINE', line: lineNumber }, '*');
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    
    if (selectedLine !== null && viewMode === 'line') {
      fetchLineExplanation(selectedLine, language);
    }
  };

  const handleViewModeChange = (mode: 'line' | 'summary') => {
    setViewMode(mode);
    if (mode === 'summary') {
      setSelectedLine(null);
      clearExplanation();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
      <Header 
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />

      {/* Main Content: Split Screen */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel: Code Editor */}
        <div className="w-1/2 overflow-hidden h-full">
          <CodeEditorPanel 
            code={mockCode} 
            filename="App.js" 
            onLineClick={handleLineClick} 
          />
        </div>

        {/* Right Panel: Split into Top (Preview) and Bottom (Explanation/Summary) */}
        <div className="w-1/2 flex flex-col border-l border-gray-200">
          <div className="h-1/2 overflow-hidden bg-white">
            <LivePreviewPanel />
          </div>
          
          <div className="h-1/2 overflow-hidden bg-gray-50 border-t border-gray-200">
            {viewMode === 'line' ? (
              <ExplanationPanel 
                selectedLine={selectedLine}
                explanation={explanation}
                isLoading={isLoading}
                selectedLanguage={selectedLanguage}
              />
            ) : (
              <ProjectSummaryPanel 
                selectedLanguage={selectedLanguage}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <SandpackProvider 
      template="react" 
      theme="light"
      files={{
        "/App.js": mockCode
      }}
    >
      <CodeVisionApp />
    </SandpackProvider>
  );
}
