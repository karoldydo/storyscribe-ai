import { NextFunction, Request, Response } from 'express';
import { promises as fs } from 'fs';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import multer, { MulterError } from 'multer';
import path from 'path';

import { IS_DEVELOPMENT } from '../env';
import logger from '../logger';

const destination = IS_DEVELOPMENT
  ? path.join(__dirname, '..', '..', '..', '..', '..', 'dist', 'shared', 'videos')
  : path.join(__dirname, '..', '..', 'shared', 'videos');

const moviesStorage = multer.diskStorage({
  destination,
  filename: function (req, file, cb) {
    const filename = (file.originalname.split('.').at(0) || 'movie').replace(/\s+/g, '_').toLowerCase();
    cb(null, filename + '-' + Date.now() + path.extname(file.originalname));
  },
});

const uploadSingleMovie = multer({
  fileFilter(_, file: Express.Multer.File, callback: multer.FileFilterCallback) {
    if (!file.mimetype.startsWith('video/')) {
      logger.error(`[MULTER] Invalid file type: ${file.mimetype}`);
      return callback(new Error(`[MULTER] Invalid file type: ${file.mimetype}`));
    }
    callback(null, true);
    logger.info(`[MULTER] file has been uploaded: ${file.originalname}`);
  },
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
  },
  storage: moviesStorage,
}).single('movie');

const deleteSingleMovie = async (filename: string) => {
  const filePath = path.join(destination, filename);
  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
    logger.info(`[MULTER] File ${filename} deleted successfully.`);
  } catch (error: unknown) {
    logger.error(`[MULTER] Error while deleting file ${filename}. Error: ${error}`);
    throw new Error(`[MULTER] Error while deleting file ${filename}`, { cause: error });
  }
};

const uploadSingleMovieMiddleware = (request: Request, response: Response, next: NextFunction) =>
  uploadSingleMovie(request, response, (error) => {
    if (error) {
      if (error instanceof MulterError) {
        logger.error(`[MULTER] ${error.stack}`);
        response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR, message: error.message });
      } else {
        logger.error(
          `[${request.method}] request ${request.originalUrl} has been failed, payload: ${JSON.stringify(request.body ?? {})}, params: ${JSON.stringify(
            request.params ?? {}
          )}. ${error}`
        );
        response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR, message: 'An unknown error occurred.' });
      }
    } else {
      next();
    }
  });

export { deleteSingleMovie, uploadSingleMovieMiddleware };
