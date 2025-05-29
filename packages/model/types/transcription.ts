import { z } from 'zod';

import { TranscriptionRequestSchema, TranscriptionResponseSchema } from '../schemas';

export type TranscriptionRequest = z.infer<typeof TranscriptionRequestSchema>;
export type TranscriptionResponse = z.infer<typeof TranscriptionResponseSchema>;
