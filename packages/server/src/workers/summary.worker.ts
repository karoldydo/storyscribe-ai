import { OllamaServiceRequest, OllamaServiceResponse } from '@storyscribe-ai/model/types';
import { AxiosResponse } from 'axios';
import { Worker } from 'bullmq';

import { ollamaService } from '../core/axios';
import logger from '../core/logger';
import { redisOptions } from '../core/redis';
import { TranscriptionService } from '../services';
import { PromptService } from '../services/prompt.service';
import { SummaryService } from '../services/summary.service';

const summaryWorker = () => {
  const summaryService = new SummaryService();
  const promptService = new PromptService();
  const transcriptionService = new TranscriptionService();

  const worker = new Worker(
    'summary',
    async (job) => {
      if (job && job.id) {
        const { id } = job;

        const { promptId, transcriptionId } = await summaryService.update({ id, status: 'in-progress' });
        const { content: prompt } = await promptService.getOne({ id: promptId });
        const { content: transcription } = await transcriptionService.getOne({ id: transcriptionId });

        logger.info(`[WORKER] Summary job ${id} started.`);

        const {
          data: { response: content },
        } = await ollamaService.post<OllamaServiceResponse, AxiosResponse<OllamaServiceResponse>, OllamaServiceRequest>(
          '/api/generate',
          {
            model: 'llama:latest',
            prompt: `${prompt.trim()}\n\n${transcription.trim()}`,
            stream: false,
          }
        );

        await summaryService.update({ content, id });
      }
    },
    { concurrency: 1, connection: redisOptions }
  );

  worker.on('ready', () => {
    logger.info(`[WORKER] Summary worker is ready to process jobs.`);
  });

  worker.on('completed', async (job) => {
    if (job && job.id) {
      const { id } = job;
      summaryService.update({ id, status: 'completed' }).then(() => {
        logger.info(`[WORKER] Summary job ${id} completed successfully.`);
      });
    }
  });

  worker.on('failed', async (job, error) => {
    if (job && job.id) {
      const { id } = job;
      await summaryService.update({ id, status: 'failed' }).then(() => {
        logger.error(`[WORKER] Summary job ${id} failed: ${JSON.stringify(error, null, 2)}`);
      });
    }
  });
};

export { summaryWorker };
