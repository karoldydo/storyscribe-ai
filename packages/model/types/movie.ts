import { z } from 'zod';

import {
  movieApiDeleteRequestSchema,
  movieApiErrorResponseSchema,
  movieApiGetRequestSchema,
  movieApiGetResponseSchema,
  movieApiPostRequestSchema,
} from '../schemas';

export type MovieApiDeleteRequest = z.infer<typeof movieApiDeleteRequestSchema>;
export type MovieApiErrorResponse = z.infer<typeof movieApiErrorResponseSchema>;
export type MovieApiGetRequest = z.infer<typeof movieApiGetRequestSchema>;
export type MovieApiGetResponse = z.infer<typeof movieApiGetResponseSchema>;
export type MovieApiPostRequest = z.infer<typeof movieApiPostRequestSchema>;
