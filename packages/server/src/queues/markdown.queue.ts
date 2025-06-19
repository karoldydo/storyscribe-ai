import { Queue } from 'bullmq';

import { redisOptions } from '../core/redis';

const markdownQueue = new Queue('markdown', { connection: redisOptions });

export { markdownQueue };
