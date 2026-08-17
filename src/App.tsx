import { useState, useRef } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';

// Sample mock code for testing the click-to-explain MVP
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
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const editorRef = useRef<any>(null);
  const monaco = useMonaco();

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    // Listen for mouse down events to capture line clicks
    editor.onMouseDown((e: any) => {
      if (e.target.position) {
        const lineNumber = e.target.position.lineNumber;
        handleLineClick(lineNumber);
      }
    });
  };

  const handleLineClick = (lineNumber: number) => {
    setSelectedLine(lineNumber);
    setIsLoading(true);
    setExplanation(null);

    // Mocking an LLM call delay
    setTimeout(() => {
      // Very basic mock explanation logic
      let text = "This line is part of the Counter component.";
      
      if (lineNumber === 4 || lineNumber === 5) {
        text = "This sets up a state variable named 'count' with an initial value of 0, and a function 'setCount' to update it.";
      } else if (lineNumber === 7 || lineNumber === 8 || lineNumber === 9) {
        text = "This is a handler function that increments the 'count' state by 1 whenever it is called.";
      } else if (lineNumber === 14) {
        text = "This renders a button element. When clicked, it triggers the 'handleIncrement' function.";
      } else if (lineNumber === 13) {
        text = "This renders the current value of the 'count' state inside an H2 heading tag.";
      }

      setExplanation(text);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm z-10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-lg font-bold text-xl shadow-inner">
            C
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-800">CodeVision <span className="text-sm font-normal text-gray-500 ml-2">MVP</span></h1>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="language" className="text-sm font-medium text-gray-600">
            Explain in:
          </label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="block w-32 rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6 cursor-pointer"
          >
            <option value="English">English</option>
            <option value="Tamil">Tamil</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
      </header>

      {/* Main Content: Split Screen */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel: Code Editor */}
        <section className="w-1/2 flex flex-col border-r border-gray-200 bg-white">
          <div className="px-4 py-2 bg-gray-100 border-b border-gray-200 text-sm font-medium text-gray-700 flex justify-between items-center">
            <span className="flex items-center">
               <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
               Counter.tsx
            </span>
            <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-md uppercase tracking-wider font-semibold">Read-only</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="typescript"
              theme="vs-light"
              value={mockCode}
              onMount={handleEditorDidMount}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                lineHeight: 24,
                padding: { top: 16, bottom: 16 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "solid",
                renderLineHighlight: "all",
              }}
            />
          </div>
        </section>

        {/* Right Panel: Explanations */}
        <section className="w-1/2 flex flex-col bg-gray-50">
          <div className="px-4 py-2 bg-white border-b border-gray-200 text-sm font-medium text-gray-700 shadow-sm flex items-center">
             <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
             AI Explanation
          </div>
          <div className="flex-1 p-8 overflow-y-auto">
            {selectedLine === null ? (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center mt-10">
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
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
                   <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md">Line {selectedLine}</span>
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
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {explanation}
                    </p>
                    
                    {selectedLanguage !== 'English' && (
                      <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
                        <p className="text-sm text-amber-800 italic">
                          * Translation to {selectedLanguage} would appear here using the LLM backend.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
