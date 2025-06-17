import { z } from 'zod';

export const ollamaServiceRequestSchema = z.object({
  model: z.string().openapi({
    description: 'The model to be used for generating the response',
    example: 'llama:latest',
  }),
  prompt: z.string().openapi({
    description: 'The prompt to be used for generating the response',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  }),
  stream: z.boolean().default(false).openapi({
    description: 'Whether to stream the response or not',
    example: false,
  }),
});

export const ollamaServiceResponseSchema = z.object({
  context: z.array(z.number()),
  created_at: z.string(),
  done: z.boolean(),
  done_reason: z.string(),
  eval_count: z.number(),
  eval_duration: z.number(),
  load_duration: z.number(),
  model: z.string(),
  prompt_eval_count: z.number(),
  prompt_eval_duration: z.number(),
  response: z.string(),
  total_duration: z.number(),
});
