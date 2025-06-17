import { Queue } from 'bullmq';

import { redisOptions } from '../core/redis';

const summaryQueue = new Queue('summary', { connection: redisOptions });

export { summaryQueue };
