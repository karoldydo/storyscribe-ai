import { summarize } from '../services';
import { logError, logInfo, logSuccess, toSeconds } from '../utils';

async function generateSummaries(transcriptions: string[]): Promise<string[]> {
  const summarizeStart = Date.now();

  logInfo('Starting to create summaries for each transcription');

  try {
    const markdown = await summarize(transcriptions);
    logSuccess(`All summaries completed in time: ${toSeconds(Date.now() - summarizeStart)}.`);
    return markdown;
  } catch (error) {
    logError('An error occurred while creating summaries');
    throw error;
  }
}

export { generateSummaries };
