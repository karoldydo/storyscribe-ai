import cors from 'cors';

import { ALLOWED_ORIGINS } from '../env';
import logger from '../logger';

export const corsMiddleware = () =>
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (ALLOWED_ORIGINS.indexOf(origin) === -1) {
        logger.error(`CORS policy restricts access from origin ${origin}`);
        return callback(
          new Error(
            `The Cross-Origin Resource Sharing (CORS) policy of this website restricts access from the origin you are trying to connect from. Please contact the website owner to request access.`
          ),
          false
        );
      }
      return callback(null, true);
    },
  });
