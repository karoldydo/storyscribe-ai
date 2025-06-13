import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { capitalize } from 'lodash-es';
import { z } from 'zod';

import logger from '../logger';

const paramSchemaValidatorMiddleware =
  (schema: z.Schema) => async (request: Request, response: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync(request.params);
    if (!result.success) {
      const error = result.error.issues.map((issue) => issue.message).join(', ');
      const { message, status } = createHttpError(400, `${capitalize(error)}.`);
      logger.error(
        `[${request.method}][${status}] request ${request.originalUrl} has been failed, params: ${JSON.stringify(request.params ?? {})}. Error: ${message}`
      );
      response.status(status).json({ message });
      return;
    }
    request.params = result.data;
    next();
  };

export { paramSchemaValidatorMiddleware };
