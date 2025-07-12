import { z } from 'zod';

import {
  pdfApiDeleteOneRequestSchema,
  pdfApiErrorResponseSchema,
  pdfApiGetOneRequestSchema,
  pdfApiGetOneResponseSchema,
  pdfApiPostCreateRequestSchema,
  pdfServiceRequestSchema,
  pdfServiceResponseSchema,
} from '../schemas';

export type PdfApiDeleteOneRequest = z.infer<typeof pdfApiDeleteOneRequestSchema>;
export type PdfApiErrorResponse = z.infer<typeof pdfApiErrorResponseSchema>;
export type PdfApiGetOneRequest = z.infer<typeof pdfApiGetOneRequestSchema>;
export type PdfApiGetOneResponse = z.infer<typeof pdfApiGetOneResponseSchema>;
export type PdfApiPostCreateRequest = z.infer<typeof pdfApiPostCreateRequestSchema>;

export type PdfServiceRequest = z.infer<typeof pdfServiceRequestSchema>;
export type PdfServiceResponse = z.infer<typeof pdfServiceResponseSchema>;
