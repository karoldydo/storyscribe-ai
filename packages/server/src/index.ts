import cookieParser from 'cookie-parser';
import * as dotevnv from 'dotenv';
import express from 'express';

import { databaseConnection } from './core/database';
import { PORT } from './core/env';
import logger from './core/logger';
import { corsMiddleware, csrfMiddleware, helmetMiddleware } from './core/middlewares';
import { initializeCsrf } from './core/security/csrf';
import { swagger, swaggerSpecification } from './core/swagger';
import { transcriptionRouter } from './routes';
import { movieRouter } from './routes/movie.route';
import { transcriptionWorker } from './workers';

dotevnv.config();

const index = express();

// default middleware
index.use(express.json());
index.use(express.urlencoded({ extended: true }));
index.use(cookieParser());

// set global variables
index.set('csrf', initializeCsrf());

// security
index.use(helmetMiddleware());
index.use(csrfMiddleware());
index.use(corsMiddleware());
index.disable('x-powered-by');

// routes
index.use('/api/docs', swagger.serve, swagger.setup(swaggerSpecification));
index.use('/api/v1/movie', movieRouter);
index.use('/api/v1/transcribe', transcriptionRouter);

index.listen(PORT, async () => {
  await databaseConnection();
  transcriptionWorker();
  logger.info(`Server is listening on port ${PORT}`);
});
