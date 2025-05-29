import { TranscriptionRequest } from '@storyscribe-ai/model/types';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { tryCatchWrapper } from '../core/utils';
import { transcriptionQueue } from '../queues';
import { TranscriptionService } from '../services';

const transcriptionRouter = Router();
const transcriptionService = new TranscriptionService();

transcriptionRouter.post(
  '/',
  tryCatchWrapper(async (request, response) => {
    const body = request.body as TranscriptionRequest;

    // create a new transcription record
    const transcription = await transcriptionService.create();

    // add the transcription job to the queue
    await transcriptionQueue.add('transcribe', body, { jobId: transcription.id });

    // respond with the transcription record
    response.status(StatusCodes.ACCEPTED).json({ ...transcription });
  })
);

transcriptionRouter.get(
  '/',
  tryCatchWrapper(async (_, response) => {
    const transcriptions = await transcriptionService.getAll();
    response.status(StatusCodes.OK).json(transcriptions);
  })
);

transcriptionRouter.get(
  '/:id',
  tryCatchWrapper(async (request, response) => {
    const { id } = request.params;
    const transcription = await transcriptionService.getOne(id);
    response.status(StatusCodes.OK).json(transcription);
  })
);

transcriptionRouter.delete(
  '/',
  tryCatchWrapper(async (request, response) => {
    const { id } = request.body;
    await transcriptionService.delete(id);
    response.status(StatusCodes.NO_CONTENT).send();
  })
);

export { transcriptionRouter };
