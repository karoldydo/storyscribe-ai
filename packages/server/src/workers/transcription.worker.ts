import { TranscriptionRequest, TranscriptionResponse } from '@storyscribe-ai/model/types';
import { AxiosResponse } from 'axios';
import { Worker } from 'bullmq';

import { whisperService } from '../core/axios';
import logger from '../core/logger';
import { redisOptions } from '../core/redis';
import { TranscriptionService } from '../services';

const transcriptionWorker = () => {
  const transcriptionService = new TranscriptionService();

  const worker = new Worker<TranscriptionRequest>(
    'transcription',
    async (job) => {
      if (job && job.id) {
        const { data: body, id } = job;

        await transcriptionService.update(id, undefined, 'in-progress');
        logger.info(`[WORKER] Transcription job ${id} started.`);

        const {
          data: { transcript },
        } = await whisperService.post<
          TranscriptionResponse,
          AxiosResponse<TranscriptionResponse>,
          TranscriptionRequest
        >('/transcribe', body);

        await transcriptionService.update(id, transcript);
      }
    },
    { concurrency: 1, connection: redisOptions }
  );

  worker.on('completed', async (job) => {
    if (job && job.id) {
      const { id } = job;
      transcriptionService.update(id, undefined, 'completed').then(() => {
        logger.info(`[WORKER] Transcription job ${id} completed successfully.`);
      });
    }
  });

  worker.on('failed', async (job, error) => {
    if (job && job.id) {
      const { id } = job;
      await transcriptionService.update(id, undefined, 'failed');
      logger.error(`[WORKER] Transcription job ${id} failed: ${JSON.stringify(error, null, 2)}`);
    }
  });
};

export { transcriptionWorker };
