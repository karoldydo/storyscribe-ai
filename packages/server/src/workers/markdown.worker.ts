import { OllamaServiceRequest, OllamaServiceResponse } from '@storyscribe-ai/model/types';
import { AxiosResponse } from 'axios';
import { Worker } from 'bullmq';

import { ollamaExternalService } from '../core/axios';
import logger from '../core/logger';
import { redisOptions } from '../core/redis';
import { MarkdownService, PromptService, SummaryService } from '../services';

const markdownWorker = () => {
  const markdownService = new MarkdownService();
  const promptService = new PromptService();
  const summaryService = new SummaryService();

  const worker = new Worker(
    'markdown',
    async (job) => {
      if (job && job.id) {
        const { id } = job;

        const { promptId, summaryId } = await markdownService.update({ id, status: 'in-progress' });
        const { content: prompt } = await promptService.getOne({ id: promptId });
        const { content: summary } = await summaryService.getOne({ id: summaryId });

        logger.info(`[WORKER] Markdown job ${id} started.`);

        const {
          data: { response: content },
        } = await ollamaExternalService.post<
          OllamaServiceResponse,
          AxiosResponse<OllamaServiceResponse>,
          OllamaServiceRequest
        >('/api/generate', {
          model: 'llama:latest',
          prompt: `${prompt.trim()}\n\n${summary.trim()}`,
          stream: false,
        });

        await markdownService.update({ content, id });
      }
    },
    { concurrency: 1, connection: redisOptions }
  );

  worker.on('ready', () => {
    logger.info(`[WORKER] Markdown worker is ready to process jobs.`);
  });

  worker.on('completed', async (job) => {
    if (job && job.id) {
      const { id } = job;
      markdownService.update({ id, status: 'completed' }).then(() => {
        logger.info(`[WORKER] Markdown job ${id} completed successfully.`);
      });
    }
  });

  worker.on('failed', async (job, error) => {
    if (job && job.id) {
      const { id } = job;
      await markdownService.update({ id, status: 'failed' }).then(() => {
        logger.error(`[WORKER] Markdown job ${id} failed: ${JSON.stringify(error, null, 2)}`);
      });
    }
  });
};

export { markdownWorker };
