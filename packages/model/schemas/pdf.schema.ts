import { z } from 'zod';

export const PdfServiceRequestSchema = z.object({
  css: z.string().optional(),
  engine: z.union([z.literal('weasyprint'), z.literal('wkhtmltopdf'), z.literal('pdflatex')]).optional(),
  markdown: z.string(),
});

export const PdfServiceResponseSchema = z.object({
  message: z.string(),
  pdf_path: z.string(),
});
