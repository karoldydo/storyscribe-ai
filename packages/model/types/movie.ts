import { z } from 'zod';

import { MovieApiCreateRequestSchema, MovieApiResponseSchema } from '../schemas';

export type MovieApiCreateRequest = z.infer<typeof MovieApiCreateRequestSchema>;
export type MovieApiResponse = z.infer<typeof MovieApiResponseSchema>;
