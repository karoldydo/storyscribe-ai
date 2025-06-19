import { DataSource } from 'typeorm';

import { Markdown, Movie, Prompt, Summary, Transcription } from '../../entities';
import { DATABASE_SERVICE_HOST, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER } from '../env';
import logger from '../logger';

export const dataSource = new DataSource({
  database: POSTGRES_DB,
  entities: [Movie, Transcription, Prompt, Summary, Markdown],
  host: DATABASE_SERVICE_HOST,
  logging: false,
  password: POSTGRES_PASSWORD,
  port: 5432,
  synchronize: true,
  type: 'postgres',
  username: POSTGRES_USER,
});

export const databaseConnection = async () => {
  try {
    await dataSource.initialize();
    logger.info('Database connection established successfully');
  } catch (error) {
    logger.error(`Error connecting to the database: ${error}`);
    throw error;
  }
};
