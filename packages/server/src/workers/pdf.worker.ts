import { Worker } from 'bullmq';
import { promises as fs } from 'fs';
import path from 'path';

import { pdfExternalService } from '../core/axios';
import { IS_DEVELOPMENT } from '../core/env';
import logger from '../core/logger';
import { redisOptions } from '../core/redis';
import { MarkdownService, PdfService, StyleService } from '../services';

const pdfWorker = () => {
  const pdfService = new PdfService();
  const markdownService = new MarkdownService();
  const styleService = new StyleService();

  const worker = new Worker(
    'pdf',
    async (job) => {
      if (job && job.id) {
        const { id } = job;

        // update the job status to in-progress and retrieve the markdown and style for the pdf generation
        const { markdownId, styleId } = await pdfService.update({ id, status: 'in-progress' });
        const { css } = await styleService.getOne({ id: styleId });
        const { content: markdown } = await markdownService.getOne({ id: markdownId });

        logger.info(`[WORKER] Pdf job ${id} started.`);

        // create a FormData object to send the css and markdown content
        const formData = new FormData();
        formData.append('css', css);
        formData.append('engine', 'wkhtmltopdf');
        formData.append('markdown', markdown);

        // send the request to the external pdf service
        const { data, headers } = await pdfExternalService.post<ArrayBuffer>('/', formData, {
          responseType: 'arraybuffer',
        });

        const destination = IS_DEVELOPMENT
          ? path.join(__dirname, '..', '..', '..', '..', 'dist', 'shared', 'pdf')
          : path.join(__dirname, '..', '..', 'shared', 'pdf');

        // ensure the destination directory exists
        await fs.mkdir(destination, { recursive: true });

        // create a buffer from the data and write it to a file
        const buffer = Buffer.from(data);
        // TODO: make filename dynamic, allow users to specify a filename or use a unique identifier
        const filename = `markdown-${markdownId}-${Date.now()}.pdf`;
        const fullPath = path.join(destination, filename);
        const size = buffer.length;
        const mimetype = headers['content-type'] || 'application/pdf';

        // write the buffer to the file system
        await fs.writeFile(fullPath, buffer);

        // update the pdf record in the database
        await pdfService.update({ filename, id, mimetype, path: fullPath, size });
      }
    },
    { concurrency: 1, connection: redisOptions }
  );

  worker.on('ready', () => {
    logger.info(`[WORKER] Pdf worker is ready to process jobs.`);
  });

  worker.on('completed', async (job) => {
    if (job && job.id) {
      const { id } = job;
      pdfService.update({ id, status: 'completed' }).then(() => {
        logger.info(`[WORKER] Pdf job ${id} completed successfully.`);
      });
    }
  });

  worker.on('failed', async (job, error) => {
    if (job && job.id) {
      const { id } = job;
      await pdfService.update({ id, status: 'failed' }).then(() => {
        logger.error(`[WORKER] Pdf job ${id} failed: ${JSON.stringify(error, null, 2)}`);
      });
    }
  });
};

export { pdfWorker };
