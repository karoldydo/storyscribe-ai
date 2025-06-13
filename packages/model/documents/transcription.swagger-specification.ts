import { z } from 'zod';
import { createDocument } from 'zod-openapi';

import {
  transcriptionApiErrorResponseSchema,
  transcriptionApiGetOneResponseSchema,
  transcriptionApiPostCreateRequestSchema,
  transcriptionApiPutUpdateRequestSchema,
} from '../schemas';

export const transcriptionSwaggerSpecification = createDocument({
  info: {
    description: 'API documentation for Storyscribe AI',
    title: 'storyscribe-ai',
    version: '1.0.0',
  },
  openapi: '3.0.0',
  paths: {
    '/api/v1/transcribe': {
      get: {
        description: 'Retrieves all transcriptions.',
        responses: {
          200: {
            content: { 'application/json': { schema: z.array(transcriptionApiGetOneResponseSchema) } },
            description: 'List of all transcriptions',
          },
          500: {
            content: { 'application/json': { schema: transcriptionApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Get all transcriptions',
        tags: ['Transcription'],
      },
      post: {
        description: 'Creates a new transcription request with the provided file name.',
        requestBody: {
          content: { 'application/json': { schema: transcriptionApiPostCreateRequestSchema } },
          required: true,
        },
        responses: {
          202: {
            content: { 'application/json': { schema: transcriptionApiGetOneResponseSchema } },
            description: 'Transcription created successfully',
          },
          400: {
            content: { 'application/json': { schema: transcriptionApiErrorResponseSchema } },
            description: 'Bad request',
          },
          500: {
            content: { 'application/json': { schema: transcriptionApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Create a new transcription request',
        tags: ['Transcription'],
      },
      put: {
        description: 'Updates an existing transcription with the provided content, id, and status.',
        requestBody: {
          content: { 'application/json': { schema: transcriptionApiPutUpdateRequestSchema } },
          required: true,
        },
        responses: {
          200: {
            content: { 'application/json': { schema: transcriptionApiGetOneResponseSchema } },
            description: 'Transcription updated successfully',
          },
          400: {
            content: { 'application/json': { schema: transcriptionApiErrorResponseSchema } },
            description: 'Bad request',
          },
          404: {
            content: { 'application/json': { schema: transcriptionApiErrorResponseSchema } },
            description: 'Not found',
          },
          500: {
            content: { 'application/json': { schema: transcriptionApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Update an existing transcription',
        tags: ['Transcription'],
      },
    },
    '/api/v1/transcribe/{id}': {
      delete: {
        description: 'Deletes a transcription by id.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          204: {
            description: 'Transcription deleted successfully',
          },
          400: {
            content: { 'application/json': { schema: transcriptionApiErrorResponseSchema } },
            description: 'Bad request',
          },
          404: {
            content: { 'application/json': { schema: transcriptionApiErrorResponseSchema } },
            description: 'Not found',
          },
          500: {
            content: { 'application/json': { schema: transcriptionApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Delete a transcription by id',
        tags: ['Transcription'],
      },
      get: {
        description: 'Retrieves a transcription by id.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            content: { 'application/json': { schema: transcriptionApiGetOneResponseSchema } },
            description: 'Transcription retrieved successfully',
          },
          400: {
            content: { 'application/json': { schema: transcriptionApiErrorResponseSchema } },
            description: 'Bad request',
          },
          404: {
            content: { 'application/json': { schema: transcriptionApiErrorResponseSchema } },
            description: 'Not found',
          },
          500: {
            content: { 'application/json': { schema: transcriptionApiErrorResponseSchema } },
            description: 'Internal server error',
          },
        },
        summary: 'Get a transcription by id',
        tags: ['Transcription'],
      },
    },
  },
});
