import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const styleApiPostCreateRequestSchema = z
  .object({
    css: z.string({ message: 'The CSS must be a string' }).trim().min(1, 'The CSS must be a non-empty string').openapi({
      description: 'The CSS content to be created',
      example:
        'h1,h2{color:#191970}table{border-collapse:collapse}table,td,th{border:1px solid #696969}td,th{text-align:left;padding:1em}',
    }),
  })
  .openapi({ title: 'StyleApiPostCreateRequestSchema' });

export const styleApiPutUpdateRequestSchema = z
  .object({
    css: z.string({ message: 'The CSS must be a string' }).trim().min(1, 'The CSS must be a non-empty string').openapi({
      description: 'The updated CSS content',
      example:
        'h1,h2{color:#191970}table{border-collapse:collapse}table,td,th{border:1px solid #696969}td,th{text-align:left;padding:1em}',
    }),
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The UUID of the style to be updated',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
  })
  .openapi({ title: 'StyleApiPutUpdateRequestSchema' });

export const styleApiGetOneRequestSchema = z
  .object({
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The UUID of the style to be retrieved',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
  })
  .openapi({ title: 'StyleApiGetOneRequestSchema' });

export const styleApiDeleteOneRequestSchema = z
  .object({
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The UUID of the style to be deleted',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
  })
  .openapi({ title: 'StyleApiDeleteOneRequestSchema' });

export const styleApiGetOneResponseSchema = z
  .object({
    created: z.string().datetime().openapi({
      description: 'The creation date of the style',
      example: '2023-10-01T12:00:00Z',
    }),
    css: z.string({ message: 'The CSS must be a string' }).trim().min(1, 'The CSS must be a non-empty string').openapi({
      description: 'The CSS content of the style',
      example:
        'h1,h2{color:#191970}table{border-collapse:collapse}table,td,th{border:1px solid #696969}td,th{text-align:left;padding:1em}',
    }),
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The UUID of the style',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
    modified: z.string().datetime().openapi({
      description: 'The last modification date of the style',
      example: '2023-10-01T12:00:00Z',
    }),
  })
  .openapi({ title: 'StyleApiGetOneResponseSchema' });

export const styleApiErrorResponseSchema = z.object({
  message: z.string().openapi({
    description: 'A human-readable message describing the error',
    example: 'An error occurred while processing the request',
  }),
});
