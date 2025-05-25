// flags
const IS_PRODUCTION = process.env['NODE_ENV'] === 'production';
const IS_DEVELOPMENT = process.env['NODE_ENV'] === 'development';

// server
const PORT = process.env['PORT'] ?? 3000;
const TZ = process.env.TZ ?? 'Europe/Warsaw';

// cors
const DEVELOPMENT_ORIGINS = process.env['DEVELOPMENT_ORIGINS'] ?? 'http://localhost:4000';
const PRODUCTION_ORIGINS = process.env['PRODUCTION_ORIGINS'] ?? 'http://localhost:3000';

// allowed origins
const ALLOWED_ORIGINS: string[] = IS_PRODUCTION ? PRODUCTION_ORIGINS.split(',') : DEVELOPMENT_ORIGINS.split(',');

export { ALLOWED_ORIGINS, IS_DEVELOPMENT, IS_PRODUCTION, PORT, TZ };
