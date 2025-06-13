import {
  transcriptionApiDeleteRequestSchema,
  transcriptionApiGetRequestSchema,
  transcriptionApiPostRequestSchema,
  transcriptionApiPutRequestSchema,
} from '@storyscribe-ai/model/schemas';
import { TranscriptionApiPostRequest, TranscriptionApiPutRequest } from '@storyscribe-ai/model/types';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { bodySchemaValidatorMiddleware, paramSchemaValidatorMiddleware } from '../core/middlewares';
import { tryCatchWrapper } from '../core/utils';
import { transcriptionQueue } from '../queues';
import { TranscriptionService } from '../services';

const router = Router();
const transcriptionService = new TranscriptionService();

router
  .route('/')
  .post(
    bodySchemaValidatorMiddleware(transcriptionApiPostRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { movieId } = request.body as TranscriptionApiPostRequest;
      const transcription = await transcriptionService.create({ movieId });
      await transcriptionQueue.add('transcribe', null, { jobId: transcription.id });
      response.status(StatusCodes.ACCEPTED).json(transcription);
    })
  )
  .put(
    bodySchemaValidatorMiddleware(transcriptionApiPutRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { content, id, movieId, status } = request.body as TranscriptionApiPutRequest;
      const transcription = await transcriptionService.update({ content, id, movieId, status });
      response.status(StatusCodes.OK).json(transcription);
    })
  )
  .get(
    tryCatchWrapper(async (_, response) => {
      const transcriptions = await transcriptionService.getAll();
      response.status(StatusCodes.OK).json(transcriptions);
    })
  );

router
  .route('/:id')
  .get(
    paramSchemaValidatorMiddleware(transcriptionApiGetRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { id } = request.params;
      const transcription = await transcriptionService.getOne({ id });
      response.status(StatusCodes.OK).json(transcription);
    })
  )
  .delete(
    paramSchemaValidatorMiddleware(transcriptionApiDeleteRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { id } = request.params;
      await transcriptionService.delete({ id });
      response.status(StatusCodes.NO_CONTENT).send();
    })
  );

export { router as transcriptionRouter };
