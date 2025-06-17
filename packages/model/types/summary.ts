import { z } from 'zod';

import {
  summaryApiDeleteOneRequestSchema,
  summaryApiGetOneRequestSchema,
  summaryApiGetOneResponseSchema,
  summaryApiPostCreateRequestSchema,
  summaryApiPutUpdateRequestSchema,
  summaryServiceRequestSchema,
} from '../schemas';

export type SummaryApiDeleteOneRequest = z.infer<typeof summaryApiDeleteOneRequestSchema>;
export type SummaryApiGetOneRequest = z.infer<typeof summaryApiGetOneRequestSchema>;
export type SummaryApiGetOneResponse = z.infer<typeof summaryApiGetOneResponseSchema>;
export type SummaryApiPostCreateRequest = z.infer<typeof summaryApiPostCreateRequestSchema>;
export type SummaryApiPutUpdateRequest = z.infer<typeof summaryApiPutUpdateRequestSchema>;

export type SummaryServiceRequest = z.infer<typeof summaryServiceRequestSchema>;
