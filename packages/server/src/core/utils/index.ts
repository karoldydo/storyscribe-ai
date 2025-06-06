import { NextFunction, Request, RequestHandler, Response } from 'express';
import createError from 'http-errors';
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
      return;
    } catch (error: unknown) {
      if (error instanceof createError.HttpError) {
        const { message, statusCode } = error;
        logger.error(
          `[${request.method}] request ${request.originalUrl} has been failed, payload: ${JSON.stringify(request.body ?? {})}, params: ${JSON.stringify(
            request.params ?? {}
          )}. Error: ${message}`
        );
        response.status(statusCode).json({ message });
        return;
      } else {
        logger.error(
          `[${request.method}] request ${request.originalUrl} has been failed, payload: ${JSON.stringify(request.body ?? {})}, params: ${JSON.stringify(
            request.params ?? {}
          )}. Error: ${JSON.stringify(error)}`
        );
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        return;
      }
    }
  };

const createHttpError = (code: StatusCodes, message: string) => {
  throw createError(code, message);
};

export { createHttpError, tryCatchWrapper };
