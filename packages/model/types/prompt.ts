import { z } from 'zod';

import {
  promptApiDeleteOneRequestSchema,
  promptApiErrorResponseSchema,
  promptApiGetActiveByTypeRequestSchema,
  promptApiGetOneRequestSchema,
  promptApiGetOneResponseSchema,
  promptApiPatchActivateRequestSchema,
  promptApiPostCreateRequestSchema,
  promptApiPutUpdateRequestSchema,
} from '../schemas';

export type PromptApiDeleteOneRequest = z.infer<typeof promptApiDeleteOneRequestSchema>;
export type PromptApiErrorResponse = z.infer<typeof promptApiErrorResponseSchema>;
export type PromptApiGetActiveByTypeRequest = z.infer<typeof promptApiGetActiveByTypeRequestSchema>;
export type PromptApiGetOneRequest = z.infer<typeof promptApiGetOneRequestSchema>;
export type PromptApiGetOneResponse = z.infer<typeof promptApiGetOneResponseSchema>;
export type PromptApiPatchActivateRequest = z.infer<typeof promptApiPatchActivateRequestSchema>;
export type PromptApiPostCreateRequest = z.infer<typeof promptApiPostCreateRequestSchema>;
export type PromptApiPutUpdateRequest = z.infer<typeof promptApiPutUpdateRequestSchema>;
