import { convertTextToMarkdown } from '../services';
import { logError, logInfo, logSuccess, toSeconds } from '../utils';

async function generateMarkdown(summaries: string[]): Promise<string> {
  const markdownStart = Date.now();

  logInfo('Starting to generate markdowns from each summary text');

  try {
    const markdown = await convertTextToMarkdown(summaries);
    logSuccess(`All markdowns completed in time: ${toSeconds(Date.now() - markdownStart)}.`);
    return markdown;
  } catch (error) {
    logError('An error occurred while generating markdown');
    throw error;
  }
}

export { generateMarkdown };
