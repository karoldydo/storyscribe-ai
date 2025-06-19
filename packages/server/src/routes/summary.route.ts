import {
  summaryApiDeleteOneRequestSchema,
  summaryApiGetOneRequestSchema,
  summaryApiPostCreateRequestSchema,
  summaryApiPutUpdateRequestSchema,
} from '@storyscribe-ai/model/schemas';
import { SummaryApiPostCreateRequest, SummaryApiPutUpdateRequest } from '@storyscribe-ai/model/types';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { bodySchemaValidatorMiddleware, paramSchemaValidatorMiddleware } from '../core/middlewares';
import { tryCatchWrapper } from '../core/utils';
import { summaryQueue } from '../queues';
import { SummaryService } from '../services';

const router = Router();
const summaryService = new SummaryService();

router
  .route('/')
  .post(
    bodySchemaValidatorMiddleware(summaryApiPostCreateRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { promptId, transcriptionId } = request.body as SummaryApiPostCreateRequest;
      const summary = await summaryService.create({ promptId, transcriptionId });
      await summaryQueue.add('summary', null, { jobId: summary.id });
      response.status(StatusCodes.ACCEPTED).json(summary);
    })
  )
  .put(
    bodySchemaValidatorMiddleware(summaryApiPutUpdateRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { content, id, status } = request.body as SummaryApiPutUpdateRequest;
      const summary = await summaryService.update({ content, id, status });
      response.status(StatusCodes.OK).json(summary);
    })
  )
  .get(
    tryCatchWrapper(async (_, response) => {
      const summaries = await summaryService.getAll();
      response.status(StatusCodes.OK).json(summaries);
    })
  );

router
  .route('/:id')
  .get(
    paramSchemaValidatorMiddleware(summaryApiGetOneRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { id } = request.params;
      const summary = await summaryService.getOne({ id });
      response.status(StatusCodes.OK).json(summary);
    })
  )
  .delete(
    paramSchemaValidatorMiddleware(summaryApiDeleteOneRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { id } = request.params;
      await summaryService.delete({ id });
      response.status(StatusCodes.NO_CONTENT).send();
    })
  );

export { router as summaryRouter };
