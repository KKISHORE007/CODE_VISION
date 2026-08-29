import { useState, useCallback, useRef } from 'react';
import { mockAIService } from '../services/ai/mockAIService';
import { geminiService, hasGeminiAPIKey } from '../services/ai/geminiService';

interface Cache {
  [key: string]: string;
}

export function useAIExplanation(code: string) {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [usingMock, setUsingMock] = useState(!hasGeminiAPIKey());
  
  // Cache to store line explanations: key format `${lineNumber}-${language}`
  const lineCache = useRef<Cache>({});
  
  // Cache to store summaries: key format `summary-${language}`
  const summaryCache = useRef<Cache>({});

  const fetchLineExplanation = useCallback(async (lineNumber: number, language: string) => {
    const cacheKey = `${lineNumber}-${language}`;
    
    if (lineCache.current[cacheKey]) {
      setExplanation(lineCache.current[cacheKey]);
      return;
    }

    setIsLoading(true);
    setExplanation(null);
    
    try {
      let result;
      if (hasGeminiAPIKey()) {
        setUsingMock(false);
        result = await geminiService.getLineExplanation(code, lineNumber, language);
      } else {
        setUsingMock(true);
        result = await mockAIService.getLineExplanation(lineNumber, language);
      }
      
      lineCache.current[cacheKey] = result;
      setExplanation(result);
    } catch (error) {
      setExplanation("Failed to fetch explanation. Please check your API key or network connection.");
    } finally {
      setIsLoading(false);
    }
  }, [code]);

  const fetchProjectSummary = useCallback(async (language: string) => {
    const cacheKey = `summary-${language}`;
    
    if (summaryCache.current[cacheKey]) {
      setSummary(summaryCache.current[cacheKey]);
      return;
    }

    setIsLoading(true);
    setSummary(null);
    
    try {
      let result;
      if (hasGeminiAPIKey()) {
        setUsingMock(false);
        result = await geminiService.getProjectSummary(code, language);
      } else {
        setUsingMock(true);
        result = await mockAIService.getProjectSummary(language);
      }
      
      summaryCache.current[cacheKey] = result;
      setSummary(result);
    } catch (error) {
      setSummary("Failed to fetch project summary. Please check your API key or network connection.");
    } finally {
      setIsLoading(false);
    }
  }, [code]);

  const clearExplanation = useCallback(() => {
    setExplanation(null);
  }, []);

  return {
    explanation,
    summary,
    isLoading,
    usingMock,
    fetchLineExplanation,
    fetchProjectSummary,
    clearExplanation
  };
}

/* automated commit 7 */

/* automated commit 32 */
