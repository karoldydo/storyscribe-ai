import cookieParser from 'cookie-parser';
import express from 'express';

import { PORT } from './core/env';
import logger from './core/logger';
import { corsMiddleware, csrfMiddleware, helmetMiddleware } from './core/middlewares';
import { initializeCsrf } from './core/security/csrf';

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

server.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
});
