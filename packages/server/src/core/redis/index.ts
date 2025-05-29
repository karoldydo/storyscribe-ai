import { RedisOptions } from 'ioredis';

import { REDIS_SERVICE_HOST } from '../env';

const redisOptions: RedisOptions = { host: REDIS_SERVICE_HOST, port: 6379 };

export { redisOptions };
