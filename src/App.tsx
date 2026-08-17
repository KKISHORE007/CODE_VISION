import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { CodeEditorPanel } from './components/editor/CodeEditorPanel';
import { ExplanationPanel } from './components/explanation/ExplanationPanel';
import { ProjectSummaryPanel } from './components/summary/ProjectSummaryPanel';
import { useAIExplanation } from './hooks/useAIExplanation';

// Sample mock code for testing
const mockCode = `import React, { useState } from 'react';

function Counter() {
  // Initialize counter state to 0
  const [count, setCount] = useState(0);

  // Increment the counter
  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div className="counter-app">
      <h2>Current Count: {count}</h2>
      <button onClick={handleIncrement}>
        Increment
      </button>
    </div>
  );
}

export default Counter;`;

function App() {
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
    // If we are in summary mode, switch to line explainer automatically when a line is clicked
    if (viewMode === 'summary') {
      setViewMode('line');
    }
    
    setSelectedLine(lineNumber);
    fetchLineExplanation(lineNumber, selectedLanguage);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    
    // If a line is already selected and we change the language, we should refetch it
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
        <div className="w-1/2 overflow-hidden">
          <CodeEditorPanel 
            code={mockCode} 
            filename="Counter.tsx" 
            onLineClick={handleLineClick} 
          />
        </div>

        {/* Right Panel: Explanations or Summary */}
        <div className="w-1/2 overflow-hidden bg-gray-50 border-l border-gray-200">
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
      </main>
    </div>
  );
}

export default App;
