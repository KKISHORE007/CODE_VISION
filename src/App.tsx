import { useState } from 'react';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-lg font-bold text-xl">
            C
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-800">CodeVision</h1>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="language" className="text-sm font-medium text-gray-600">
            Explanation Language:
          </label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="block w-32 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
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
            <span>src/App.tsx</span>
            <span className="text-xs text-gray-500">Read-only</span>
          </div>
          <div className="flex-1 overflow-hidden p-4">
            {/* Monaco Editor will go here */}
            <div className="h-full w-full border border-gray-200 rounded-md bg-gray-50 flex items-center justify-center text-gray-400">
              [ Monaco Editor Placeholder ]
            </div>
          </div>
        </section>

        {/* Right Panel: Explanations & Live Preview (Later) */}
        <section className="w-1/2 flex flex-col bg-gray-50">
          <div className="px-4 py-2 bg-white border-b border-gray-200 text-sm font-medium text-gray-700 shadow-sm">
            AI Explanation
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Explanation Content */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Click any line of code to see what it does.
              </h2>
              <p className="text-gray-600 leading-relaxed">
                CodeVision will analyze the code block, figure out its context, and explain it in plain language.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
