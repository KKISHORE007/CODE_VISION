/**
 * Mock AI Service to simulate LLM responses for Phase 2.
 * In a real application, this would call the Gemini API.
 */

export const mockAIService = {
  /**
   * Fetches an explanation for a specific line of code.
   */
  async getLineExplanation(lineNumber: number, language: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
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

        if (language !== 'English') {
           text = `[Translated to ${language}]: ${text}`;
        }

        resolve(text);
      }, 800); // Simulate network delay
    });
  },

  /**
   * Fetches a whole-project summary.
   */
  async getProjectSummary(language: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let text = "The CodeVision mock project currently consists of a simple React Counter application. It demonstrates basic state management using the `useState` hook and event handling with a button click. The component structure is straightforward, focusing on updating the DOM efficiently when the state changes.";
        
        if (language !== 'English') {
           text = `[Translated to ${language}]: ${text}`;
        }
        
        resolve(text);
      }, 1500); // Simulate network delay
    });
  }
};
