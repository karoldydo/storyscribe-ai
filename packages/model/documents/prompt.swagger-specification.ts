import { z } from 'zod';
import { createDocument } from 'zod-openapi';

import {
  promptApiErrorResponseSchema,
  promptApiGetOneResponseSchema,
  promptApiPatchActivateRequestSchema,
  promptApiPostCreateRequestSchema,
  promptApiPutUpdateRequestSchema,
} from '../schemas';

export const promptSwaggerSpecification = createDocument({
  info: {
    description: 'API documentation for Storyscribe AI',
    title: 'storyscribe-ai',
    version: '1.0.0',
  },
  openapi: '3.0.0',
  paths: {
    '/api/v1/prompt': {
      get: {
        description: 'Retrieves all prompts.',
        responses: {
          200: {
            content: { 'application/json': { schema: z.array(promptApiGetOneResponseSchema) } },
            description: 'List of all prompts',
          },
          500: {
            content: { 'application/json': { schema: promptApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Get all prompts',
        tags: ['Prompt'],
      },
      post: {
        description: 'Creates a new prompt with the provided content and type.',
        requestBody: {
          content: { 'application/json': { schema: promptApiPostCreateRequestSchema } },
          required: true,
        },
        responses: {
          201: {
            content: { 'application/json': { schema: promptApiGetOneResponseSchema } },
            description: 'Prompt created successfully',
          },
          400: {
            content: { 'application/json': { schema: promptApiErrorResponseSchema } },
            description: 'Bad request',
          },
          500: {
            content: { 'application/json': { schema: promptApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Create a new prompt',
        tags: ['Prompt'],
      },
      put: {
        description: 'Updates an existing prompt with the provided active status, content, id, and type.',
        requestBody: {
          content: { 'application/json': { schema: promptApiPutUpdateRequestSchema } },
          required: true,
        },
        responses: {
          200: {
            content: { 'application/json': { schema: promptApiGetOneResponseSchema } },
            description: 'Prompt updated successfully',
          },
          400: {
            content: { 'application/json': { schema: promptApiErrorResponseSchema } },
            description: 'Bad request',
          },
          404: {
            content: { 'application/json': { schema: promptApiErrorResponseSchema } },
            description: 'Prompt not found',
          },
          500: {
            content: { 'application/json': { schema: promptApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Update an existing prompt',
        tags: ['Prompt'],
      },
    },
    '/api/v1/prompt/:id': {
      delete: {
        description: 'Deletes a prompt by its id.',
        parameters: [
          {
            description: 'The UUID of the prompt to delete',
            in: 'path',
            name: 'id',
            required: true,
            schema: { format: 'uuid', type: 'string' },
          },
        ],
        responses: {
          204: {
            description: 'Prompt deleted successfully',
          },
          404: {
            content: { 'application/json': { schema: promptApiErrorResponseSchema } },
            description: 'Prompt not found',
          },
          500: {
            content: { 'application/json': { schema: promptApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Delete a prompt by id',
        tags: ['Prompt'],
      },
      get: {
        description: 'Retrieves a prompt by its id.',
        parameters: [
          {
            description: 'The UUID of the prompt to retrieve',
            in: 'path',
            name: 'id',
            required: true,
            schema: { format: 'uuid', type: 'string' },
          },
        ],
        responses: {
          200: {
            content: { 'application/json': { schema: promptApiGetOneResponseSchema } },
            description: 'Prompt retrieved successfully',
          },
          404: {
            content: { 'application/json': { schema: promptApiErrorResponseSchema } },
            description: 'Prompt not found',
          },
          500: {
            content: { 'application/json': { schema: promptApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Get a prompt by id',
        tags: ['Prompt'],
      },
    },
    '/api/v1/prompt/active': {
      patch: {
        description: 'Activates a prompt with the provided id and type.',
        requestBody: {
          content: { 'application/json': { schema: promptApiPatchActivateRequestSchema } },
          required: true,
        },
        responses: {
          200: {
            content: { 'application/json': { schema: promptApiGetOneResponseSchema } },
            description: 'Prompt activated successfully',
          },
          400: {
            content: { 'application/json': { schema: promptApiErrorResponseSchema } },
            description: 'Bad request',
          },
          404: {
            content: { 'application/json': { schema: promptApiErrorResponseSchema } },
            description: 'Prompt not found',
          },
          500: {
            content: { 'application/json': { schema: promptApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Activate a prompt',
        tags: ['Prompt'],
      },
    },
    '/api/v1/prompt/active/:type': {
      get: {
        description: 'Retrieves the active prompt by its type.',
        parameters: [
          {
            description: 'The type of the active prompt to retrieve, either "markdown" or "summary"',
            in: 'path',
            name: 'type',
            required: true,
            schema: { enum: ['markdown', 'summary'], type: 'string' },
          },
        ],
        responses: {
          200: {
            content: { 'application/json': { schema: promptApiGetOneResponseSchema } },
            description: 'Active prompt retrieved successfully',
          },
          400: {
            content: { 'application/json': { schema: promptApiErrorResponseSchema } },
            description: 'Bad request',
          },
          404: {
            content: { 'application/json': { schema: promptApiErrorResponseSchema } },
            description: 'Active prompt not found',
          },
          500: {
            content: { 'application/json': { schema: promptApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Get active prompt by type',
        tags: ['Prompt'],
      },
    },
  },
});
