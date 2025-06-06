import { z } from 'zod';

import {
  TranscriptionApiCreateRequestSchema,
  TranscriptionApiResponseSchema,
  TranscriptionApiUpdateRequestSchema,
  TranscriptionServiceRequestSchema,
  TranscriptionServiceResponseSchema,
} from '../schemas';

export type TranscriptionApiCreateRequest = z.infer<typeof TranscriptionApiCreateRequestSchema>;
export type TranscriptionApiResponse = z.infer<typeof TranscriptionApiResponseSchema>;
export type TranscriptionApiUpdateRequest = z.infer<typeof TranscriptionApiUpdateRequestSchema>;

export type TranscriptionServiceRequest = z.infer<typeof TranscriptionServiceRequestSchema>;
export type TranscriptionServiceResponse = z.infer<typeof TranscriptionServiceResponseSchema>;
