import { TranscriptionServiceRequest, TranscriptionServiceResponse } from '@storyscribe-ai/model/types';
import { AxiosResponse } from 'axios';
import { Worker } from 'bullmq';

import { whisperService } from '../core/axios';
import logger from '../core/logger';
import { redisOptions } from '../core/redis';
import { MovieService, TranscriptionService } from '../services';

const transcriptionWorker = () => {
  const transcriptionService = new TranscriptionService();
  const movieService = new MovieService();

  const worker = new Worker(
    'transcription',
    async (job) => {
      if (job && job.id) {
        const { id } = job;

        const { movieId } = await transcriptionService.update({ id, status: 'in-progress' });
        const { filename } = await movieService.getOne({ id: movieId });
        logger.info(`[WORKER] Transcription job ${id} started.`);

        const {
          data: { transcript: content },
        } = await whisperService.post<
          TranscriptionServiceResponse,
          AxiosResponse<TranscriptionServiceResponse>,
          TranscriptionServiceRequest
        >('/transcribe', { file_name: filename });

        await transcriptionService.update({ content, id });
      }
    },
    { concurrency: 1, connection: redisOptions }
  );

  worker.on('completed', async (job) => {
    if (job && job.id) {
      const { id } = job;
      transcriptionService.update({ id, status: 'completed' }).then(() => {
        logger.info(`[WORKER] Transcription job ${id} completed successfully.`);
      });
    }
  });

  worker.on('failed', async (job, error) => {
    if (job && job.id) {
      const { id } = job;
      await transcriptionService.update({ id, status: 'failed' }).then(() => {
        logger.error(`[WORKER] Transcription job ${id} failed: ${JSON.stringify(error, null, 2)}`);
      });
    }
  });
};

export { transcriptionWorker };
