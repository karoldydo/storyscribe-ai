import csrf from 'csrf';
import { NextFunction, Request, Response } from 'express';

export const csrfMiddleware = () => {
  return (request: Request, response: Response, next: NextFunction) => {
    const csrf = request.app.get('csrf') as csrf;
    const secret = request.cookies['XSRF-SECRET'] || csrf.secretSync();
    if (!request.cookies['XSRF-SECRET']) {
      response.cookie('XSRF-SECRET', secret, {
        httpOnly: true, // prevents client-side access to the cookie
        sameSite: 'strict', // ensures cookie is not sent with cross-site requests
        secure: false,
        // secure: process.env.NODE_ENV === 'production', // ensures cookie is sent over HTTPS in production
      });
    }
    const token = csrf.create(secret);
    response.cookie('XSRF-TOKEN', token, {
      httpOnly: true, // allows client-side access to the cookie
      sameSite: 'strict', // ensures cookie is not sent with cross-site requests
      secure: false,
      // secure: process.env.NODE_ENV === 'production', // ensures cookie is sent over HTTPS in production
    });
    next();
  };
};
