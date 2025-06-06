import { z } from 'zod';

import { SummaryServiceRequestSchema, SummaryServiceResponseSchema } from '../schemas';

export type SummaryServiceRequest = z.infer<typeof SummaryServiceRequestSchema>;
export type SummaryServiceResponse = z.infer<typeof SummaryServiceResponseSchema>;
