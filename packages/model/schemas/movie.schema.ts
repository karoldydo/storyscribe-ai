import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const movieApiPostRequestSchema = z
  .object({
    movie: z.instanceof(File).openapi({
      description: 'The movie file to be uploaded',
      format: 'binary',
      type: 'string',
    }),
  })
  .openapi({ title: 'MovieApiCreateRequestSchema' });

export const movieApiGetRequestSchema = z
  .object({
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The id of the movie to be retrieved',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
  })
  .openapi({ title: 'MovieApiGetRequestSchema' });

export const movieApiDeleteRequestSchema = z
  .object({
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The id of the movie to be deleted',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
  })
  .openapi({ title: 'MovieApiDeleteRequestSchema' });

export const movieApiGetResponseSchema = z
  .object({
    created: z
      .string({ message: 'The creation date must be a string' })
      .trim()
      .min(1, { message: 'The creation date must be a non-empty string' })
      .openapi({
        description: 'The creation date of the movie record',
        example: '2023-10-01T12:00:00Z',
      }),
    filename: z
      .string({ message: 'The filename must be a string' })
      .trim()
      .min(1, { message: 'The filename must be a non-empty string' })
      .openapi({
        description: 'The name of the movie file',
        example: 'example.mp4',
      }),
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, { message: 'The id must be a non-empty string' })
      .openapi({
        description: 'The id of the movie',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
    mimetype: z
      .string({ message: 'The MIME type must be a string' })
      .trim()
      .min(1, 'The MIME type must be a non-empty string')
      .startsWith('video/', 'The MIME type must start with "video/"')
      .openapi({
        description: 'The MIME type of the movie file',
        example: 'video/mp4',
      }),
    modified: z
      .string({ message: 'The modified date must be a string' })
      .trim()
      .min(1, 'The modified date must be a non-empty string')
      .openapi({
        description: 'The last modification date of the movie record',
        example: '2023-10-01T12:00:00Z',
      }),
    size: z
      .number({ message: 'The size must be a number' })
      .int('The size must be an integer')
      .positive('The size must be a positive number')
      .max(10485760, 'The size must be a valid number')
      .openapi({
        description: 'The size of the movie file in bytes',
        example: 100 * 1024 * 1024, // 100 MB
      }),
  })
  .openapi({ title: 'MovieApiResponseSchema' });

export const movieApiErrorResponseSchema = z
  .object({
    message: z.string().openapi({
      description: 'Error message describing the issue',
      example: 'An error occurred while processing the request',
    }),
  })
  .openapi({ title: 'MovieApiErrorResponseSchema' });
