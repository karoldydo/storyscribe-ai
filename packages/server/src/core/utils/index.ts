import { NextFunction, Request, RequestHandler, Response } from 'express';
import createError from 'http-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { capitalize } from 'lodash-es';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

import logger from '../logger';

type AsyncRequestHandler = (request: Request, response: Response, next: NextFunction) => Promise<void>;

const createHttpError = (code: StatusCodes, message: string) => {
  throw createError(code, message);
};

const isQueryFailedError = (error: unknown): error is QueryFailedError => {
  return error instanceof QueryFailedError;
};

const isEntityNotFoundError = (error: unknown): error is EntityNotFoundError => {
  return error instanceof EntityNotFoundError;
};

const isHttpError = (error: unknown): error is createError.HttpError => {
  return error instanceof createError.HttpError;
};

const logInfo = (request: Request) => {
  logger.info(
    `[${request.method}] request ${request.originalUrl} has been successfully processed, payload: ${JSON.stringify(request.body ?? {})}, params: ${JSON.stringify(request.params ?? {})}`
  );
};

const logError = (request: Request, message: string, statusCode: number) => {
  logger.error(
    `[${request.method}][${statusCode}] request ${request.originalUrl} has been failed, payload: ${JSON.stringify(request.body ?? {})}, params: ${JSON.stringify(
      request.params ?? {}
    )}. Error: ${message}`
  );
};

const tryCatchWrapper =
  (fn: AsyncRequestHandler): RequestHandler =>
  async (request, response, next) => {
    try {
      await fn(request, response, next);
      logInfo(request);
      return;
    } catch (error: unknown) {
      if (isHttpError(error)) {
        const { message, statusCode } = error;
        logError(request, message, statusCode);
        response.status(statusCode).json({ message });
        return;
      }

      if (isQueryFailedError(error)) {
        const message = capitalize(error.message);
        logError(request, message, StatusCodes.BAD_REQUEST);
        response.status(StatusCodes.BAD_REQUEST).json({ message });
        return;
      }

      if (isEntityNotFoundError(error)) {
        const message = capitalize(error.message);
        logError(request, message, StatusCodes.NOT_FOUND);
        response.status(StatusCodes.NOT_FOUND).json({ message });
        return;
      }

      logError(request, ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
      return;
    }
  };

export { createHttpError, tryCatchWrapper };
