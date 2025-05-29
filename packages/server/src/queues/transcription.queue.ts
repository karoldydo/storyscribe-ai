import { Queue } from 'bullmq';

import { redisOptions } from '../core/redis';

const transcriptionQueue = new Queue('transcription', { connection: redisOptions });

export { transcriptionQueue };
