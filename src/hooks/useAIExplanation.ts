import { useState, useCallback, useRef } from 'react';
import { mockAIService } from '../services/ai/mockAIService';

interface Cache {
  [key: string]: string;
}

export function useAIExplanation() {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
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
      const result = await mockAIService.getLineExplanation(lineNumber, language);
      lineCache.current[cacheKey] = result;
      setExplanation(result);
    } catch (error) {
      setExplanation("Failed to fetch explanation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchProjectSummary = useCallback(async (language: string) => {
    const cacheKey = `summary-${language}`;
    
    if (summaryCache.current[cacheKey]) {
      setSummary(summaryCache.current[cacheKey]);
      return;
    }

    setIsLoading(true);
    setSummary(null);
    
    try {
      const result = await mockAIService.getProjectSummary(language);
      summaryCache.current[cacheKey] = result;
      setSummary(result);
    } catch (error) {
      setSummary("Failed to fetch project summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearExplanation = useCallback(() => {
    setExplanation(null);
  }, []);

  return {
    explanation,
    summary,
    isLoading,
    fetchLineExplanation,
    fetchProjectSummary,
    clearExplanation
  };
}
