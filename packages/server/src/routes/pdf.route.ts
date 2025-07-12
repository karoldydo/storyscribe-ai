import { pdfApiGetOneRequestSchema, pdfApiPostCreateRequestSchema } from '@storyscribe-ai/model/schemas';
import { PdfApiPostCreateRequest } from '@storyscribe-ai/model/types';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { bodySchemaValidatorMiddleware, paramSchemaValidatorMiddleware } from '../core/middlewares';
import { tryCatchWrapper } from '../core/utils';
import { pdfQueue } from '../queues';
import { PdfService } from '../services';

const router = Router();
const pdfService = new PdfService();

router
  .route('/')
  .post(
    bodySchemaValidatorMiddleware(pdfApiPostCreateRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { markdownId, styleId } = request.body as PdfApiPostCreateRequest;
      const pdf = await pdfService.create({ markdownId, styleId });
      await pdfQueue.add('pdf', null, { jobId: pdf.id });
      response.status(StatusCodes.ACCEPTED).json(pdf);
    })
  )
  .get(
    tryCatchWrapper(async (_, response) => {
      const pdfs = await pdfService.getAll();
      response.status(StatusCodes.OK).json(pdfs);
    })
  );

router
  .route('/:id')
  .get(
    paramSchemaValidatorMiddleware(pdfApiGetOneRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { id } = request.params;
      const pdf = await pdfService.getOne({ id });
      response.status(StatusCodes.OK).json(pdf);
    })
  )
  .delete(
    paramSchemaValidatorMiddleware(pdfApiGetOneRequestSchema),
    tryCatchWrapper(async (request, response) => {
      const { id } = request.params;
      await pdfService.delete({ id });
      // TODO: remove file from the filesystem
      response.status(StatusCodes.NO_CONTENT).send();
    })
  );

router.route('/:id/download').get(
  paramSchemaValidatorMiddleware(pdfApiGetOneRequestSchema),
  tryCatchWrapper(async (request, response) => {
    const { id } = request.params;
    const { filename, path } = await pdfService.getOne({ id });
    response.download(path, filename, (err) => {
      if (err) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Error downloading PDF file.');
      }
    });
  })
);

export { router as pdfRouter };
