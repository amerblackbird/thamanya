import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import helmet from '@fastify/helmet';
import compression from '@fastify/compress';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService: ConfigService = app.get(ConfigService);

  // Get api prefix
  const apiPrefix: string | undefined = configService.get('app.apiPrefix');

  // Add api prefix
  app.setGlobalPrefix(apiPrefix ?? 'api/v1');

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

  // Enable api documentation with Swagger in development mode
  // This will generate an interactive API
  if (process.env.NODE_ENV !== 'production') {
    /// Config swagger
    const config = new DocumentBuilder()
      .setTitle('Sarie api')
      .setDescription('The Sarie API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(apiPrefix ?? 'api/v1', app, document);
  }

  const port: number | undefined = configService.get('app.port');

  await app.listen(port ?? 3000);
}

bootstrap();
