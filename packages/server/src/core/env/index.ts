import * as dotevnv from 'dotenv';

const {
  POSTGRES_DB: _POSTGRES_DB,
  POSTGRES_PASSWORD: _POSTGRES_PASSWORD,
  POSTGRES_USER: _POSTGRES_USER,
} = dotevnv.config().parsed as Record<string, string>;

// flags
const IS_PRODUCTION = process.env['NODE_ENV'] === 'production';
const IS_DEVELOPMENT = process.env['NODE_ENV'] === 'development';

// server
const PORT = process.env['PORT'] ?? 3000;
const TZ = process.env.TZ ?? 'Europe/Warsaw';

// database
const POSTGRES_DB = process.env['POSTGRES_DB'] ?? _POSTGRES_DB;
const POSTGRES_PASSWORD = process.env['POSTGRES_PASSWORD'] ?? _POSTGRES_PASSWORD;
const POSTGRES_USER = process.env['POSTGRES_USER'] ?? _POSTGRES_USER;

// services
const OLLAMA_SERVICE_API_URL = process.env['OLLAMA_SERVICE_API_URL'] ?? 'http://localhost:8000';
const WHISPER_SERVICE_API_URL = process.env['WHISPER_SERVICE_API_URL'] ?? 'http://localhost:8001';
const PDF_SERVICE_API_URL = process.env['PDF_SERVICE_API_URL'] ?? 'http://localhost:8002';

// hosts
const DATABASE_SERVICE_HOST = process.env['DATABASE_SERVICE_HOST'] ?? 'localhost';
const REDIS_SERVICE_HOST = process.env['REDIS_SERVICE_HOST'] ?? 'localhost';

// cors
const DEVELOPMENT_ORIGINS = process.env['DEVELOPMENT_ORIGINS'] ?? 'http://localhost:4000,http://localhost:3000';
const PRODUCTION_ORIGINS = process.env['PRODUCTION_ORIGINS'] ?? 'http://localhost:3000';

// allowed origins
const ALLOWED_ORIGINS: string[] = IS_PRODUCTION ? PRODUCTION_ORIGINS.split(',') : DEVELOPMENT_ORIGINS.split(',');

export {
  ALLOWED_ORIGINS,
  DATABASE_SERVICE_HOST,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  OLLAMA_SERVICE_API_URL,
  PDF_SERVICE_API_URL,
  PORT,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  REDIS_SERVICE_HOST,
  TZ,
  WHISPER_SERVICE_API_URL,
};
