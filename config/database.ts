import path from 'path';

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      schema: env('DATABASE_SCHEMA', 'public'), // Not required
      ssl: false,
    },
    acquireConnectionTimeout: 1000000,
    pool: {
      min: 0,
      max: 10,
      acquireTimeoutMillis: 900000,
      createTimeoutMillis: 900000,
      destroyTimeoutMillis: 900000,
    },
    debug: false,
  },
});
