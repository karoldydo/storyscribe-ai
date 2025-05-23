import { z } from 'zod';

export const TranscriptionRequestSchema = z.object({
  file_name: z.string(),
  language: z.string().optional(),
  model: z
    .union([
      z.literal('tiny'),
      z.literal('base'),
      z.literal('small'),
      z.literal('medium'),
      z.literal('large'),
      z.literal('turbo'),
      z.literal('tiny.en'),
      z.literal('base.en'),
      z.literal('small.en'),
      z.literal('medium.en'),
    ])
    .optional(),
});

export const TranscriptionResponseSchema = z.object({
  transcript: z.string(),
});
