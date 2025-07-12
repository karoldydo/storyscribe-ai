import { z } from 'zod';
import { createDocument } from 'zod-openapi';

import { pdfApiErrorResponseSchema, pdfApiGetOneResponseSchema, pdfApiPostCreateRequestSchema } from '../schemas';

export const pdfSwaggerSpecification = createDocument({
  info: {
    description: 'API documentation for Storyscribe AI',
    title: 'storyscribe-ai',
    version: '1.0.0',
  },
  openapi: '3.0.0',
  paths: {
    '/api/v1/pdf': {
      get: {
        description: 'Retrieves all pdf documents.',
        responses: {
          200: {
            content: { 'application/json': { schema: z.array(pdfApiGetOneResponseSchema) } },
            description: 'List of pdf documents retrieved successfully',
          },
          500: {
            content: { 'application/json': { schema: pdfApiErrorResponseSchema } },
            description: 'Internal Server Error',
          },
        },
        summary: 'Get all pdf documents',
        tags: ['Pdf'],
      },
      post: {
        operationId: 'pdfApiPostCreate',
        requestBody: {
          content: { 'application/json': { schema: pdfApiPostCreateRequestSchema } },
          required: true,
        },
        responses: {
          202: {
            content: { 'application/json': { schema: pdfApiGetOneResponseSchema } },
            description: 'Pdf document created successfully',
          },
          400: {
            content: { 'application/json': { schema: pdfApiErrorResponseSchema } },
            description: 'Bad Request',
          },
          500: {
            content: { 'application/json': { schema: pdfApiErrorResponseSchema } },
            description: 'Internal Server Error',
          },
        },
        summary: 'Create a pdf document',
        tags: ['Pdf'],
      },
    },
    '/api/v1/pdf/{id}': {
      delete: {
        description: 'Deletes a pdf document by id.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { format: 'uuid', type: 'string' },
          },
        ],
        responses: {
          204: {
            description: 'Pdf document deleted successfully',
          },
          400: {
            content: { 'application/json': { schema: pdfApiErrorResponseSchema } },
            description: 'Bad Request',
          },
          404: {
            content: { 'application/json': { schema: pdfApiErrorResponseSchema } },
            description: 'Not Found',
          },
          500: {
            content: { 'application/json': { schema: pdfApiErrorResponseSchema } },
            description: 'Internal Server Error',
          },
        },
        summary: 'Delete a pdf document by ID',
        tags: ['Pdf'],
      },
      get: {
        description: 'Retrieves a pdf document by its id.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { format: 'uuid', type: 'string' },
          },
        ],
        responses: {
          200: {
            content: { 'application/json': { schema: pdfApiGetOneResponseSchema } },
            description: 'Pdf document retrieved successfully',
          },
          400: {
            content: { 'application/json': { schema: pdfApiErrorResponseSchema } },
            description: 'Bad Request',
          },
          404: {
            content: { 'application/json': { schema: pdfApiErrorResponseSchema } },
            description: 'Not Found',
          },
          500: {
            content: { 'application/json': { schema: pdfApiErrorResponseSchema } },
            description: 'Internal Server Error',
          },
        },
        summary: 'Retrieve a pdf document by id',
        tags: ['Pdf'],
      },
    },
  },
});
