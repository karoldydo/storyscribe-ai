import { z } from 'zod';

import { ollamaServiceRequestSchema, ollamaServiceResponseSchema } from '../schemas/ollama.schema';

export type OllamaServiceRequest = z.infer<typeof ollamaServiceRequestSchema>;
export type OllamaServiceResponse = z.infer<typeof ollamaServiceResponseSchema>;
