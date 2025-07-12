import { Queue } from 'bullmq';

import { redisOptions } from '../core/redis';

const pdfQueue = new Queue('pdf', { connection: redisOptions });

export { pdfQueue };
