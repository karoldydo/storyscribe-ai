import { z } from 'zod';

import { SummaryRequestSchema, SummaryResponseSchema } from '../schemas';

export type SummaryRequest = z.infer<typeof SummaryRequestSchema>;
export type SummaryResponse = z.infer<typeof SummaryResponseSchema>;
