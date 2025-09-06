import 'reflect-metadata';
import { resolve } from 'path';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config({
  path: resolve(__dirname, `../../../.env`),
});

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
  entities: [resolve('packages/orm/**/*.entity{.ts,.js}')],
  synchronize: false,
  migrationsRun: false,
  logging: true,
  migrations: [resolve('apps/api/src/migrations/**/*{.ts,.js}')],
});
