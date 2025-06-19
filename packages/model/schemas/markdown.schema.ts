import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const markdownServiceRequestSchema = z.object({
  model: z.string(),
  summary: z.string(),
});

export const markdownApiPostCreateRequestSchema = z
  .object({
    promptId: z
      .string({ message: 'The promptId must be a string' })
      .trim()
      .min(1, 'The promptId must be a non-empty string')
      .uuid('The promptId must be a valid UUID')
      .openapi({
        description: 'The UUID of the prompt to be used for creating the markdown',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
    summaryId: z
      .string({ message: 'The summaryId must be a string' })
      .trim()
      .min(1, 'The summaryId must be a non-empty string')
      .uuid('The summaryId must be a valid UUID')
      .openapi({
        description: 'The UUID of the summary to be used for creating the markdown',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
  })
  .openapi({ title: 'MarkdownApiPostCreateRequestSchema' });

export const markdownApiPutUpdateRequestSchema = z
  .object({
    content: z
      .string({ message: 'The content must be a string' })
      .trim()
      .min(1, 'The content must be a non-empty string')
      .openapi({
        description: 'The updated content of the markdown',
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      }),
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The UUID of the markdown to be updated',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
    status: z.enum(['completed', 'failed', 'in-progress', 'pending']).openapi({
      description: 'The status of the markdown',
      example: 'completed',
    }),
  })
  .openapi({ title: 'MarkdownApiPutUpdateRequestSchema' });

export const markdownApiGetOneRequestSchema = z
  .object({
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The UUID of the markdown to be retrieved',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
  })
  .openapi({ title: 'MarkdownApiGetOneRequestSchema' });

export const markdownApiDeleteOneRequestSchema = z
  .object({
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The UUID of the markdown to be deleted',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
  })
  .openapi({ title: 'MarkdownApiDeleteOneRequestSchema' });

export const markdownApiGetOneResponseSchema = z
  .object({
    content: z
      .string({ message: 'The content must be a string' })
      .trim()
      .min(1, 'The content must be a non-empty string')
      .openapi({
        description: 'The content of the markdown',
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      }),
    created: z.string().datetime().openapi({
      description: 'The creation date and time of the markdown',
      example: '2023-10-01T12:00:00Z',
    }),
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The UUID of the markdown',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
    modified: z.string().datetime().openapi({
      description: 'The last update date and time of the markdown',
      example: '2023-10-01T12:00:00Z',
    }),
    promptId: z
      .string({ message: 'The promptId must be a string' })
      .trim()
      .min(1, 'The promptId must be a non-empty string')
      .uuid('The promptId must be a valid UUID')
      .openapi({
        description: 'The UUID of the prompt used for the markdown',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
    status: z.enum(['completed', 'failed', 'in-progress', 'pending']).openapi({
      description: 'The status of the markdown',
      example: 'completed',
    }),
    summaryId: z
      .string({ message: 'The summaryId must be a string' })
      .trim()
      .min(1, 'The summaryId must be a non-empty string')
      .uuid('The summaryId must be a valid UUID')
      .openapi({
        description: 'The UUID of the summary to be used for creating the markdown',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
  })
  .openapi({ title: 'MarkdownApiGetOneResponseSchema' });

export const markdownApiErrorResponseSchema = z
  .object({
    message: z.string().openapi({
      description: 'Error message describing the issue',
      example: 'An error occurred while processing the request',
    }),
  })
  .openapi({ title: 'MarkdownApiErrorResponseSchema' });
