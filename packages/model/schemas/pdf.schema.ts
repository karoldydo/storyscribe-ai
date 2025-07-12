import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const pdfServiceRequestSchema = z.object({
  css: z.string().optional(),
  engine: z.union([z.literal('weasyprint'), z.literal('wkhtmltopdf'), z.literal('pdflatex')]).optional(),
  markdown: z.string(),
});

export const pdfServiceResponseSchema = z.object({
  message: z.string(),
  pdf_path: z.string(),
});

export const pdfApiPostCreateRequestSchema = z
  .object({
    markdownId: z
      .string({ message: 'The markdownId must be a string' })
      .trim()
      .min(1, 'The markdownId must be a non-empty string')
      .uuid('The markdownId must be a valid UUID')
      .openapi({
        description: 'The UUID of the markdown to be converted to PDF',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
    styleId: z
      .string({ message: 'The styleId must be a string' })
      .trim()
      .min(1, 'The styleId must be a non-empty string')
      .uuid('The styleId must be a valid UUID')
      .openapi({
        description: 'The UUID of the style to be applied to the PDF',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
  })
  .openapi({ title: 'PdfApiPostCreateRequestSchema' });

export const pdfApiGetOneRequestSchema = z
  .object({
    id: z
      .string({ message: 'The id must be a string' })
      .trim()
      .min(1, 'The id must be a non-empty string')
      .uuid('The id must be a valid UUID')
      .openapi({
        description: 'The UUID of the PDF to be retrieved',
        example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
      }),
  })
  .openapi({ title: 'PdfApiGetOneRequestSchema' });

export const pdfApiDeleteOneRequestSchema = z.object({
  id: z
    .string({ message: 'The id must be a string' })
    .trim()
    .min(1, 'The id must be a non-empty string')
    .uuid('The id must be a valid UUID')
    .openapi({
      description: 'The UUID of the PDF to be deleted',
      example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
    }),
});

export const pdfApiGetOneResponseSchema = z.object({
  created: z.string().datetime().openapi({
    description: 'The creation date of the pdf',
    example: '2023-10-01T12:00:00Z',
  }),
  filename: z
    .string({ message: 'The filename must be a string' })
    .trim()
    .min(1, 'The filename must be a non-empty string')
    .openapi({
      description: 'The name of the pdf file',
      example: 'document.pdf',
    }),
  id: z
    .string({ message: 'The id must be a string' })
    .trim()
    .min(1, 'The id must be a non-empty string')
    .uuid('The id must be a valid UUID')
    .openapi({
      description: 'The UUID of the pdf to be deleted',
      example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
    }),
  markdownId: z
    .string({ message: 'The markdownId must be a string' })
    .trim()
    .min(1, 'The markdownId must be a non-empty string')
    .uuid('The markdownId must be a valid UUID')
    .openapi({
      description: 'The UUID of the markdown associated with the pdf',
      example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
    }),
  mimetype: z
    .string({ message: 'The mimetype must be a string' })
    .trim()
    .min(1, 'The mimetype must be a non-empty string')
    .openapi({
      description: 'The MIME type of the pdf file',
      example: 'application/pdf',
    }),
  modified: z.string().datetime().openapi({
    description: 'The last modification date of the pdf',
    example: '2023-10-01T12:00:00Z',
  }),
  size: z
    .number({ message: 'The size must be a number' })
    .int('The size must be an integer')
    .positive('The size must be a positive number')
    .openapi({
      description: 'The size of the pdf file in bytes',
      example: 102400,
    }),
  status: z.enum(['completed', 'failed', 'in-progress', 'pending']).openapi({
    description: 'The status of the summary',
    example: 'completed',
  }),
  styleId: z
    .string({ message: 'The styleId must be a string' })
    .trim()
    .min(1, 'The styleId must be a non-empty string')
    .uuid('The styleId must be a valid UUID')
    .openapi({
      description: 'The UUID of the style applied to the PDF',
      example: 'e124b181-2146-477f-a6b4-0ba2e5a6eb05',
    }),
});

export const pdfApiErrorResponseSchema = z.object({
  message: z.string().openapi({
    description: 'A human-readable message describing the error',
    example: 'An error occurred while processing the request',
  }),
});
