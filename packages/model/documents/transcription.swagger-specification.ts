import { z } from 'zod';
import { createDocument } from 'zod-openapi';

import {
  TranscriptionApiCreateRequestSchema,
  TranscriptionApiResponseSchema,
  TranscriptionApiUpdateRequestSchema,
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
            content: { 'application/json': { schema: z.array(TranscriptionApiResponseSchema) } },
            description: 'List of all transcriptions',
          },
        },
        summary: 'Get all transcriptions',
        tags: ['Transcription'],
      },
      post: {
        description: 'Creates a new transcription request with the provided file name.',
        requestBody: {
          content: { 'application/json': { schema: TranscriptionApiCreateRequestSchema } },
          required: true,
        },
        responses: {
          202: {
            content: { 'application/json': { schema: TranscriptionApiResponseSchema } },
            description: 'Transcription created successfully',
          },
        },
        summary: 'Create a new transcription request',
        tags: ['Transcription'],
      },
      put: {
        description: 'Updates an existing transcription with the provided content, id, and status.',
        requestBody: {
          content: { 'application/json': { schema: TranscriptionApiUpdateRequestSchema } },
          required: true,
        },
        responses: {
          200: {
            content: { 'application/json': { schema: TranscriptionApiResponseSchema } },
            description: 'Transcription updated successfully',
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
            content: { 'application/json': { schema: TranscriptionApiResponseSchema } },
            description: 'Transcription retrieved successfully',
          },
        },
        summary: 'Get a transcription by id',
        tags: ['Transcription'],
      },
    },
  },
});
