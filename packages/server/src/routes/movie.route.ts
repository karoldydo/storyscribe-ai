import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { deleteSingleMovie, uploadSingleMovieMiddleware } from '../core/storage';
import { createHttpError, tryCatchWrapper } from '../core/utils';
import { MovieService } from '../services';

const movieService = new MovieService();
const movieRouter = Router();

// upload and create a new movie
movieRouter.post(
  '/',
  uploadSingleMovieMiddleware,
  tryCatchWrapper(async (request, response) => {
    if (!request.file) {
      throw createHttpError(StatusCodes.BAD_REQUEST, 'File is required');
    }
    const { filename, mimetype, size } = request.file;
    const movie = await movieService.create({ filename, mimetype, size });
    response.status(StatusCodes.ACCEPTED).json(movie);
  })
);

// get all movies
movieRouter.get(
  '/',
  tryCatchWrapper(async (_, response) => {
    const movies = await movieService.getAll();
    response.status(StatusCodes.OK).json(movies);
  })
);

// get a single movie by id
movieRouter.get(
  '/:id',
  tryCatchWrapper(async (request, response) => {
    const { id } = request.params;
    if (!id) {
      throw createHttpError(StatusCodes.BAD_REQUEST, 'The id is required');
    }
    const movie = await movieService.getOne({ id });
    response.status(StatusCodes.OK).json(movie);
  })
);

// delete a movie by id
movieRouter.delete(
  '/:id',
  tryCatchWrapper(async (request, response) => {
    const { id } = request.params;
    if (!id) {
      throw createHttpError(StatusCodes.BAD_REQUEST, 'The id is required');
    }
    const { filename } = await movieService.getOne({ id });
    await deleteSingleMovie(filename);
    await movieService.delete({ id });
    response.status(StatusCodes.NO_CONTENT).send();
  })
);

export { movieRouter };
