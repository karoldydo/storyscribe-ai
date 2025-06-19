import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const summaryServiceRequestSchema = z.object({
  model: z.string(),
  transcript: z.string(),
});

export const summaryApiPostCreateRequestSchema = z
  .object({
    promptId: z
      .string({ message: 'The promptId must be a string' })
      .trim()
      .min(1, 'The promptId must be a non-empty string')
      .uuid('The promptId must be a valid UUID')
      .openapi({
        description: 'The UUID of the prompt to be used for creating the summary',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
    transcriptionId: z
      .string({ message: 'The transcriptionId must be a string' })
      .trim()
      .min(1, 'The transcriptionId must be a non-empty string')
      .uuid('The transcriptionId must be a valid UUID')
      .openapi({
        description: 'The UUID of the transcription to be used for creating the summary',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
  })
  .openapi({ title: 'SummaryApiPostCreateRequestSchema' });

export const summaryApiPutUpdateRequestSchema = z
  .object({
    content: z
      .string({ message: 'The content must be a string' })
      .trim()
      .min(1, 'The content must be a non-empty string')
      .openapi({
        description: 'The updated content of the summary',
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      }),
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The UUID of the summary to be updated',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
    status: z.enum(['completed', 'failed', 'in-progress', 'pending']).openapi({
      description: 'The status of the summary',
      example: 'completed',
    }),
  })
  .openapi({ title: 'SummaryApiPutUpdateRequestSchema' });

export const summaryApiGetOneRequestSchema = z
  .object({
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The UUID of the summary to be retrieved',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
  })
  .openapi({ title: 'SummaryApiGetOneRequestSchema' });

export const summaryApiDeleteOneRequestSchema = z
  .object({
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The UUID of the summary to be deleted',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
  })
  .openapi({ title: 'SummaryApiDeleteOneRequestSchema' });

export const summaryApiGetOneResponseSchema = z
  .object({
    content: z
      .string({ message: 'The content must be a string' })
      .trim()
      .min(1, 'The content must be a non-empty string')
      .openapi({
        description: 'The content of the summary',
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      }),
    created: z.string().datetime().openapi({
      description: 'The creation date and time of the summary',
      example: '2023-10-01T12:00:00Z',
    }),
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The UUID of the summary',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
    modified: z.string().datetime().openapi({
      description: 'The last update date and time of the summary',
      example: '2023-10-01T12:00:00Z',
    }),
    promptId: z
      .string({ message: 'The promptId must be a string' })
      .trim()
      .min(1, 'The promptId must be a non-empty string')
      .uuid('The promptId must be a valid UUID')
      .openapi({
        description: 'The UUID of the prompt used for the summary',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
    status: z.enum(['completed', 'failed', 'in-progress', 'pending']).openapi({
      description: 'The status of the summary',
      example: 'completed',
    }),
    transcriptionId: z
      .string({ message: 'The transcriptionId must be a string' })
      .trim()
      .min(1, 'The transcriptionId must be a non-empty string')
      .uuid('The transcriptionId must be a valid UUID')
      .openapi({
        description: 'The UUID of the transcription used for the summary',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
  })
  .openapi({ title: 'SummaryApiGetOneResponseSchema' });

export const summaryApiErrorResponseSchema = z
  .object({
    message: z.string().openapi({
      description: 'Error message describing the issue',
      example: 'An error occurred while processing the request',
    }),
  })
  .openapi({ title: 'SummaryApiErrorResponseSchema' });
