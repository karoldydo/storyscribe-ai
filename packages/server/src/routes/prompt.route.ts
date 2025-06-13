import {
  promptApiDeleteOneRequestSchema,
  promptApiGetActiveByTypeRequestSchema,
  promptApiGetOneRequestSchema,
  promptApiPatchActivateRequestSchema,
  promptApiPostCreateRequestSchema,
  promptApiPutUpdateRequestSchema,
} from '@storyscribe-ai/model/schemas';
import {
  PromptApiDeleteOneRequest,
  PromptApiGetActiveByTypeRequest,
  PromptApiGetOneRequest,
  PromptApiPatchActivateRequest,
  PromptApiPostCreateRequest,
  PromptApiPutUpdateRequest,
} from '@storyscribe-ai/model/types';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { bodySchemaValidatorMiddleware, paramSchemaValidatorMiddleware } from '../core/middlewares';
import { tryCatchWrapper } from '../core/utils';
import { PromptService } from '../services/prompt.service';

const router = Router();
const transcriptionService = new PromptService();

router
  .route('/')
  .post(
    bodySchemaValidatorMiddleware(promptApiPostCreateRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { content, type } = request.body as PromptApiPostCreateRequest;
      const prompt = await transcriptionService.create({ content, type });
      response.status(StatusCodes.CREATED).json(prompt);
    })
  )
  .put(
    bodySchemaValidatorMiddleware(promptApiPutUpdateRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { active, content, id, type } = request.body as PromptApiPutUpdateRequest;
      const prompt = await transcriptionService.update({ active, content, id, type });
      response.status(StatusCodes.OK).json(prompt);
    })
  )
  .get(
    tryCatchWrapper(async (_, response) => {
      const prompts = await transcriptionService.getAll();
      response.status(StatusCodes.OK).json(prompts);
    })
  );

router
  .route('/:id')
  .get(
    paramSchemaValidatorMiddleware(promptApiGetOneRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { id } = request.params as PromptApiGetOneRequest;
      const prompt = await transcriptionService.getOne({ id });
      response.status(StatusCodes.OK).json(prompt);
    })
  )
  .delete(
    paramSchemaValidatorMiddleware(promptApiDeleteOneRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { id } = request.params as PromptApiDeleteOneRequest;
      await transcriptionService.delete({ id });
      response.status(StatusCodes.NO_CONTENT).send();
    })
  );

router.route('/active/:type').get(
  paramSchemaValidatorMiddleware(promptApiGetActiveByTypeRequestSchema),
  tryCatchWrapper(async (request, response) => {
    const { type } = request.params as PromptApiGetActiveByTypeRequest;
    const prompt = await transcriptionService.getActiveByType({ type });
    response.status(StatusCodes.OK).json(prompt);
  })
);

router.route('/activate').patch(
  bodySchemaValidatorMiddleware(promptApiPatchActivateRequestSchema),
  tryCatchWrapper(async (request, response) => {
    const { id, type } = request.body as PromptApiPatchActivateRequest;
    const prompt = await transcriptionService.activate({ id, type });
    response.status(StatusCodes.OK).json(prompt);
  })
);

export { router as promptRouter };
