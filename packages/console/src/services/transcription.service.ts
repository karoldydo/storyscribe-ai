import { TranscriptionServiceRequest, TranscriptionServiceResponse } from '@storyscribe-ai/model/types';
import path from 'path';

import { WHISPER_LANGUAGE, WHISPER_MODEL } from '../config';
import { logInfo, logSuccess, toSeconds } from '../utils';
import { axios, AxiosError, AxiosResponse } from '../utils';

/**
 * Transcribe video files
 *
 * @param files list of video files
 * @returns list of transcriptions
 */
async function transcribe(files: string[]): Promise<string[]> {
  const transcriptions: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const time = Date.now();

    logInfo(`Transcription ${i + 1} of ${files.length}`);

    try {
      const {
        data: { transcript },
      } = await axios.post<
        TranscriptionServiceResponse,
        AxiosResponse<TranscriptionServiceResponse>,
        TranscriptionServiceRequest
      >('/transcribe', {
        file_name: path.basename(files[i]),
        language: WHISPER_LANGUAGE,
        model: WHISPER_MODEL,
      });

      transcriptions.push(transcript.trim());

      logSuccess(`Transcription ${i + 1} completed in ${toSeconds(Date.now() - time)}.`);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error('Transcription failed', { cause: error.toJSON() });
      }
      throw new Error('Transcription failed', { cause: error });
    }
  }

  return transcriptions;
}

export { transcribe };
