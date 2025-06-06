import { z } from 'zod';

import { MarkdownServiceRequestSchema, MarkdownServiceResponseSchema } from '../schemas';

export type MarkdownServiceRequest = z.infer<typeof MarkdownServiceRequestSchema>;
export type MarkdownServiceResponse = z.infer<typeof MarkdownServiceResponseSchema>;
