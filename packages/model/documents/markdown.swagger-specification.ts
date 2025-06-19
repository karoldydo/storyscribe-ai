import { z } from 'zod';
import { createDocument } from 'zod-openapi';

import {
  markdownApiErrorResponseSchema,
  markdownApiGetOneResponseSchema,
  markdownApiPostCreateRequestSchema,
  markdownApiPutUpdateRequestSchema,
} from '../schemas';

export const markdownSwaggerSpecification = createDocument({
  info: {
    description: 'API documentation for Storyscribe AI',
    title: 'storyscribe-ai',
    version: '1.0.0',
  },
  openapi: '3.0.0',
  paths: {
    '/api/v1/markdown': {
      get: {
        description: 'Retrieves all markdowns.',
        responses: {
          200: {
            content: { 'application/json': { schema: z.array(markdownApiGetOneResponseSchema) } },
            description: 'List of markdowns retrieved successfully',
          },
          500: {
            content: { 'application/json': { schema: markdownApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Get all markdowns',
        tags: ['Markdown'],
      },
      post: {
        description: 'Generates a markdown for the provided text.',
        requestBody: {
          content: { 'application/json': { schema: markdownApiPostCreateRequestSchema } },
          required: true,
        },
        responses: {
          200: {
            content: { 'application/json': { schema: markdownApiErrorResponseSchema } },
            description: 'Markdown generated successfully',
          },
          400: {
            content: { 'application/json': { schema: markdownApiErrorResponseSchema } },
            description: 'Bad request',
          },
          500: {
            content: { 'application/json': { schema: markdownApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Generate a markdown',
        tags: ['Markdown'],
      },
      put: {
        description: 'Updates an existing markdown with the provided data.',
        requestBody: {
          content: { 'application/json': { schema: markdownApiPutUpdateRequestSchema } },
          required: true,
        },
        responses: {
          200: {
            content: { 'application/json': { schema: markdownApiGetOneResponseSchema } },
            description: 'Markdown updated successfully',
          },
          400: {
            content: { 'application/json': { schema: markdownApiErrorResponseSchema } },
            description: 'Bad request',
          },
          404: {
            content: { 'application/json': { schema: markdownApiErrorResponseSchema } },
            description: 'Markdown not found',
          },
          500: {
            content: { 'application/json': { schema: markdownApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Update a markdown',
        tags: ['Markdown'],
      },
    },
    '/api/v1/markdown/{id}': {
      delete: {
        description: 'Deletes a markdown by its id.',
        parameters: [
          {
            description: 'The UUID of the markdown to be deleted',
            in: 'path',
            name: 'id',
            required: true,
            schema: { format: 'uuid', type: 'string' },
          },
        ],
        responses: {
          204: {
            description: 'Markdown deleted successfully',
          },
          400: {
            content: { 'application/json': { schema: markdownApiErrorResponseSchema } },
            description: 'Bad request',
          },
          404: {
            content: { 'application/json': { schema: markdownApiErrorResponseSchema } },
            description: 'Markdown not found',
          },
          500: {
            content: { 'application/json': { schema: markdownApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Delete a markdown by id',
        tags: ['Markdown'],
      },
      get: {
        description: 'Retrieves a markdown by its id.',
        parameters: [
          {
            description: 'The UUID of the markdown to be retrieved',
            in: 'path',
            name: 'id',
            required: true,
            schema: { format: 'uuid', type: 'string' },
          },
        ],
        responses: {
          200: {
            content: { 'application/json': { schema: markdownApiGetOneResponseSchema } },
            description: 'Markdown retrieved successfully',
          },
          400: {
            content: { 'application/json': { schema: markdownApiErrorResponseSchema } },
            description: 'Bad request',
          },
          404: {
            content: { 'application/json': { schema: markdownApiErrorResponseSchema } },
            description: 'Markdown not found',
          },
          500: {
            content: { 'application/json': { schema: markdownApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Get a markdown by id',
        tags: ['Markdown'],
      },
    },
  },
});
