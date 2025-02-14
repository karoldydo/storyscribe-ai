import { OLLAMA_SUMMARY_MODEL } from '../config';
import { SummaryRequest, SummaryResponse } from '../model';
import { logInfo, logSuccess, toSeconds } from '../utils';
import { axios, AxiosError, AxiosResponse } from '../utils';

/**
 * Create a summary from transcriptions
 *
 * @param transcriptions summarize transcriptions
 * @returns summarized text in raw format
 */
async function summarize(transcriptions: string[]): Promise<string[]> {
  const summaries: string[] = [];

  for (let i = 0; i < transcriptions.length; i++) {
    const transcript = transcriptions[i];
    const time = Date.now();

    logInfo(`Summary ${i + 1} of ${transcriptions.length}`);

    try {
      const {
        data: { response },
      } = await axios.post<SummaryResponse, AxiosResponse<SummaryResponse>, SummaryRequest>('/summarize', {
        model: OLLAMA_SUMMARY_MODEL,
        transcript,
      });

      summaries.push(response.trim());

      logSuccess(`Summary ${i + 1} completed in ${toSeconds(Date.now() - time)}.`);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error('Summary failed', { cause: error.toJSON() });
      }
      throw new Error('Summary failed', { cause: error });
    }
  }

  return summaries;
}

export { summarize };
