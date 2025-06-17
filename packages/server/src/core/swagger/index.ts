import {
  movieSwaggerSpecification,
  promptSwaggerSpecification,
  summarySwaggerSpecification,
  transcriptionSwaggerSpecification,
} from '@storyscribe-ai/model/documents';
import { merge } from 'lodash-es';
import swagger from 'swagger-ui-express';

const swaggerSpecification = merge(
  {},
  movieSwaggerSpecification,
  transcriptionSwaggerSpecification,
  promptSwaggerSpecification,
  summarySwaggerSpecification
);

export { swagger, swaggerSpecification };
