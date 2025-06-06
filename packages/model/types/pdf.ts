import { z } from 'zod';

import { PdfServiceRequestSchema, PdfServiceResponseSchema } from '../schemas';

export type PdfServiceRequest = z.infer<typeof PdfServiceRequestSchema>;
export type PdfServiceResponse = z.infer<typeof PdfServiceResponseSchema>;
