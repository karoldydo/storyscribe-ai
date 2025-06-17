import { z } from 'zod';
import { createDocument } from 'zod-openapi';

import {
  summaryApiErrorResponseSchema,
  summaryApiGetOneResponseSchema,
  summaryApiPostCreateRequestSchema,
  summaryApiPutUpdateRequestSchema,
} from '../schemas';

export const summarySwaggerSpecification = createDocument({
  info: {
    description: 'API documentation for Storyscribe AI',
    title: 'storyscribe-ai',
    version: '1.0.0',
  },
  openapi: '3.0.0',
  paths: {
    '/api/v1/summary': {
      get: {
        description: 'Retrieves all summaries.',
        responses: {
          200: {
            content: { 'application/json': { schema: z.array(summaryApiGetOneResponseSchema) } },
            description: 'List of summaries retrieved successfully',
          },
          500: {
            content: { 'application/json': { schema: summaryApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Get all summaries',
        tags: ['Summary'],
      },
      post: {
        description: 'Generates a summary for the provided text.',
        requestBody: {
          content: { 'application/json': { schema: summaryApiPostCreateRequestSchema } },
          required: true,
        },
        responses: {
          200: {
            content: { 'application/json': { schema: summaryApiGetOneResponseSchema } },
            description: 'Summary generated successfully',
          },
          400: {
            content: { 'application/json': { schema: summaryApiErrorResponseSchema } },
            description: 'Bad request',
          },
          500: {
            content: { 'application/json': { schema: summaryApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Generate a summary',
        tags: ['Summary'],
      },
      put: {
        description: 'Updates an existing summary with the provided data.',
        requestBody: {
          content: { 'application/json': { schema: summaryApiPutUpdateRequestSchema } },
          required: true,
        },
        responses: {
          200: {
            content: { 'application/json': { schema: summaryApiGetOneResponseSchema } },
            description: 'Summary updated successfully',
          },
          400: {
            content: { 'application/json': { schema: summaryApiErrorResponseSchema } },
            description: 'Bad request',
          },
          404: {
            content: { 'application/json': { schema: summaryApiErrorResponseSchema } },
            description: 'Summary not found',
          },
          500: {
            content: { 'application/json': { schema: summaryApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Update a summary',
        tags: ['Summary'],
      },
    },
    '/api/v1/summary/{id}': {
      delete: {
        description: 'Deletes a summary by its id.',
        parameters: [
          {
            description: 'The UUID of the summary to be deleted',
            in: 'path',
            name: 'id',
            required: true,
            schema: { format: 'uuid', type: 'string' },
          },
        ],
        responses: {
          204: {
            description: 'Summary deleted successfully',
          },
          400: {
            content: { 'application/json': { schema: summaryApiErrorResponseSchema } },
            description: 'Bad request',
          },
          404: {
            content: { 'application/json': { schema: summaryApiErrorResponseSchema } },
            description: 'Summary not found',
          },
          500: {
            content: { 'application/json': { schema: summaryApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Delete a summary by id',
        tags: ['Summary'],
      },
      get: {
        description: 'Retrieves a summary by its id.',
        parameters: [
          {
            description: 'The UUID of the summary to be retrieved',
            in: 'path',
            name: 'id',
            required: true,
            schema: { format: 'uuid', type: 'string' },
          },
        ],
        responses: {
          200: {
            content: { 'application/json': { schema: summaryApiGetOneResponseSchema } },
            description: 'Summary retrieved successfully',
          },
          400: {
            content: { 'application/json': { schema: summaryApiErrorResponseSchema } },
            description: 'Bad request',
          },
          404: {
            content: { 'application/json': { schema: summaryApiErrorResponseSchema } },
            description: 'Summary not found',
          },
          500: {
            content: { 'application/json': { schema: summaryApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Get a summary by id',
        tags: ['Summary'],
      },
    },
  },
});
