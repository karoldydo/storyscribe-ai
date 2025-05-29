import { z } from 'zod';

import { PdfRequestSchema, PdfResponseSchema } from '../schemas';

export type PdfRequest = z.infer<typeof PdfRequestSchema>;
export type PdfResponse = z.infer<typeof PdfResponseSchema>;
