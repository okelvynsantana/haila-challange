const { SnakeNamingStrategy } = require('typeorm-naming-strategies');
module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`dist/modules/**/entities/*.entity{.js, .ts}`],
  migrations: [`dist/modules/shared/migrations/*{.js, .ts}`],
  cli: {
    migrationsDir: `src/modules/shared/migrations`,
  },
  namingStrategy: new SnakeNamingStrategy(),
};
