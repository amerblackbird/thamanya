import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import helmet from '@fastify/helmet';

import compression from '@fastify/compress';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Enable CORS (Cross-Origin Resource Sharing)
  // This allows the application to accept requests from different origins,
  // which is useful for APIs that may be accessed by web applications
  app.enableCors();

  // Secure the application with Helmet
  // This will set various HTTP headers to help protect the app
  // from common vulnerabilities.
  await app.register(helmet, {
    contentSecurityPolicy: false,
  });

  // Enable Gzip compression for responses
  // This will help reduce the size of the response body,
  // improving performance, especially for larger payloads.
  // It is particularly useful for text-based responses like JSON.
  await app.register(compression);

  // Todo: add rate limiting, etc.
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
