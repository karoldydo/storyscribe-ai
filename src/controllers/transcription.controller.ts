import { transcribe } from '../services';
import { logError, logInfo, logSuccess, toSeconds } from '../utils';

async function listTranscriptions(files: string[]): Promise<string[]> {
  const transcribeStart = Date.now();

  logInfo('Starting transcription of all files');

  try {
    const transcriptions = await transcribe(files);
    logSuccess(`All transcriptions completed in time: ${toSeconds(Date.now() - transcribeStart)}`);
    return transcriptions;
  } catch (error) {
    logError('An error occurred while transcribing files');
    throw error;
  }
}

export { listTranscriptions };
