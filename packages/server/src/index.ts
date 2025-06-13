import cookieParser from 'cookie-parser';
import * as dotevnv from 'dotenv';
import express from 'express';

import { databaseConnection } from './core/database';
import { PORT } from './core/env';
import logger from './core/logger';
import { corsMiddleware, csrfMiddleware, helmetMiddleware } from './core/middlewares';
import { initializeCsrf } from './core/security/csrf';
import { swagger, swaggerSpecification } from './core/swagger';
import { movieRouter, promptRouter, transcriptionRouter } from './routes';
import { transcriptionWorker } from './workers';

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

server.listen(PORT, async () => {
  await databaseConnection();
  transcriptionWorker();
  logger.info(`Server is listening on port ${PORT}`);
});
