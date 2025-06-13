import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const promptApiPostCreateRequestSchema = z
  .object({
    content: z
      .string({ message: 'The content must be a string' })
      .trim()
      .min(1, 'The content must be a non-empty string')
      .openapi({
        description: 'The content of the prompt to be created',
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      }),
    type: z.enum(['markdown', 'summary']).openapi({
      description: 'The type of the prompt, either "markdown" or "summary"',
      example: 'markdown',
    }),
  })
  .openapi({ title: 'PromptApiPostCreateRequestSchema' });

export const promptApiPutUpdateRequestSchema = z
  .object({
    active: z.boolean({ message: 'The active status must be a boolean' }).openapi({
      description: 'Indicates whether the prompt is active or not',
      example: true,
    }),
    content: z
      .string({ message: 'The content must be a string' })
      .trim()
      .min(1, 'The content must be a non-empty string')
      .openapi({
        description: 'The updated content of the prompt',
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      }),
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The UUID of the prompt to be updated',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
    type: z.enum(['markdown', 'summary']).openapi({
      description: 'The type of the prompt, either "markdown" or "summary"',
      example: 'markdown',
    }),
  })
  .openapi({ title: 'PromptApiPutUpdateRequestSchema' });

export const promptApiPatchActivateRequestSchema = z
  .object({
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The UUID of the prompt to be activated',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
    type: z.enum(['markdown', 'summary']).openapi({
      description: 'The type of the prompt, either "markdown" or "summary"',
      example: 'markdown',
    }),
  })
  .openapi({ title: 'PromptApiPatchActivateRequestSchema' });

export const promptApiGetOneResponseSchema = z
  .object({
    active: z.boolean().openapi({
      description: 'Indicates whether the prompt is active or not',
      example: true,
    }),
    content: z
      .string({ message: 'The content must be a string' })
      .trim()
      .min(1, 'The content must be a non-empty string')
      .openapi({
        description: 'The content of the prompt',
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      }),
    created: z.string().openapi({
      description: 'The creation timestamp of the prompt',
      example: '2023-10-01T12:00:00Z',
    }),
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The UUID of the prompt',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
    modified: z.string().openapi({
      description: 'The last modification timestamp of the prompt',
      example: '2023-10-01T12:00:00Z',
    }),
    type: z.enum(['markdown', 'summary']).openapi({
      description: 'The type of the prompt, either "markdown" or "summary"',
      example: 'markdown',
    }),
  })
  .openapi({ title: 'PromptApiGetOneResponseSchema' });

export const promptApiGetOneRequestSchema = z
  .object({
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The UUID of the prompt to retrieve',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
  })
  .openapi({ title: 'PromptApiGetOneRequestSchema' });

export const promptApiGetActiveByTypeRequestSchema = z
  .object({
    type: z.enum(['markdown', 'summary']).openapi({
      description: 'The type of the prompt, either "markdown" or "summary"',
      example: 'markdown',
    }),
  })
  .openapi({ title: 'PromptApiGetAllActiveRequestSchema' });

export const promptApiDeleteOneRequestSchema = z
  .object({
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The UUID of the prompt to delete',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
  })
  .openapi({ title: 'PromptApiDeleteOneRequestSchema' });

export const promptApiErrorResponseSchema = z.object({
  message: z.string().openapi({
    description: 'A human-readable message describing the error',
    example: 'An error occurred while processing the request',
  }),
});
