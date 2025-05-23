import { z } from 'zod';

import { MarkdownRequestSchema, MarkdownResponseSchema } from '../schema';

export type MarkdownRequest = z.infer<typeof MarkdownRequestSchema>;
export type MarkdownResponse = z.infer<typeof MarkdownResponseSchema>;
