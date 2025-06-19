import {
  markdownApiDeleteOneRequestSchema,
  markdownApiGetOneRequestSchema,
  markdownApiPostCreateRequestSchema,
  markdownApiPutUpdateRequestSchema,
} from '@storyscribe-ai/model/schemas';
import { MarkdownApiPostCreateRequest, MarkdownApiPutUpdateRequest } from '@storyscribe-ai/model/types';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { bodySchemaValidatorMiddleware, paramSchemaValidatorMiddleware } from '../core/middlewares';
import { tryCatchWrapper } from '../core/utils';
import { markdownQueue } from '../queues';
import { MarkdownService } from '../services';

const router = Router();
const markdownService = new MarkdownService();

router
  .route('/')
  .post(
    bodySchemaValidatorMiddleware(markdownApiPostCreateRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { promptId, summaryId } = request.body as MarkdownApiPostCreateRequest;
      const markdown = await markdownService.create({ promptId, summaryId });
      await markdownQueue.add('markdown', null, { jobId: markdown.id });
      response.status(StatusCodes.ACCEPTED).json(markdown);
    })
  )
  .put(
    bodySchemaValidatorMiddleware(markdownApiPutUpdateRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { content, id, status } = request.body as MarkdownApiPutUpdateRequest;
      const markdown = await markdownService.update({ content, id, status });
      response.status(StatusCodes.OK).json(markdown);
    })
  )
  .get(
    tryCatchWrapper(async (_, response) => {
      const markdowns = await markdownService.getAll();
      response.status(StatusCodes.OK).json(markdowns);
    })
  );

router
  .route('/:id')
  .get(
    paramSchemaValidatorMiddleware(markdownApiGetOneRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { id } = request.params;
      const markdown = await markdownService.getOne({ id });
      response.status(StatusCodes.OK).json(markdown);
    })
  )
  .delete(
    paramSchemaValidatorMiddleware(markdownApiDeleteOneRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { id } = request.params;
      await markdownService.delete({ id });
      response.status(StatusCodes.NO_CONTENT).send();
    })
  );

export { router as markdownRouter };
