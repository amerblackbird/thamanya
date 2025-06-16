import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  ttl: process.env.REDIS_TTL,
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
}));
