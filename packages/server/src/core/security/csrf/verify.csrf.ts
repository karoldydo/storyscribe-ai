import csrf from 'csrf';
import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import logger from '../../logger';

export const verifyCsrf = (request: Request, response: Response, next: NextFunction) => {
  const csrf = request.app.get('csrf') as csrf;
  const secret = request.cookies['XSRF-SECRET'];
  const token = request.cookies['XSRF-TOKEN'];

  if (!csrf.verify(secret, token)) {
    logger.error('Invalid CSRF token');
    response.status(StatusCodes.BAD_REQUEST).json({
      error: ReasonPhrases.BAD_REQUEST,
      message:
        'The CSRF token provided does not match the expected token. This may occur if the token is missing, expired, or incorrectly set. Please try refreshing the page and resubmitting the form.',
    });
    return;
  }

  next();
};
