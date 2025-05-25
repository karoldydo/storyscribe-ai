import * as winston from 'winston';

import { TZ } from '../env';

const format = () => {
  return new Date().toLocaleString('pl-PL', {
    timeZone: TZ,
  });
};

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  level: 'info',
  transports: [
    new winston.transports.Console({
      level: 'info',
    }),
  ],
});

export default logger;
