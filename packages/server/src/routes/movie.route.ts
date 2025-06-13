import { movieApiDeleteRequestSchema, movieApiGetRequestSchema } from '@storyscribe-ai/model/schemas';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { paramSchemaValidatorMiddleware } from '../core/middlewares';
import { deleteSingleMovie, uploadSingleMovieMiddleware } from '../core/storage';
import { createHttpError, tryCatchWrapper } from '../core/utils';
import { MovieService } from '../services';

const movieService = new MovieService();
const movieRouter = Router();

movieRouter
  .route('/')
  .post(
    uploadSingleMovieMiddleware,
    tryCatchWrapper(async (request, response) => {
      if (!request.file) {
        throw createHttpError(StatusCodes.BAD_REQUEST, 'File is required');
      }
      const { filename, mimetype, size } = request.file;
      const movie = await movieService.create({ filename, mimetype, size });
      response.status(StatusCodes.CREATED).json(movie);
    })
  )
  .get(
    tryCatchWrapper(async (_, response) => {
      const movies = await movieService.getAll();
      response.status(StatusCodes.OK).json(movies);
    })
  );

movieRouter
  .route('/:id')
  .delete(
    paramSchemaValidatorMiddleware(movieApiDeleteRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { id } = request.params;
      const { filename } = await movieService.getOne({ id });
      await deleteSingleMovie(filename);
      await movieService.delete({ id });
      response.status(StatusCodes.NO_CONTENT).send();
    })
  )
  .get(
    paramSchemaValidatorMiddleware(movieApiGetRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { id } = request.params;
      const movie = await movieService.getOne({ id });
      response.status(StatusCodes.OK).json(movie);
    })
  );

export { movieRouter };
