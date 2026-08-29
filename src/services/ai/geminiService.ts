import { GoogleGenAI } from '@google/genai';

export const hasGeminiAPIKey = () => {
  return !!import.meta.env.VITE_GEMINI_API_KEY;
};

// Lazy initialization of the AI client so we don't throw an error if the key is missing on load
let aiClient: GoogleGenAI | null = null;

const getAIClient = () => {
  if (!aiClient) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API key is missing. Please set VITE_GEMINI_API_KEY in .env.local.");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const geminiService = {
  async getLineExplanation(code: string, lineNumber: number, language: string): Promise<string> {
    try {
      const client = getAIClient();
      
      const prompt = `You are an expert developer explaining code to a learner.
Here is the code:
\`\`\`
${code}
\`\`\`

Explain exactly what Line ${lineNumber} does in the context of the whole application.
Keep the explanation clear, concise (2-4 sentences max), and easy to understand.
Do not use markdown blocks for the final text, just plain text.

Translate your final explanation into: ${language}.`;

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text || "Failed to generate explanation.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  },

  async getProjectSummary(code: string, language: string): Promise<string> {
    try {
      const client = getAIClient();
      
      const prompt = `You are an expert software architect.
Here is the code for a project:
\`\`\`
${code}
\`\`\`

Provide a high-level architectural summary of this code. 
Explain what it does, what technologies or patterns it uses, and how it is structured.
Keep it under 150 words.

Translate your final summary into: ${language}.`;

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text || "Failed to generate project summary.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
};

/* automated commit 9 */
