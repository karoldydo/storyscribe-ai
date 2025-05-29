import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import logger from '../logger';

type AsyncRequestHandler = (request: Request, response: Response, next: NextFunction) => Promise<void>;

const tryCatchWrapper =
  (fn: AsyncRequestHandler): RequestHandler =>
  async (request, response, next) => {
    try {
      await fn(request, response, next);
      logger.info(
        `[${request.method}] request ${request.originalUrl} has been successfully processed, payload: ${JSON.stringify(request.body ?? {})}, params: ${JSON.stringify(request.params ?? {})}`
      );
    } catch (error: unknown) {
      logger.error(
        `[${request.method}] request ${request.originalUrl} has been failed, payload: ${JSON.stringify(request.body ?? {})}, params: ${JSON.stringify(
          request.params ?? {}
        )}. Error: ${JSON.stringify(error, null, 2)}`
      );
      // TODO: Handle different error types and send appropriate responses
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  };

export { tryCatchWrapper };
