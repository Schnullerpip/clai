import { scrape } from './scraper';
import { summarizeWebPage } from './summarizer';

export interface SummaryOutput {
  summary: string;
  links: ReadonlyArray<{
    name: string;
    url: string;
  }>;
}

/**
 * Scrapes and analyzes a webpage using AI
 * @param url - The HTTPS URL to analyze
 * @param openAIKey - OpenAI API key
 * @returns Promise with summary and extracted links
 * 
 * @example
 * ```ts
 * const result = await skaim('https://example.com', 'your-openai-key')
 * console.log(result.summary) // AI generated summary
 * console.log(result.links) // Extracted links
 * ```
 */
export async function skaim(url: `https://${string}`, openAIKey: string): Promise<SummaryOutput> {
  const data = await scrape(url);
  const result = await summarizeWebPage(data.content, 200, openAIKey);
  
  return {
    summary: result.textual.trim(),
    links: result.links
  };
}

// Default export for easier importing
export default skaim; 