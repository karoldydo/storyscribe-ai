import { z } from 'zod';
import { createDocument } from 'zod-openapi';

import {
  styleApiErrorResponseSchema,
  styleApiGetOneResponseSchema,
  styleApiPostCreateRequestSchema,
  styleApiPutUpdateRequestSchema,
} from '../schemas';

export const styleSwaggerSpecification = createDocument({
  info: {
    description: 'API documentation for Storyscribe AI',
    title: 'storyscribe-ai',
    version: '1.0.0',
  },
  openapi: '3.0.0',
  paths: {
    '/api/v1/style': {
      get: {
        description: 'Retrieves all styles.',
        responses: {
          200: {
            content: { 'application/json': { schema: z.array(styleApiGetOneResponseSchema) } },
            description: 'List of styles retrieved successfully',
          },
          500: {
            content: { 'application/json': { schema: styleApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Get all styles',
        tags: ['Style'],
      },
      post: {
        description: 'Creates a new style with the provided CSS.',
        requestBody: {
          content: { 'application/json': { schema: styleApiPostCreateRequestSchema } },
          required: true,
        },
        responses: {
          200: {
            content: { 'application/json': { schema: styleApiGetOneResponseSchema } },
            description: 'Style created successfully',
          },
          400: {
            content: { 'application/json': { schema: styleApiErrorResponseSchema } },
            description: 'Bad request',
          },
          500: {
            content: { 'application/json': { schema: styleApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Create a style',
        tags: ['Style'],
      },
      put: {
        description: 'Updates an existing style with the provided css and id.',
        requestBody: {
          content: { 'application/json': { schema: styleApiPutUpdateRequestSchema } },
          required: true,
        },
        responses: {
          200: {
            content: { 'application/json': { schema: styleApiGetOneResponseSchema } },
            description: 'Style updated successfully',
          },
          400: {
            content: { 'application/json': { schema: styleApiErrorResponseSchema } },
            description: 'Bad request',
          },
          404: {
            content: { 'application/json': { schema: styleApiErrorResponseSchema } },
            description: 'Style not found',
          },
          500: {
            content: { 'application/json': { schema: styleApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Update a style',
        tags: ['Style'],
      },
    },
    '/api/v1/style/{id}': {
      delete: {
        description: 'Deletes a style by its id.',
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
            description: 'Style deleted successfully',
          },
          400: {
            content: { 'application/json': { schema: styleApiErrorResponseSchema } },
            description: 'Bad request',
          },
          404: {
            content: { 'application/json': { schema: styleApiErrorResponseSchema } },
            description: 'Style not found',
          },
          500: {
            content: { 'application/json': { schema: styleApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Delete a style by id',
        tags: ['Style'],
      },
      get: {
        description: 'Retrieves a style by its id.',
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
            content: { 'application/json': { schema: styleApiGetOneResponseSchema } },
            description: 'Style retrieved successfully',
          },
          400: {
            content: { 'application/json': { schema: styleApiErrorResponseSchema } },
            description: 'Bad request',
          },
          404: {
            content: { 'application/json': { schema: styleApiErrorResponseSchema } },
            description: 'Style not found',
          },
          500: {
            content: { 'application/json': { schema: styleApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Get a style by id',
        tags: ['Style'],
      },
    },
  },
});
