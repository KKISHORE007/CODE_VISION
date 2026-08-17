/**
 * Mock AI Service to simulate LLM responses for Phase 4.
 */

export const mockAIService = {
  async getLineExplanation(lineNumber: number, language: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let text = "This line is part of the Counter component's structure.";
        
        if (lineNumber === 5) {
          text = "This sets up a state variable named 'count' with an initial value of 0, and a function 'setCount' to update it.";
        } else if (lineNumber >= 8 && lineNumber <= 10) {
          text = "This is a handler function that increments the 'count' state by 1 whenever it is called.";
        } else if (lineNumber >= 12 && lineNumber <= 32) {
          text = "This is a useEffect hook that sets up an event listener. It listens for 'HIGHLIGHT_LINE' messages from the parent window and applies a CSS highlight to the corresponding DOM element.";
        } else if (lineNumber >= 37 && lineNumber <= 43) {
          text = "This renders a button element. When clicked, it triggers the 'handleIncrement' function.";
        } else if (lineNumber === 36) {
          text = "This renders the current value of the 'count' state inside an H2 heading tag.";
        } else if (lineNumber === 35) {
          text = "This is the main container div for the application.";
        }

        if (language !== 'English') {
           text = `[Translated to ${language}]: ${text}`;
        }

        resolve(text);
      }, 500); // Simulate network delay
    });
  },

  async getProjectSummary(language: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let text = "The CodeVision mock project currently consists of a React Counter application integrated with a Runtime Highlighting system. It demonstrates basic state management using the `useState` hook, and uses a `useEffect` hook to listen for window messages to visually highlight DOM elements corresponding to code lines.";
        
        if (language !== 'English') {
           text = `[Translated to ${language}]: ${text}`;
        }
        
        resolve(text);
      }, 1000); 
    });
  }
};
