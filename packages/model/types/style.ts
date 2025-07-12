import { z } from 'zod';

import {
  styleApiDeleteOneRequestSchema,
  styleApiErrorResponseSchema,
  styleApiGetOneRequestSchema,
  styleApiGetOneResponseSchema,
  styleApiPostCreateRequestSchema,
  styleApiPutUpdateRequestSchema,
} from '../schemas';

export type StyleApiDeleteOneRequest = z.infer<typeof styleApiDeleteOneRequestSchema>;
export type StyleApiErrorResponse = z.infer<typeof styleApiErrorResponseSchema>;
export type StyleApiGetOneRequest = z.infer<typeof styleApiGetOneRequestSchema>;
export type StyleApiGetOneResponse = z.infer<typeof styleApiGetOneResponseSchema>;
export type StyleApiPostCreateRequest = z.infer<typeof styleApiPostCreateRequestSchema>;
export type StyleApiPutUpdateRequest = z.infer<typeof styleApiPutUpdateRequestSchema>;
