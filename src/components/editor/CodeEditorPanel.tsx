import React, { useRef } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';

interface CodeEditorPanelProps {
  code: string;
  filename?: string;
  onLineClick: (lineNumber: number) => void;
  onChange?: (value: string | undefined) => void;
}

export const CodeEditorPanel: React.FC<CodeEditorPanelProps> = ({ 
  code, 
  filename = "Untitled",
  onLineClick,
  onChange
}) => {
  const editorRef = useRef<any>(null);
  const monaco = useMonaco();

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    // Listen for mouse down events to capture line clicks
    editor.onMouseDown((e: any) => {
      if (e.target.position) {
        const lineNumber = e.target.position.lineNumber;
        onLineClick(lineNumber);
      }
    });
  };

  return (
    <section className="h-full flex flex-col border-r border-gray-200 bg-white">
      <div className="px-4 py-2 bg-gray-100 border-b border-gray-200 text-sm font-medium text-gray-700 flex justify-between items-center">
        <span className="flex items-center">
           <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
           </svg>
           {filename}
        </span>
        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-md uppercase tracking-wider font-semibold border border-green-200">
          Editable
        </span>
      </div>
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          theme="vs-light"
          value={code}
          onChange={onChange}
          onMount={handleEditorDidMount}
          options={{
            readOnly: false,
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
  );
};
