import { z } from 'zod';

import { TranscriptionRequestSchema, TranscriptionResponseSchema } from '../schema';

export type TranscriptionRequest = z.infer<typeof TranscriptionRequestSchema>;
export type TranscriptionResponse = z.infer<typeof TranscriptionResponseSchema>;
