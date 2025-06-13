import { z } from 'zod';

import {
  transcriptionApiGetResponseSchema,
  transcriptionApiPostRequestSchema,
  transcriptionApiPutRequestSchema,
  transcriptionServiceRequestSchema,
  transcriptionServiceResponseSchema,
} from '../schemas';

export type TranscriptionApiGetResponse = z.infer<typeof transcriptionApiGetResponseSchema>;
export type TranscriptionApiPostRequest = z.infer<typeof transcriptionApiPostRequestSchema>;
export type TranscriptionApiPutRequest = z.infer<typeof transcriptionApiPutRequestSchema>;

export type TranscriptionServiceRequest = z.infer<typeof transcriptionServiceRequestSchema>;
export type TranscriptionServiceResponse = z.infer<typeof transcriptionServiceResponseSchema>;
