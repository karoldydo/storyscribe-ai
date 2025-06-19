import { z } from 'zod';

import {
  markdownApiDeleteOneRequestSchema,
  markdownApiGetOneRequestSchema,
  markdownApiGetOneResponseSchema,
  markdownApiPostCreateRequestSchema,
  markdownApiPutUpdateRequestSchema,
  markdownServiceRequestSchema,
} from '../schemas';

export type MarkdownApiDeleteOneRequest = z.infer<typeof markdownApiDeleteOneRequestSchema>;
export type MarkdownApiGetOneRequest = z.infer<typeof markdownApiGetOneRequestSchema>;
export type MarkdownApiGetOneResponse = z.infer<typeof markdownApiGetOneResponseSchema>;
export type MarkdownApiPostCreateRequest = z.infer<typeof markdownApiPostCreateRequestSchema>;
export type MarkdownApiPutUpdateRequest = z.infer<typeof markdownApiPutUpdateRequestSchema>;

export type MarkdownServiceRequest = z.infer<typeof markdownServiceRequestSchema>;
