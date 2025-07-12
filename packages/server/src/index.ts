import cookieParser from 'cookie-parser';
import * as dotevnv from 'dotenv';
import express from 'express';

import { databaseConnection } from './core/database';
import { PORT } from './core/env';
import logger from './core/logger';
import { corsMiddleware, csrfMiddleware, helmetMiddleware } from './core/middlewares';
import { initializeCsrf } from './core/security/csrf';
import { swagger, swaggerSpecification } from './core/swagger';
import {
  markdownRouter,
  movieRouter,
  pdfRouter,
  promptRouter,
  styleRouter,
  summaryRouter,
  transcriptionRouter,
} from './routes';
import { markdownWorker, summaryWorker, transcriptionWorker } from './workers';
import { pdfWorker } from './workers/pdf.worker';

dotevnv.config();

const server = express();

// default middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

// set global variables
server.set('csrf', initializeCsrf());

// security
server.use(helmetMiddleware());
server.use(csrfMiddleware());
server.use(corsMiddleware());
server.disable('x-powered-by');

// routes
server.use('/api/docs', swagger.serve, swagger.setup(swaggerSpecification));
server.use('/api/v1/movie', movieRouter);
server.use('/api/v1/transcribe', transcriptionRouter);
server.use('/api/v1/prompt', promptRouter);
server.use('/api/v1/summary', summaryRouter);
server.use('/api/v1/markdown', markdownRouter);
server.use('/api/v1/style', styleRouter);
server.use('/api/v1/pdf', pdfRouter);

server.listen(PORT, async () => {
  await databaseConnection();
  transcriptionWorker();
  summaryWorker();
  markdownWorker();
  pdfWorker();
  logger.info(`Server is listening on port ${PORT}`);
});
