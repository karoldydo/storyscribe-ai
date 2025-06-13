import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const transcriptionServiceRequestSchema = z.object({
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

export const transcriptionServiceResponseSchema = z.object({
  transcript: z.string(),
});

export const transcriptionApiPostCreateRequestSchema = z
  .object({
    movieId: z
      .string({ message: 'The movieId must be a string' })
      .trim()
      .min(1, 'The movieId must be a non-empty string')
      .uuid('The movieId must be a valid UUID')
      .openapi({
        description: 'The movieId of the movie associated with the transcription',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
  })
  .openapi({ title: 'TranscriptionApiPostCreateRequestSchema' });

export const transcriptionApiGetOneRequestSchema = z
  .object({
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The id of the transcription to be retrieved',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
  })
  .openapi({ title: 'TranscriptionApiGetOneRequestSchema' });

export const transcriptionApiDeleteOneRequestSchema = z
  .object({
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The id of the transcription to be deleted',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
  })
  .openapi({ title: 'TranscriptionApiDeleteOneRequestSchema' });

export const transcriptionApiPutUpdateRequestSchema = z
  .object({
    content: z.string().optional().openapi({
      description: 'The content of the transcription, if available',
      example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    }),
    id: z.string().openapi({
      description: 'The unique identifier of the transcription',
      example: '96cf5041-0b56-4e87-bbec-ec5421aa8bfe',
    }),
    movieId: z.string().optional().openapi({
      description: 'The id of the movie associated with the transcription',
      example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
    }),
    status: z
      .union([z.literal('completed'), z.literal('failed'), z.literal('in-progress'), z.literal('pending')])
      .openapi({
        description: 'The status of the transcription job',
        example: 'completed',
      }),
  })
  .openapi({ title: 'TranscriptionApiPutUpdateRequestSchema' });

export const transcriptionApiGetOneResponseSchema = z
  .object({
    content: z.string().optional().openapi({
      description: 'The transcript content, if available',
      example: 'null',
    }),
    created: z.string().datetime().openapi({
      description: 'ISO timestamp when the transcription was created',
      example: '2024-06-03T18:25:43.511Z',
    }),
    id: z.string().openapi({
      description: 'Unique transcription UUID',
      example: '96cf5041-0b56-4e87-bbec-ec5421aa8bfe',
    }),
    modified: z.string().datetime().openapi({
      description: 'ISO timestamp when the transcription was last modified',
      example: '2024-06-03T19:00:00.000Z',
    }),
    movieId: z.string().openapi({
      description: 'The id of the movie associated with the transcription',
      example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
    }),
    status: z
      .union([z.literal('completed'), z.literal('failed'), z.literal('in-progress'), z.literal('pending')])
      .openapi({
        description: 'The status of the transcription job',
        example: 'completed',
      }),
  })
  .openapi({ title: 'TranscriptionApiGetOneResponseSchema' });

export const transcriptionApiErrorResponseSchema = z
  .object({
    message: z.string().openapi({
      description: 'Error message describing the issue',
      example: 'An error occurred while processing the request',
    }),
  })
  .openapi({ title: 'TranscriptionApiErrorResponseSchema' });
