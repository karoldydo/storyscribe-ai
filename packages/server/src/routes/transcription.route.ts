import { TranscriptionApiCreateRequest, TranscriptionApiUpdateRequest } from '@storyscribe-ai/model/types';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { createHttpError, tryCatchWrapper } from '../core/utils';
import { transcriptionQueue } from '../queues';
import { TranscriptionService } from '../services';

const transcriptionRouter = Router();
const transcriptionService = new TranscriptionService();

// create a new transcription request
transcriptionRouter.post(
  '/',
  tryCatchWrapper(async (request, response) => {
    const { movieId } = request.body as TranscriptionApiCreateRequest;

    if (!movieId) {
      throw createHttpError(StatusCodes.BAD_REQUEST, 'The movieId is required');
    }

    // create a new transcription record
    const transcription = await transcriptionService.create({ movieId });

    // add the transcription job to the queue
    await transcriptionQueue.add('transcribe', null, { jobId: transcription.id });

    // respond with the transcription record
    response.status(StatusCodes.ACCEPTED).json(transcription);
  })
);

// update an existing transcription
transcriptionRouter.put(
  '/',
  tryCatchWrapper(async (request, response) => {
    const { content, id, movieId, status } = request.body as TranscriptionApiUpdateRequest;
    if (!content || !id || !movieId || !status) {
      throw createHttpError(StatusCodes.BAD_REQUEST, 'The content, id, movieId and status are required');
    }
    const transcription = await transcriptionService.update({ content, id, movieId, status });
    response.status(StatusCodes.OK).json(transcription);
  })
);

// get all transcriptions
transcriptionRouter.get(
  '/',
  tryCatchWrapper(async (_, response) => {
    const transcriptions = await transcriptionService.getAll();
    response.status(StatusCodes.OK).json(transcriptions);
  })
);

// get a single transcription by id
transcriptionRouter.get(
  '/:id',
  tryCatchWrapper(async (request, response) => {
    const { id } = request.params;
    if (!id) {
      throw createHttpError(StatusCodes.BAD_REQUEST, 'The id is required');
    }
    const transcription = await transcriptionService.getOne({ id });
    response.status(StatusCodes.OK).json(transcription);
  })
);

// delete a transcription by id
transcriptionRouter.delete(
  '/:id',
  tryCatchWrapper(async (request, response) => {
    const { id } = request.params;
    if (!id) {
      throw createHttpError(StatusCodes.BAD_REQUEST, 'The id is required');
    }
    await transcriptionService.delete({ id });
    response.status(StatusCodes.NO_CONTENT).send();
  })
);

export { transcriptionRouter };
