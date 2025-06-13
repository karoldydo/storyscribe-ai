import { z } from 'zod';
import { createDocument } from 'zod-openapi';

import { movieApiErrorResponseSchema, movieApiGetOneResponseSchema, movieApiPostCreateRequestSchema } from '../schemas';

export const movieSwaggerSpecification = createDocument({
  info: {
    description: 'API documentation for Storyscribe AI',
    title: 'storyscribe-ai',
    version: '1.0.0',
  },
  openapi: '3.0.0',
  paths: {
    '/api/v1/movie': {
      get: {
        description: 'Retrieves all movies.',
        responses: {
          200: {
            content: { 'application/json': { schema: z.array(movieApiGetOneResponseSchema) } },
            description: 'List of all movies',
          },
          400: {
            content: { 'application/json': { schema: movieApiErrorResponseSchema } },
            description: 'Bad Request',
          },
          404: {
            content: { 'application/json': { schema: movieApiErrorResponseSchema } },
            description: 'Not Found',
          },
          500: {
            content: { 'application/json': { schema: movieApiErrorResponseSchema } },
            description: 'Internal Server Error',
          },
        },
        summary: 'Get all movies',
        tags: ['Movie'],
      },
      post: {
        description: 'Creates a new movie with the provided file name.',
        requestBody: {
          content: { 'multipart/form-data': { schema: movieApiPostCreateRequestSchema } },
          required: true,
        },
        responses: {
          202: {
            content: { 'application/json': { schema: movieApiGetOneResponseSchema } },
            description: 'Movie created successfully',
          },
          400: {
            content: { 'application/json': { schema: movieApiErrorResponseSchema } },
            description: 'Bad Request',
          },
          500: {
            content: { 'application/json': { schema: movieApiErrorResponseSchema } },
            description: 'Internal Server Error',
          },
        },
        summary: 'Create a new movie',
        tags: ['Movie'],
      },
    },
    '/api/v1/movie/:id': {
      delete: {
        description: 'Deletes a movie by id.',
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
            description: 'Movie deleted successfully',
          },
          400: {
            content: { 'application/json': { schema: movieApiErrorResponseSchema } },
            description: 'Bad Request',
          },
          404: {
            content: { 'application/json': { schema: movieApiErrorResponseSchema } },
            description: 'Not Found',
          },
          500: {
            content: { 'application/json': { schema: movieApiErrorResponseSchema } },
            description: 'Internal Server Error',
          },
        },
        summary: 'Delete a movie by id',
        tags: ['Movie'],
      },
      get: {
        description: 'Retrieves a single movie by id.',
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
            content: { 'application/json': { schema: movieApiGetOneResponseSchema } },
            description: 'Single movie retrieved successfully',
          },
          400: {
            content: { 'application/json': { schema: movieApiErrorResponseSchema } },
            description: 'Bad Request',
          },
          404: {
            content: { 'application/json': { schema: movieApiErrorResponseSchema } },
            description: 'Not Found',
          },
          500: {
            content: { 'application/json': { schema: movieApiErrorResponseSchema } },
            description: 'Internal Server Error',
          },
        },
        summary: 'Get a single movie by id',
        tags: ['Movie'],
      },
    },
  },
});
