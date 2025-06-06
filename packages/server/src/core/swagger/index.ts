import { movieSwaggerSpecification, transcriptionSwaggerSpecification } from '@storyscribe-ai/model/documents';
import { merge } from 'lodash-es';
import swagger from 'swagger-ui-express';

const swaggerSpecification = merge({}, movieSwaggerSpecification, transcriptionSwaggerSpecification);

export { swagger, swaggerSpecification };
