import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const MovieApiCreateRequestSchema = z
  .object({
    movie: z.instanceof(File).openapi({
      description: 'The movie file to be uploaded',
      format: 'binary',
      type: 'string',
    }),
  })
  .openapi({ title: 'MovieApiCreateRequestSchema' });

export const MovieApiResponseSchema = z
  .object({
    created: z.string().openapi({
      description: 'The creation date of the movie record',
      example: '2023-10-01T12:00:00Z',
    }),
    filename: z.string().openapi({
      description: 'The name of the movie file',
      example: 'example.mp4',
    }),
    id: z.string().openapi({
      description: 'The id of the movie',
      example: '12345678-1234-1234-1234-123456789012',
    }),
    mimetype: z.string().openapi({
      description: 'The MIME type of the movie file',
      example: 'video/mp4',
    }),
    modified: z.string().openapi({
      description: 'The last modification date of the movie record',
      example: '2023-10-01T12:00:00Z',
    }),
    size: z.number().openapi({
      description: 'The size of the movie file in bytes',
      example: 10485760, // 10 MB
    }),
  })
  .openapi({ title: 'MovieApiResponseSchema' });
