import { z } from 'zod';

import {
  movieApiDeleteOneRequestSchema,
  movieApiErrorResponseSchema,
  movieApiGetOneRequestSchema,
  movieApiGetOneResponseSchema,
  movieApiPostCreateRequestSchema,
} from '../schemas';

export type MovieApiDeleteOneRequest = z.infer<typeof movieApiDeleteOneRequestSchema>;
export type MovieApiErrorResponse = z.infer<typeof movieApiErrorResponseSchema>;
export type MovieApiGetOneRequest = z.infer<typeof movieApiGetOneRequestSchema>;
export type MovieApiGetOneResponse = z.infer<typeof movieApiGetOneResponseSchema>;
export type MovieApiPostCreateRequest = z.infer<typeof movieApiPostCreateRequestSchema>;
