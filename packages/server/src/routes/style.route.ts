import {
  styleApiDeleteOneRequestSchema,
  styleApiGetOneRequestSchema,
  styleApiPostCreateRequestSchema,
  styleApiPutUpdateRequestSchema,
} from '@storyscribe-ai/model/schemas';
import { StyleApiPostCreateRequest, StyleApiPutUpdateRequest } from '@storyscribe-ai/model/types';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { bodySchemaValidatorMiddleware, paramSchemaValidatorMiddleware } from '../core/middlewares';
import { tryCatchWrapper } from '../core/utils';
import { StyleService } from '../services';

const router = Router();
const styleService = new StyleService();

router
  .route('/')
  .post(
    bodySchemaValidatorMiddleware(styleApiPostCreateRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { css } = request.body as StyleApiPostCreateRequest;
      const style = await styleService.create({ css });
      response.status(StatusCodes.ACCEPTED).json(style);
    })
  )
  .put(
    bodySchemaValidatorMiddleware(styleApiPutUpdateRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { css, id } = request.body as StyleApiPutUpdateRequest;
      const style = await styleService.update({ css, id });
      response.status(StatusCodes.OK).json(style);
    })
  )
  .get(
    tryCatchWrapper(async (_, response) => {
      const styles = await styleService.getAll();
      response.status(StatusCodes.OK).json(styles);
    })
  );

router
  .route('/:id')
  .get(
    paramSchemaValidatorMiddleware(styleApiGetOneRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { id } = request.params;
      const style = await styleService.getOne({ id });
      response.status(StatusCodes.OK).json(style);
    })
  )
  .delete(
    paramSchemaValidatorMiddleware(styleApiDeleteOneRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { id } = request.params;
      await styleService.delete({ id });
      response.status(StatusCodes.NO_CONTENT).send();
    })
  );

export { router as styleRouter };
