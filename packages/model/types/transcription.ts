import { z } from 'zod';

import {
  transcriptionApiGetOneResponseSchema,
  transcriptionApiPostCreateRequestSchema,
  transcriptionApiPutUpdateRequestSchema,
  transcriptionServiceRequestSchema,
  transcriptionServiceResponseSchema,
} from '../schemas';

export type TranscriptionApiGetOneResponse = z.infer<typeof transcriptionApiGetOneResponseSchema>;
export type TranscriptionApiPostCreateRequest = z.infer<typeof transcriptionApiPostCreateRequestSchema>;
export type TranscriptionApiPutUpdateRequest = z.infer<typeof transcriptionApiPutUpdateRequestSchema>;

export type TranscriptionServiceRequest = z.infer<typeof transcriptionServiceRequestSchema>;
export type TranscriptionServiceResponse = z.infer<typeof transcriptionServiceResponseSchema>;
