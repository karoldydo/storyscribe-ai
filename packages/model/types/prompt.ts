import { z } from 'zod';

import {
  promptApiDeleteOneRequestSchema,
  promptApiErrorResponseSchema,
  promptApiGetAllActiveRequestSchema,
  promptApiGetOneRequestSchema,
  promptApiGetOneResponseSchema,
  promptApiPatchActivateRequestSchema,
  promptApiPostCreateRequestSchema,
  promptApiPutUpdateRequestSchema,
} from '../schemas';

export type PromptApiDeleteOneRequest = z.infer<typeof promptApiDeleteOneRequestSchema>;
export type PromptApiErrorResponse = z.infer<typeof promptApiErrorResponseSchema>;
export type PromptApiGetAllActiveRequest = z.infer<typeof promptApiGetAllActiveRequestSchema>;
export type PromptApiGetOneRequest = z.infer<typeof promptApiGetOneRequestSchema>;
export type PromptApiGetOneResponse = z.infer<typeof promptApiGetOneResponseSchema>;
export type PromptApiPatchActivateRequest = z.infer<typeof promptApiPatchActivateRequestSchema>;
export type PromptApiPostCreateRequest = z.infer<typeof promptApiPostCreateRequestSchema>;
export type PromptApiPutUpdateRequest = z.infer<typeof promptApiPutUpdateRequestSchema>;
