import { z } from 'zod';

export const MarkdownRequestSchema = z.object({
  model: z.string(),
  summary: z.string(),
});

export const MarkdownResponseSchema = z.object({
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
