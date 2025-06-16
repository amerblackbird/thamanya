// typeorm.config.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config({
  path: '.development.env',
});

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +parseInt(process.env.DATABASE_PORT ?? '5432'),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['./src/**/*.entity{.ts,.js}', './src/**/**/*.entity{.ts,.js}'],
  migrations: ['./database/migrations/*.js', "./database/migrations/*.ts"],
});
